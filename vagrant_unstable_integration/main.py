from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import paramiko
import asyncio
import os
import subprocess

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

VAGRANT_HOST = "127.0.0.1"  # Vagrant forwards SSH to localhost
VAGRANT_PORT = 2222         # Default Vagrant SSH port
VAGRANT_USER = "vagrant"
# Use the default insecure key instead of project-specific key
VAGRANT_KEY = os.path.expanduser("~/.vagrant.d/insecure_private_key")  # Default Vagrant insecure key

# Function to start Vagrant VM
async def start_vagrant():
    print("Starting Vagrant VM...")
    try:
        # Check if Vagrantfile exists
        if not os.path.exists("Vagrantfile"):
            print("Vagrantfile not found in current directory")
            return False

        # Use 'vagrant up' through a thread to avoid blocking the event loop
        result = await asyncio.to_thread(
            subprocess.run,
            "vagrant up",
            shell=True,
            capture_output=True,
            text=True
        )
        
        # Print both stdout and stderr for debugging
        print(f"Vagrant stdout: {result.stdout}")
        print(f"Vagrant stderr: {result.stderr}")
        
        if result.returncode != 0:
            print(f"Error starting Vagrant VM: {result.stderr}")
            return False
            
        # Give the VM some time to fully boot and stabilize
        await asyncio.sleep(20)  # Increase from 10 to 20 seconds
        return True
    except Exception as e:
        print(f"Failed to start Vagrant VM: {str(e)}")
        return False

# Function to stop Vagrant VM
async def stop_vagrant():
    print("Stopping Vagrant VM...")
    try:
        # Use 'vagrant halt' through a thread to avoid blocking the event loop
        result = await asyncio.to_thread(
            subprocess.run,
            "vagrant halt",
            shell=True,
            capture_output=True,
            text=True
        )
        
        # Print both stdout and stderr for debugging
        print(f"Vagrant stdout: {result.stdout}")
        print(f"Vagrant stderr: {result.stderr}")
        
        if result.returncode != 0:
            print(f"Error stopping Vagrant VM: {result.stderr}")
            return False
            
        await asyncio.sleep(2)
        return True
    except Exception as e:
        print(f"Failed to stop Vagrant VM: {str(e)}")
        return False

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    ssh_client = None
    shell = None
    
    try:
        await websocket.accept()
        print("WebSocket connection accepted")
        
        # Send initial message to client
        await websocket.send_text("Starting Vagrant VM, please wait...")
        
        # Ensure the VM is running
        if not await start_vagrant():
            print("Failed to start Vagrant VM")
            await websocket.send_text("Error: Failed to start VM")
            await websocket.close(code=1011, reason="Failed to start VM")
            return

        # Add a delay to ensure VM is fully ready for SSH
        await websocket.send_text("VM started. Establishing SSH connection...")
        await asyncio.sleep(5)  # Extra wait time for SSH to be ready

        # Connect to Vagrant VM via SSH
        try:
            ssh_client = paramiko.SSHClient()
            ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
            
            if not os.path.exists(VAGRANT_KEY):
                print(f"SSH key not found at path: {VAGRANT_KEY}")
                await websocket.send_text("Error: SSH key not found")
                await websocket.close(code=1011, reason="SSH key not found")
                return
                
            print(f"Connecting to SSH: {VAGRANT_HOST}:{VAGRANT_PORT}")
            ssh_client.connect(
                VAGRANT_HOST, 
                port=VAGRANT_PORT, 
                username=VAGRANT_USER, 
                key_filename=VAGRANT_KEY,
                timeout=15
            )
            shell = ssh_client.invoke_shell()
            shell.settimeout(None)  # No timeout for shell operations
            print("SSH shell established successfully")
            await websocket.send_text("SSH connection established.")
        except Exception as e:
            print(f"SSH connection error: {str(e)}")
            await websocket.send_text(f"Error: SSH connection failed - {str(e)}")
            await websocket.close(code=1011, reason="SSH connection failed")
            return

        # Use a shared event to signal when to stop the background tasks
        stop_event = asyncio.Event()

        async def read_from_vm():
            try:
                print("Starting read_from_vm task")
                while not stop_event.is_set():
                    if shell and shell.recv_ready():
                        output = shell.recv(4096).decode('utf-8', errors='replace')
                        if output:
                            print(f"VM → Client: {len(output)} bytes")
                            await websocket.send_text(output)
                    await asyncio.sleep(0.1)
                print("read_from_vm task ending normally")
            except Exception as e:
                print(f"Read error: {str(e)}")
                print("Setting stop_event from read_from_vm")
                stop_event.set()

        async def write_to_vm():
            try:
                print("Starting write_to_vm task")
                while not stop_event.is_set():
                    try:
                        data = await asyncio.wait_for(websocket.receive_text(), timeout=0.5)
                        print(f"Client → VM: {data}")
                        if shell:
                            # Ensure commands are properly terminated with newline if not already present
                            if not data.endswith('\n'):
                                data += '\n'
                            shell.send(data)
                    except asyncio.TimeoutError:
                        pass  # Just a way to periodically check stop_event
                print("write_to_vm task ending normally")
            except WebSocketDisconnect:
                print("WebSocket disconnected by client")
                stop_event.set()
            except Exception as e:
                print(f"Write error: {str(e)}")
                stop_event.set()

        # Start both tasks
        tasks = [
            asyncio.create_task(read_from_vm()),
            asyncio.create_task(write_to_vm())
        ]
        
        # Wait for both tasks to complete (which happens when stop_event is set)
        await asyncio.gather(*tasks)
        
    except WebSocketDisconnect:
        print("WebSocket disconnected in main handler")
    except Exception as e:
        print(f"WebSocket error: {str(e)}")
    finally:
        # Clean up resources
        if shell:
            shell.close()
        if ssh_client:
            ssh_client.close()
        # Don't automatically shut down the VM unless explicitly requested
        # Comment this out if you want to keep VM running between connections
        # await stop_vagrant()

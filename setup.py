#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import sys
import shutil
import argparse
import subprocess
import platform

# Define constants
VENV_DIR = ".venv"
BACKEND_DIR = "backend"
FRONTEND_DIR = "frontend"

# Define platform-specific variables
IS_WINDOWS = platform.system() == "Windows"
PYTHON = "python" if IS_WINDOWS else "python3"
VENV_SCRIPTS = os.path.join(VENV_DIR, "Scripts" if IS_WINDOWS else "bin")
PIP = os.path.join(VENV_SCRIPTS, "pip")
PYTHON_VENV = os.path.join(VENV_SCRIPTS, "python")
NPM = "npm"

def create_venv():
    """Create a virtual environment if it doesn't exist"""
    if not os.path.exists(VENV_DIR):
        print("Creating virtual environment...")
        subprocess.run([PYTHON, "-m", "venv", VENV_DIR], check=True)
        return True
    else:
        print(f"Virtual environment already exists at {VENV_DIR}")
        return False

def install_requirements():
    """Install Python requirements"""
    requirements_file = os.path.join(BACKEND_DIR, "requirements.txt")
    if not os.path.exists(requirements_file):
        print(f"Error: Requirements file not found at {requirements_file}")
        return False
    
    print("Installing Python dependencies...")
    subprocess.run([PIP, "install", "-r", requirements_file], check=True)
    return True

def setup_backend():
    """Set up the backend environment"""
    create_venv()
    install_requirements()
    print("Backend setup complete!")

def setup_frontend():
    """Set up the frontend environment"""
    if not os.path.exists(FRONTEND_DIR):
        print(f"Error: Frontend directory not found at {FRONTEND_DIR}")
        return False
    
    print("Setting up frontend...")
    os.chdir(FRONTEND_DIR)
    subprocess.run([NPM, "install"], check=True)
    os.chdir("..")
    print("Frontend setup complete!")
    return True

def setup_all():
    """Set up both backend and frontend"""
    setup_backend()
    setup_frontend()
    print("Full project setup complete!")

def clean_environment():
    """Clean up virtual environment and node_modules"""
    print("Cleaning up...")
    
    # Remove virtual environment
    if os.path.exists(VENV_DIR):
        shutil.rmtree(VENV_DIR)
        print(f"Removed {VENV_DIR}")
    else:
        print(f"No {VENV_DIR} to remove")
    
    # Remove node_modules
    node_modules = os.path.join(FRONTEND_DIR, "node_modules")
    if os.path.exists(node_modules):
        shutil.rmtree(node_modules)
        print(f"Removed {node_modules}")
    else:
        print(f"No {node_modules} to remove")
    
    print("Cleanup complete!")

def run_backend():
    """Run the backend server"""
    app_file = os.path.join(BACKEND_DIR, "app.py")
    if not os.path.exists(app_file):
        print(f"Error: Backend application file not found at {app_file}")
        return False
    
    print("Starting backend server...")
    subprocess.run([PYTHON_VENV, app_file])
    return True

def run_frontend():
    """Run the frontend development server"""
    if not os.path.exists(FRONTEND_DIR):
        print(f"Error: Frontend directory not found at {FRONTEND_DIR}")
        return False
    
    print("Starting frontend development server...")
    os.chdir(FRONTEND_DIR)
    subprocess.run([NPM, "start"])
    os.chdir("..")
    return True

def activate_venv_shell():
    """Launch a new shell with the virtual environment activated"""
    if not os.path.exists(VENV_DIR):
        print(f"Error: Virtual environment not found at {VENV_DIR}")
        print("Please run setup first with: python setup.py --backend")
        return False
    
    print(f"Activating virtual environment from {VENV_DIR}...")
    
    if IS_WINDOWS:
        # On Windows, open a new Command Prompt with venv activated
        activate_script = os.path.join(VENV_DIR, "Scripts", "activate.bat")
        cmd = f"start cmd.exe /K {activate_script}"
        subprocess.run(cmd, shell=True)
        print("New command prompt window opened with virtual environment activated.")
    else:
        # On Unix, we can't directly activate in the parent shell from Python
        # So we'll start a new shell with the activate script sourced
        activate_script = os.path.join(VENV_DIR, "bin", "activate")
        cmd = f"gnome-terminal -- bash -c 'source {activate_script}; exec bash'"
        try:
            subprocess.run(cmd, shell=True)
            print("New terminal window opened with virtual environment activated.")
        except Exception:
            # Fallback if graphical terminal fails
            print("\nTo activate the virtual environment, run:")
            print(f"source {activate_script}")
    
    return True

def main():
    """Main function to parse arguments and run commands"""
    parser = argparse.ArgumentParser(description="Project setup and management script")
    
    # Create a mutually exclusive group for commands
    group = parser.add_mutually_exclusive_group()
    group.add_argument("--backend", action="store_true", help="Set up only the backend")
    group.add_argument("--frontend", action="store_true", help="Set up only the frontend")
    group.add_argument("--all", action="store_true", help="Set up both backend and frontend")
    group.add_argument("--run-backend", action="store_true", help="Run the backend server")
    group.add_argument("--run-frontend", action="store_true", help="Run the frontend development server")
    group.add_argument("--clean", action="store_true", help="Clean up the environment")
    group.add_argument("--activate-venv", action="store_true", help="Activate the virtual environment shell")
    
    args = parser.parse_args()
    
    # Execute the appropriate command
    if args.backend:
        setup_backend()
    elif args.frontend:
        setup_frontend()
    elif args.clean:
        clean_environment()
    elif args.run_backend:
        run_backend()
    elif args.run_frontend:
        run_frontend()
    elif args.activate_venv:
        activate_venv_shell()
    elif args.all or len(sys.argv) == 1:  # Default behavior if no args
        setup_all()
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
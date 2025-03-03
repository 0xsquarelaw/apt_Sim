import React, { useEffect, useRef } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import { terminalCommands } from '../data/mockData';

const Terminal: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);

  useEffect(() => {
    if (!terminalRef.current) return;
    
    // Initialize xterm.js
    xtermRef.current = new XTerm({
      cursorBlink: true,
      theme: {
        background: '#1E1E1E',
        foreground: '#F8F8F8',
        cursor: '#FFFFFF',
        selectionBackground: '#5DA5D533',
        black: '#1E1E1E',
        brightBlack: '#666666',
        red: '#E06C75',
        brightRed: '#FF3334',
        green: '#98C379',
        brightGreen: '#9EC400',
        yellow: '#E5C07B',
        brightYellow: '#FFCC66',
        blue: '#61AFEF',
        brightBlue: '#7AA6DA',
        magenta: '#C678DD',
        brightMagenta: '#B77EE0',
        cyan: '#56B6C2',
        brightCyan: '#54CED6',
        white: '#D7DAE0',
        brightWhite: '#FFFFFF'
      }
    });
    
    // Create and attach the fit addon
    fitAddonRef.current = new FitAddon();
    xtermRef.current.loadAddon(fitAddonRef.current);
    
    // Open the terminal in the container
    xtermRef.current.open(terminalRef.current);
    
    // Use a small timeout to ensure the terminal is fully rendered before fitting
    setTimeout(() => {
      if (fitAddonRef.current && terminalRef.current) {
        try {
          fitAddonRef.current.fit();
        } catch (e) {
          console.warn('Failed to fit terminal:', e);
        }
      }
      
      // Display welcome message after fitting
      if (xtermRef.current) {
        xtermRef.current.writeln('\x1b[1;34m=== CyberShield Terminal ===\x1b[0m');
        xtermRef.current.writeln('Type \x1b[1;33mhelp\x1b[0m to see available commands');
        xtermRef.current.writeln('');
        xtermRef.current.write('$ ');
      }
    }, 100);
    
    // Handle user input
    let currentLine = '';
    
    const keyHandler = ({ key, domEvent }: { key: string, domEvent: KeyboardEvent }) => {
      const terminal = xtermRef.current;
      if (!terminal) return;
      
      const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;
      
      if (domEvent.keyCode === 13) { // Enter key
        terminal.writeln('');
        processCommand(currentLine);
        currentLine = '';
        terminal.write('$ ');
      } else if (domEvent.keyCode === 8) { // Backspace
        if (currentLine.length > 0) {
          currentLine = currentLine.substring(0, currentLine.length - 1);
          terminal.write('\b \b');
        }
      } else if (printable) {
        currentLine += key;
        terminal.write(key);
      }
    };
    
    if (xtermRef.current) {
      xtermRef.current.onKey(keyHandler);
    }
    
    const processCommand = (command: string) => {
      if (!xtermRef.current) return;
      
      const cmd = command.trim().toLowerCase();
      
      if (cmd === 'help') {
        xtermRef.current.writeln('\x1b[1;33mAvailable commands:\x1b[0m');
        terminalCommands.forEach(c => {
          xtermRef.current?.writeln(`  \x1b[1;32m${c.command}\x1b[0m - ${c.description}`);
        });
        xtermRef.current.writeln('  \x1b[1;32mclear\x1b[0m - Clear the terminal screen');
        xtermRef.current.writeln('  \x1b[1;32mhelp\x1b[0m - Show this help message');
      } else if (cmd === 'clear') {
        xtermRef.current.clear();
      } else if (cmd === 'scan --network') {
        simulateNetworkScan();
      } else if (cmd === 'analyze --logs') {
        simulateLogAnalysis();
      } else if (cmd === 'simulate --attack persistence') {
        simulatePersistenceAttack();
      } else if (cmd === 'report --generate') {
        generateReport();
      } else if (cmd === 'mitigate --threat') {
        mitigateThreat();
      } else if (cmd) {
        xtermRef.current.writeln(`\x1b[31mCommand not found: ${cmd}\x1b[0m`);
        xtermRef.current.writeln('Type \x1b[1;33mhelp\x1b[0m to see available commands');
      }
    };
    
    const simulateNetworkScan = () => {
      if (!xtermRef.current) return;
      
      xtermRef.current.writeln('\x1b[1;34mInitiating network scan...\x1b[0m');
      
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress <= 100) {
          xtermRef.current?.write(`\r\x1b[KScanning: ${progress}% complete`);
        } else {
          clearInterval(interval);
          xtermRef.current?.writeln('\r\x1b[KScan complete.');
          xtermRef.current?.writeln('\x1b[1;32mResults:\x1b[0m');
          xtermRef.current?.writeln('- 24 hosts discovered');
          xtermRef.current?.writeln('- 3 potential vulnerabilities detected');
          xtermRef.current?.writeln('- 1 critical security issue found');
          xtermRef.current?.writeln('\x1b[1;33mRecommendation: Run "mitigate --threat" to address issues\x1b[0m');
        }
      }, 300);
    };
    
    const simulateLogAnalysis = () => {
      if (!xtermRef.current) return;
      
      xtermRef.current.writeln('\x1b[1;34mAnalyzing system logs...\x1b[0m');
      
      setTimeout(() => {
        xtermRef.current?.writeln('\x1b[1;33mSuspicious activities detected:\x1b[0m');
        xtermRef.current?.writeln('- Multiple failed login attempts from IP 192.168.1.45');
        xtermRef.current?.writeln('- Unusual process execution at 03:24:15 UTC');
        xtermRef.current?.writeln('- Modification of system files in /etc/cron.d/');
        xtermRef.current?.writeln('- Outbound connection to known malicious IP 45.227.253.109');
      }, 2000);
    };
    
    const simulatePersistenceAttack = () => {
      if (!xtermRef.current) return;
      
      xtermRef.current.writeln('\x1b[1;31mInitiating persistence attack simulation...\x1b[0m');
      
      setTimeout(() => {
        xtermRef.current?.writeln('\x1b[34mSimulating: Creating hidden user account...\x1b[0m');
      }, 500);
      
      setTimeout(() => {
        xtermRef.current?.writeln('\x1b[34mSimulating: Adding entry to crontab...\x1b[0m');
      }, 1500);
      
      setTimeout(() => {
        xtermRef.current?.writeln('\x1b[34mSimulating: Installing backdoor service...\x1b[0m');
      }, 2500);
      
      setTimeout(() => {
        xtermRef.current?.writeln('\x1b[34mSimulating: Modifying startup scripts...\x1b[0m');
      }, 3500);
      
      setTimeout(() => {
        xtermRef.current?.writeln('\x1b[1;32mSimulation complete. Persistence mechanisms established.\x1b[0m');
        xtermRef.current?.writeln('\x1b[1;33mRecommendation: Review system for indicators of compromise\x1b[0m');
      }, 4500);
    };
    
    const generateReport = () => {
      if (!xtermRef.current) return;
      
      xtermRef.current.writeln('\x1b[1;34mGenerating security report...\x1b[0m');
      
      setTimeout(() => {
        xtermRef.current?.writeln('\x1b[1;32mReport generated successfully.\x1b[0m');
        xtermRef.current?.writeln('\x1b[1mSummary:\x1b[0m');
        xtermRef.current?.writeln('- 24 hosts scanned');
        xtermRef.current?.writeln('- 3 vulnerabilities detected');
        xtermRef.current?.writeln('- 1 critical issue requires immediate attention');
        xtermRef.current?.writeln('- 2 medium severity issues should be addressed within 7 days');
        xtermRef.current?.writeln('\x1b[1;33mFull report saved to /reports/security-audit-2025-04-16.pdf\x1b[0m');
      }, 3000);
    };
    
    const mitigateThreat = () => {
      if (!xtermRef.current) return;
      
      xtermRef.current.writeln('\x1b[1;34mInitiating threat mitigation...\x1b[0m');
      
      let progress = 0;
      const interval = setInterval(() => {
        progress += 20;
        if (progress <= 100) {
          xtermRef.current?.write(`\r\x1b[KApplying mitigations: ${progress}% complete`);
        } else {
          clearInterval(interval);
          xtermRef.current?.writeln('\r\x1b[KMitigation complete.');
          xtermRef.current?.writeln('\x1b[1;32mActions taken:\x1b[0m');
          xtermRef.current?.writeln('- Removed unauthorized cron jobs');
          xtermRef.current?.writeln('- Terminated suspicious processes');
          xtermRef.current?.writeln('- Blocked outbound connections to malicious IPs');
          xtermRef.current?.writeln('- Applied security patches to vulnerable services');
          xtermRef.current?.writeln('\x1b[1;33mSystem security posture improved.\x1b[0m');
        }
      }, 500);
    };
    
    // Handle window resize
    const handleResize = () => {
      if (fitAddonRef.current && terminalRef.current) {
        try {
          fitAddonRef.current.fit();
        } catch (e) {
          console.warn('Failed to fit terminal on resize:', e);
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      if (xtermRef.current) {
        try {
          xtermRef.current.dispose();
        } catch (e) {
          console.warn('Error disposing terminal:', e);
        }
      }
    };
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="bg-gray-800 text-white px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-sm font-medium">CyberShield Terminal</span>
        </div>
        <div className="text-xs text-gray-400">
          Type 'help' for available commands
        </div>
      </div>
      <div 
        ref={terminalRef} 
        className="flex-1 bg-gray-900 overflow-hidden"
      />
    </div>
  );
};

export default Terminal;
import React, { useState, useEffect } from 'react';
import Terminal from './Terminal';

const ThreatSimulation: React.FC = () => {
  const [activeTab, setActiveTab] = useState('terminal');
  const [mounted, setMounted] = useState(false);
  
  // Ensure component is fully mounted before rendering terminal
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  
  const tabs = [
    { id: 'terminal', label: 'Terminal' },
    { id: 'config', label: 'Configuration' },
    { id: 'results', label: 'Results' }
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Attack Persistence Simulation</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Simulate and analyze persistence techniques used by threat actors
          </p>
        </div>
        <div className="px-6 flex border-b border-gray-200 dark:border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-4 text-sm font-medium border-b-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden">
        {activeTab === 'terminal' && mounted && (
          <Terminal />
        )}
        
        {activeTab === 'config' && (
          <div className="p-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Simulation Configuration</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Target Environment
                  </label>
                  <select className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Windows Server 2022</option>
                    <option>Ubuntu 22.04 LTS</option>
                    <option>macOS Ventura</option>
                    <option>Custom Environment</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Persistence Techniques
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="registry" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                      <label htmlFor="registry" className="ml-2 text-sm text-gray-700 dark:text-gray-300">Registry Modifications</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="startup" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                      <label htmlFor="startup" className="ml-2 text-sm text-gray-700 dark:text-gray-300">Startup Folder</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="scheduled" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                      <label htmlFor="scheduled" className="ml-2 text-sm text-gray-700 dark:text-gray-300">Scheduled Tasks/Cron Jobs</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="services" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                      <label htmlFor="services" className="ml-2 text-sm text-gray-700 dark:text-gray-300">Service Creation</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="accounts" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                      <label htmlFor="accounts" className="ml-2 text-sm text-gray-700 dark:text-gray-300">Account Creation</label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Simulation Duration
                  </label>
                  <div className="flex items-center">
                    <input 
                      type="range" 
                      min="1" 
                      max="60" 
                      defaultValue="15"
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer" 
                    />
                    <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">15 minutes</span>
                  </div>
                </div>
                
                <div className="pt-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Start Simulation
                  </button>
                  <button className="ml-4 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Save Configuration
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'results' && (
          <div className="p-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Simulation Results</h2>
              
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-md font-medium text-gray-900 dark:text-white">Last Simulation: April 16, 2025 09:45 AM</h3>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Completed
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Target: Windows Server 2022 | Duration: 15 minutes | Techniques: 4
                </p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">Persistence Mechanisms Detected</h3>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4">
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <li className="flex items-start">
                        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 mr-2">1</span>
                        <div>
                          <p className="font-medium">Registry Run Key</p>
                          <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                            HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run\SystemService
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 mr-2">2</span>
                        <div>
                          <p className="font-medium">Scheduled Task</p>
                          <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                            Task Name: SystemHealthMonitor | Schedule: Daily at 3:00 AM
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 mr-2">3</span>
                        <div>
                          <p className="font-medium">Windows Service</p>
                          <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                            Service Name: SysMonitorSvc | Start Type: Automatic
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 mr-2">4</span>
                        <div>
                          <p className="font-medium">Startup Folder</p>
                          <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                            File: C:\ProgramData\Microsoft\Windows\Start Menu\Programs\StartUp\svchost.exe
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">Mitigation Recommendations</h3>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4">
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <li className="flex items-start">
                        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mr-2">•</span>
                        <div>
                          <p>Implement AppLocker or Software Restriction Policies to prevent unauthorized executables</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mr-2">•</span>
                        <div>
                          <p>Monitor registry for unauthorized modifications to Run keys</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mr-2">•</span>
                        <div>
                          <p>Regularly audit scheduled tasks and services for suspicious entries</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mr-2">•</span>
                        <div>
                          <p>Implement privileged access management to limit service creation capabilities</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="pt-4 flex space-x-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Export Report
                  </button>
                  <button className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Run New Simulation
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThreatSimulation;
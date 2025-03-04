import React, { useState } from 'react';
import { Bell, Shield, Eye, Lock, Monitor } from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  
  const tabs = [
    { id: 'general', label: 'General', icon: <Monitor size={16} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={16} /> },
    { id: 'security', label: 'Security', icon: <Shield size={16} /> },
    { id: 'privacy', label: 'Privacy', icon: <Eye size={16} /> },
    { id: 'access', label: 'Access Control', icon: <Lock size={16} /> }
  ];

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Settings</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-64 bg-gray-50 dark:bg-gray-900 p-4 md:p-6 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
              <nav>
                <ul className="space-y-1">
                  {tabs.map((tab) => (
                    <li key={tab.id}>
                      <button
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                          activeTab === tab.id
                            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        <span className="mr-3">{tab.icon}</span>
                        {tab.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            
            <div className="flex-1 p-6">
              {activeTab === 'general' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">General Settings</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Theme
                      </label>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <input type="radio" id="light" name="theme" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                          <label htmlFor="light" className="ml-2 text-sm text-gray-700 dark:text-gray-300">Light</label>
                        </div>
                        <div className="flex items-center">
                          <input type="radio" id="dark" name="theme" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" defaultChecked />
                          <label htmlFor="dark" className="ml-2 text-sm text-gray-700 dark:text-gray-300">Dark</label>
                        </div>
                        <div className="flex items-center">
                          <input type="radio" id="system" name="theme" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                          <label htmlFor="system" className="ml-2 text-sm text-gray-700 dark:text-gray-300">System</label>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Language
                      </label>
                      <select className="w-full max-w-xs rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                        <option>Japanese</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Time Zone
                      </label>
                      <select className="w-full max-w-xs rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>UTC (Coordinated Universal Time)</option>
                        <option>EST (Eastern Standard Time)</option>
                        <option>CST (Central Standard Time)</option>
                        <option>MST (Mountain Standard Time)</option>
                        <option>PST (Pacific Standard Time)</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center">
                      <input type="checkbox" id="sidebar" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                      <label htmlFor="sidebar" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        Collapse sidebar by default
                      </label>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notification Settings</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">Email Notifications</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <input type="checkbox" id="email-alerts" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                            <label htmlFor="email-alerts" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                              Security Alerts
                            </label>
                          </div>
                          <select className="text-xs rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-2 py-1">
                            <option>All Alerts</option>
                            <option>Critical Only</option>
                            <option>None</option>
                          </select>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <input type="checkbox" id="email-reports" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                            <label htmlFor="email-reports" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                              Weekly Reports
                            </label>
                          </div>
                          <select className="text-xs rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-2 py-1">
                            <option>Monday</option>
                            <option>Friday</option>
                          </select>
                        </div>
                        
                        <div className="flex items-center">
                          <input type="checkbox" id="email-updates" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                          <label htmlFor="email-updates" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            System Updates
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">In-App Notifications</h3>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input type="checkbox" id="app-alerts" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                          <label htmlFor="app-alerts" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            Real-time Security Alerts
                          </label>
                        </div>
                        
                        <div className="flex items-center">
                          <input type="checkbox" id="app-tasks" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                          <label htmlFor="app-tasks" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            Task Assignments
                          </label>
                        </div>
                        
                        <div className="flex items-center">
                          <input type="checkbox" id="app-news" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                          <label htmlFor="app-news" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            Security News Updates
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'security' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Security Settings</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">Password</h3>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Change Password
                      </button>
                    </div>
                    
                    <div>
                      <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">Two-Factor Authentication</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input type="checkbox" id="2fa" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                          <label htmlFor="2fa" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            Enable Two-Factor Authentication
                          </label>
                        </div>
                        <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
                          Configure
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">Session Management</h3>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input type="checkbox" id="auto-logout" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                          <label htmlFor="auto-logout" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            Auto-logout after inactivity
                          </label>
                        </div>
                        
                        <div className="flex items-center pl-6">
                          <label htmlFor="timeout" className="text-sm text-gray-700 dark:text-gray-300 mr-2">
                            Timeout:
                          </label>
                          <select id="timeout" className="text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-2 py-1">
                            <option>15 minutes</option>
                            <option>30 minutes</option>
                            <option>1 hour</option>
                            <option>4 hours</option>
                          </select>
                        </div>
                      </div>
                      
                      <button className="mt-4 text-red-600 dark:text-red-400 text-sm font-medium hover:underline">
                        Log out of all other sessions
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'privacy' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Privacy Settings</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">Data Collection</h3>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input type="checkbox" id="usage-data" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                          <label htmlFor="usage-data" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            Share usage data to improve the platform
                          </label>
                        </div>
                        
                        <div className="flex items-center">
                          <input type="checkbox" id="error-reports" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                          <label htmlFor="error-reports" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            Send error reports automatically
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">Activity Logging</h3>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input type="checkbox" id="command-history" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                          <label htmlFor="command-history" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            Save command history
                          </label>
                        </div>
                        
                        <div className="flex items-center">
                          <input type="checkbox" id="login-history" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                          <label htmlFor="login-history" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            Track login history
                          </label>
                        </div>
                      </div>
                      
                      <button className="mt-4 text-red-600 dark:text-red-400 text-sm font-medium hover:underline">
                        Clear all activity history
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'access' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Access Control</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">API Access</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input type="checkbox" id="api-access" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                          <label htmlFor="api-access" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            Enable API Access
                          </label>
                        </div>
                        <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
                          Manage API Keys
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">IP Restrictions</h3>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input type="checkbox" id="ip-whitelist" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                          <label htmlFor="ip-whitelist" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            Enable IP Whitelisting
                          </label>
                        </div>
                        
                        <div className="pl-6">
                          <textarea 
                            placeholder="Enter IP addresses (one per line)" 
                            className="w-full h-24 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">Access Logs</h3>
                      <button className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 text-sm font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        View Access Logs
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                <button className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium py-2 px-4 rounded-md mr-4 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                  Cancel
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
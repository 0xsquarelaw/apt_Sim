import React from 'react';
import { currentUser } from '../data/mockData';
import { Mail, Shield, Calendar, Key } from 'lucide-react';

const Profile: React.FC = () => {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32"></div>
          <div className="px-6 py-4 relative">
            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 mb-4 sm:mb-6 sm:space-x-5">
              <img 
                src={currentUser.avatar} 
                alt="User avatar" 
                className="h-24 w-24 rounded-full border-4 border-white dark:border-gray-800 bg-white"
              />
              <div className="mt-4 sm:mt-0 text-center sm:text-left">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{currentUser.name}</h1>
                <p className="text-gray-600 dark:text-gray-400">{currentUser.role}</p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail size={18} className="text-gray-500 dark:text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                        <p className="text-gray-900 dark:text-white">{currentUser.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Shield size={18} className="text-gray-500 dark:text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Role</p>
                        <p className="text-gray-900 dark:text-white">{currentUser.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Calendar size={18} className="text-gray-500 dark:text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Joined</p>
                        <p className="text-gray-900 dark:text-white">January 15, 2025</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                      Edit Profile
                    </button>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Security</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Key size={18} className="text-gray-500 dark:text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Password</p>
                        <p className="text-gray-900 dark:text-white">Last changed 30 days ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center mr-3">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <div>
                        <p className="text-gray-900 dark:text-white">Two-factor authentication enabled</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center mr-3">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <div>
                        <p className="text-gray-900 dark:text-white">Recovery methods configured</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                      Security Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 mt-6 pt-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
              
              <div className="space-y-4">
                <div className="flex">
                  <div className="flex-shrink-0 h-4 w-4 rounded-full bg-blue-500 mt-1"></div>
                  <div className="ml-3">
                    <p className="text-gray-900 dark:text-white">Ran persistence attack simulation</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Today at 09:45 AM</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 h-4 w-4 rounded-full bg-yellow-500 mt-1"></div>
                  <div className="ml-3">
                    <p className="text-gray-900 dark:text-white">Generated security report</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Yesterday at 03:12 PM</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 h-4 w-4 rounded-full bg-green-500 mt-1"></div>
                  <div className="ml-3">
                    <p className="text-gray-900 dark:text-white">Updated system configurations</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">April 14, 2025 at 11:30 AM</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 h-4 w-4 rounded-full bg-purple-500 mt-1"></div>
                  <div className="ml-3">
                    <p className="text-gray-900 dark:text-white">Added new monitoring rules</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">April 12, 2025 at 02:45 PM</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
                  View all activity
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
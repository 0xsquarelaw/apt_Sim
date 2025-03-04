import React from "react";
import { Bell, Moon, Sun, Search } from "lucide-react";
import { currentUser } from "../data/mockData";

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search threats, commands, alerts..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          <button
            onClick={toggleDarkMode}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="flex items-center space-x-3">
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {currentUser.name}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {currentUser.role}
              </span>
            </div>
            <img
              src={currentUser.avatar}
              alt="User avatar"
              className="h-8 w-8 rounded-full"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

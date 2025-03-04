import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  User,
  Settings,
  Shield,
  Terminal,
  BarChart,
  AlertTriangle,
  LogOut,
  Brain,
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleSidebar }) => {
  const navItems = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/" },
    { name: "Chat With AI", icon: <Brain size={20} />, path: "/chat-with-ai" },
    {
      name: "Threat Simulation",
      icon: <Shield size={20} />,
      path: "/threat-simulation",
    },
    { name: "Terminal", icon: <Terminal size={20} />, path: "/terminal" },
    { name: "Analytics", icon: <BarChart size={20} />, path: "/analytics" },
    { name: "Alerts", icon: <AlertTriangle size={20} />, path: "/alerts" },
    { name: "Profile", icon: <User size={20} />, path: "/profile" },
    { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
  ];

  return (
    <div
      className={`h-screen bg-gray-900 text-white transition-all duration-300 flex flex-col ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <Shield size={24} className="text-blue-400" />
            <span className="font-bold text-xl">CyberShield</span>
          </div>
        )}
        {collapsed && <Shield size={24} className="text-blue-400 mx-auto" />}
        <button
          onClick={toggleSidebar}
          className={`text-gray-400 hover:text-white ${
            collapsed ? "mx-auto" : ""
          }`}
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>

      <nav className="mt-6 flex-1">
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-2">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center py-3 px-4 ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  } ${collapsed ? "justify-center" : "justify-start"}`
                }
              >
                <span>{item.icon}</span>
                {!collapsed && <span className="ml-3">{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-gray-700 p-4">
        <button
          className={`flex items-center text-gray-400 hover:text-white ${
            collapsed ? "justify-center" : "justify-start"
          }`}
        >
          <LogOut size={20} />
          {!collapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

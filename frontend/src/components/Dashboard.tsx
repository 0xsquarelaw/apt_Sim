import React from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Shield, AlertTriangle, Server, Users, Clock } from 'lucide-react';
import { threatData, timeSeriesData } from '../data/mockData';

const Dashboard: React.FC = () => {
  const stats = [
    { 
      title: 'Threat Level', 
      value: 'Medium', 
      change: '+5%', 
      icon: <Shield size={20} className="text-blue-500" />,
      color: 'bg-blue-100 dark:bg-blue-900'
    },
    { 
      title: 'Active Alerts', 
      value: '12', 
      change: '-3', 
      icon: <AlertTriangle size={20} className="text-yellow-500" />,
      color: 'bg-yellow-100 dark:bg-yellow-900'
    },
    { 
      title: 'Systems Monitored', 
      value: '24', 
      change: '+2', 
      icon: <Server size={20} className="text-purple-500" />,
      color: 'bg-purple-100 dark:bg-purple-900'
    },
    { 
      title: 'Users', 
      value: '18', 
      change: '0', 
      icon: <Users size={20} className="text-green-500" />,
      color: 'bg-green-100 dark:bg-green-900'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className={`${stat.color} rounded-lg p-4 shadow-sm`}
          >
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
              </div>
              <div className="p-2 rounded-full bg-white dark:bg-gray-800">
                {stat.icon}
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className={`text-sm ${stat.change.includes('+') ? 'text-green-600 dark:text-green-400' : stat.change === '0' ? 'text-gray-500 dark:text-gray-400' : 'text-red-600 dark:text-red-400'}`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">from last period</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Attack Vectors</h2>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Clock size={16} className="mr-1" />
              <span>Last 24 hours</span>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={threatData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {threatData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Attack Timeline</h2>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Clock size={16} className="mr-1" />
              <span>Last 24 hours</span>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={timeSeriesData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="attacks" 
                  stroke="#FF6384" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="mitigations" 
                  stroke="#36A2EB" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Threat Categories</h2>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Clock size={16} className="mr-1" />
            <span>Last 7 days</span>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={threatData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Threat Score">
                {threatData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
import React, { useState, useEffect } from "react";
import { newsItems } from "../data/mockData";
import { ExternalLink } from "lucide-react";

const NewsBar: React.FC = () => {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 py-2 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded mr-3">
            LIVE
          </span>
          <span className="text-gray-800 dark:text-gray-200">
            {newsItems[currentNewsIndex].title}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {newsItems[currentNewsIndex].source} •{" "}
            {newsItems[currentNewsIndex].date}
          </span>
          <a
            href={newsItems[currentNewsIndex].url}
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsBar;

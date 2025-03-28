import { ThreatData, TimeSeriesData, NewsItem, User, TerminalCommand } from './types';
import { threatData as mockThreatData, timeSeriesData as mockTimeSeriesData, newsItems as mockNewsItems, currentUser as mockUser, terminalCommands as mockCommands } from './data/mockData';

const API_BASE_URL = 'http://localhost:8000';  // Remove '/api' since we're not using that prefix

// Error handling helper
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'API request failed');
  }
  return response.json();
};

// Fetch threat data with fallback to mock data
export const fetchThreatData = async (): Promise<ThreatData[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/threats`); // Use the endpoint we created
    return await handleResponse(response);
  } catch (error) {
    console.warn("Error fetching threat data, using mock data:", error);
    return mockThreatData; // Fallback to mock data on error
  }
};

// Fetch time series data with fallback
export const fetchTimeSeriesData = async (): Promise<TimeSeriesData[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/time-series`);
    return await handleResponse(response);
  } catch (error) {
    console.warn("Error fetching time series data, using mock data:", error);
    return mockTimeSeriesData;
  }
};

// Other fetch functions with fallbacks...
export const fetchNewsItems = async (): Promise<NewsItem[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/news`);
    return await handleResponse(response);
  } catch (error) {
    console.warn("Error fetching news, using mock data:", error);
    return mockNewsItems;
  }
};

export const fetchCurrentUser = async (): Promise<User> => {
  try {
    const response = await fetch(`${API_BASE_URL}/current-user`);
    return await handleResponse(response);
  } catch (error) {
    console.warn("Error fetching user data, using mock data:", error);
    return mockUser;
  }
};

export const fetchTerminalCommands = async (): Promise<TerminalCommand[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/terminal-commands`);
    return await handleResponse(response);
  } catch (error) {
    console.warn("Error fetching terminal commands, using mock data:", error);
    return mockCommands;
  }
};
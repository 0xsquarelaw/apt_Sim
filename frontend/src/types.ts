export interface ThreatData {
  id?: number;
  name: string;
  value: number;
  color: string;
}

export interface TimeSeriesData {
  id?: number;
  time: string;
  attacks: number;
  mitigations: number;
}

export interface NewsItem {
  id: string | number;
  title: string;
  source: string;
  date: string;
  url: string;
}

export interface User {
  id: string | number;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

export interface TerminalCommand {
  id?: number;
  command: string;
  description: string;
}
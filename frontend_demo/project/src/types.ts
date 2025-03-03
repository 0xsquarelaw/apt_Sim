export interface ThreatData {
  name: string;
  value: number;
  color: string;
}

export interface TimeSeriesData {
  time: string;
  attacks: number;
  mitigations: number;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  url: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}
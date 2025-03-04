import { ThreatData, TimeSeriesData, NewsItem, User } from '../types';

export const threatData: ThreatData[] = [
  { name: 'Persistence', value: 78, color: '#FF6384' },
  { name: 'Privilege Escalation', value: 65, color: '#36A2EB' },
  { name: 'Defense Evasion', value: 83, color: '#FFCE56' },
  { name: 'Credential Access', value: 47, color: '#4BC0C0' },
  { name: 'Discovery', value: 52, color: '#9966FF' },
  { name: 'Lateral Movement', value: 43, color: '#FF9F40' }
];

export const timeSeriesData: TimeSeriesData[] = [
  { time: '00:00', attacks: 12, mitigations: 10 },
  { time: '04:00', attacks: 18, mitigations: 15 },
  { time: '08:00', attacks: 35, mitigations: 30 },
  { time: '12:00', attacks: 42, mitigations: 38 },
  { time: '16:00', attacks: 28, mitigations: 24 },
  { time: '20:00', attacks: 15, mitigations: 13 }
];

export const newsItems: NewsItem[] = [
  {
    id: '1',
    title: 'New Ransomware Variant Targets Healthcare Sector',
    source: 'CyberSecurity News',
    date: '2025-04-15',
    url: '#'
  },
  {
    id: '2',
    title: 'Critical Vulnerability Found in Popular VPN Service',
    source: 'Threat Post',
    date: '2025-04-14',
    url: '#'
  },
  {
    id: '3',
    title: 'APT Group Targets Financial Institutions with New Malware',
    source: 'Dark Reading',
    date: '2025-04-13',
    url: '#'
  },
  {
    id: '4',
    title: 'Zero-Day Exploit Discovered in Widely Used Email Client',
    source: 'Krebs on Security',
    date: '2025-04-12',
    url: '#'
  },
  {
    id: '5',
    title: 'CISA Releases Advisory on Supply Chain Attacks',
    source: 'CISA',
    date: '2025-04-11',
    url: '#'
  }
];

export const currentUser: User = {
  id: '1',
  name: 'Alex Morgan',
  email: 'alex.morgan@securityops.com',
  role: 'Security Analyst',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
};

export const terminalCommands = [
  { command: 'scan --network', description: 'Scan network for vulnerabilities' },
  { command: 'analyze --logs', description: 'Analyze system logs for suspicious activity' },
  { command: 'simulate --attack persistence', description: 'Simulate persistence attack vector' },
  { command: 'report --generate', description: 'Generate security report' },
  { command: 'mitigate --threat', description: 'Apply mitigation strategies' }
];
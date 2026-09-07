export type ServiceId = 'web-dev' | 'digital-marketing' | 'ai-automation' | 'app-dev';

export interface ServiceInfo {
  id: ServiceId;
  number: string;
  title: string;
  tagline: string;
  description: string;
  outcomes: string[];
  capabilities: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  serviceId: ServiceId;
  description: string;
  tags: string[];
}

/** Live Digivate work shown on Home + Portfolio — not sample placeholders. */
export interface ShowcaseWorkItem {
  id: string;
  title: string;
  category: string;
  serviceId: ServiceId;
  description: string;
  image: string;
  link: string;
  tags: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  timestamp: number;
}

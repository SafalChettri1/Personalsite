export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: string;
}

export interface Experience {
  id: string;
  period: string;
  role: string;
  company: string;
  description: string;
  details?: string[];
}

export interface AcademicPaper {
  id: string;
  title: string;
  journal: string;
  summary: string;
  url?: string;
  accentTag?: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: Date;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  client: string;
  year: string;
  link: string;
  role: string;
  challenge: string;
  solution: string;
}

export interface Service {
  id: string;
  title: string;
  iconName: string; // Lucide icon identifier
  description: string;
  features: string[];
  glowColor: 'blue' | 'purple' | 'cyan';
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  twitter?: string;
  linkedin?: string;
  github?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  avatar: string;
}

export interface ContactFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

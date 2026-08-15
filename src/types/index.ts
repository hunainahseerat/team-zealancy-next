// ============================================================
// Shared TypeScript types for Team Zealancy CMS
// These field names align with WordPress ACF field naming conventions
// ============================================================

export type JobStatus = 'active' | 'paused' | 'archived';
export type ApplicationStatus = 'new' | 'reviewing' | 'shortlisted' | 'rejected' | 'hired';

export interface Job {
  id: string;
  slug: string;
  title: string;
  department: string;
  type: string;
  location?: string;
  isUrgent?: boolean;
  shortDesc: string;
  fullDesc?: string;
  requirements?: string[];
  responsibilities?: string[];
  skills?: string[];
  applyUrl?: string;
  order?: number;
  isVisible?: boolean;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  linkedin?: string;
  portfolio?: string;
  coverLetter: string;
  resumeFileName: string;
  status: ApplicationStatus;
  submittedAt: string; // ISO date string
  notes?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  bgClass?: string;
  bio: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  socials?: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
  order?: number;
  isVisible?: boolean;
}

export interface Benefit {
  id: string;
  icon: string; // SVG path string or icon name
  title: string;
  description: string;
  order: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  order: number;
  isVisible: boolean;
}

export interface HiringStep {
  id: string;
  number: string; // e.g. "01"
  title: string;
  description: string;
  order: number;
}

export interface Voice {
  id: string;
  name: string;
  role: string;
  quote: string;
  wistiaId?: string;
  videoUrl?: string;
  bgClass: string;
  order?: number;
  isVisible?: boolean;
}

export interface HeroRotatorWord {
  id: string;
  word: string;
  order: number;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  contactEmail: string;
  whatsappNumber: string;
  instagramUrl: string;
  linkedinUrl: string;
  locationCity: string;
  locationCountry: string;
  isOpenToWork: boolean;
  heroHeadlinePrefix: string;
  heroHeadlineSuffix: string;
  heroSubtext: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  ogImageUrl: string;
}

export interface DashboardStats {
  totalJobs: number;
  activeJobs: number;
  totalApplications: number;
  newApplicationsThisWeek: number;
  teamSize: number;
  openPositions: number;
}

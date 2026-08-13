import type { TeamMember } from '@/types';

export const MOCK_TEAM: TeamMember[] = [
  {
    id: 'team-001',
    name: 'Zain Ul Abideen',
    role: 'Founder & Creative Director',
    bio: 'Started Zealancy with one goal — make content that actually earns its view. Led creative for channels that have collectively crossed 3.2B views.',
    instagramUrl: 'https://www.instagram.com/teamzealancy/',
    linkedinUrl: 'https://www.linkedin.com/company/zealancy',
    order: 1,
    isVisible: true,
  },
  {
    id: 'team-002',
    name: 'Mahnoor Siddiqui',
    role: 'Head of Post-Production',
    bio: 'Runs the edit bay. Five years of long-form experience across gaming, education, and documentary formats. If the pacing is wrong, she finds it.',
    instagramUrl: 'https://www.instagram.com/teamzealancy/',
    linkedinUrl: 'https://www.linkedin.com/company/zealancy',
    order: 2,
    isVisible: true,
  },
  {
    id: 'team-003',
    name: 'Faisal Rehman',
    role: 'Senior Graphic Designer',
    bio: "Thumbnail is the first cut. Faisal's work has pushed CTRs north of 12% across multiple niches. Numbers and aesthetics, equally.",
    instagramUrl: 'https://www.instagram.com/teamzealancy/',
    linkedinUrl: 'https://www.linkedin.com/company/zealancy',
    order: 3,
    isVisible: true,
  },
];

export const MOCK_VOICES = [
  {
    id: 'voice-001',
    quote:
      "I came in knowing the basics. Six months in, I'm cutting for channels with 5M subscribers. The feedback here is direct but it actually makes you better.",
    name: 'Omar F.',
    role: 'Video Editor',
    initials: 'OF',
    order: 1,
    isVisible: true,
  },
  {
    id: 'voice-002',
    quote:
      "The work is real from day one. No busy work, no 'sit and observe'. You're in the brief, you're in the feedback loop, and you grow because of it.",
    name: 'Hira K.',
    role: 'Graphic Designer',
    initials: 'HK',
    order: 2,
    isVisible: true,
  },
  {
    id: 'voice-003',
    quote:
      "I had offers from bigger agencies. I chose Zealancy because the work itself is the standard — not the brand name above the door.",
    name: 'Raza M.',
    role: 'Motion Artist',
    initials: 'RM',
    order: 3,
    isVisible: true,
  },
];

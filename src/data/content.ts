import type { FaqItem, HiringStep, Benefit, HeroRotatorWord, SiteSettings } from '@/types';

export const MOCK_FAQ: FaqItem[] = [
  {
    id: 'faq-001',
    question: 'Do I need a degree to apply?',
    answer: 'No. We look at your work, not where you studied. A strong portfolio beats a degree every time here.',
    order: 1,
    isVisible: true,
  },
  {
    id: 'faq-002',
    question: 'Is this fully remote?',
    answer: 'Most roles are fully remote. A few design roles have a hybrid option for those based in Lahore, but remote is the default.',
    order: 2,
    isVisible: true,
  },
  {
    id: 'faq-003',
    question: 'How long is the hiring process?',
    answer: "Usually 7–14 days from application to decision. We move quickly when we see someone we want. You won't be waiting weeks for a response.",
    order: 3,
    isVisible: true,
  },
  {
    id: 'faq-004',
    question: 'What does the trial look like?',
    answer: "A paid one-week trial on real client work. You'll have a senior editor or designer paired with you from day one. We don't use free trials.",
    order: 4,
    isVisible: true,
  },
  {
    id: 'faq-005',
    question: 'Can I apply if I\'m still in university?',
    answer: 'Yes, for the intern role and sometimes for the junior editor role. As long as you can commit to the hours, we can make it work.',
    order: 5,
    isVisible: true,
  },
  {
    id: 'faq-006',
    question: "What if I don't see a role that fits me?",
    answer: "Use the open application. We read every one. If your work is strong, we'll reach out — even if there's no open seat right now.",
    order: 6,
    isVisible: true,
  },
];

export const MOCK_HIRING_STEPS: HiringStep[] = [
  {
    id: 'step-001',
    number: '01',
    title: 'Application',
    description: 'Submit your application with your portfolio or reel. We review every submission personally — no automated filters.',
    order: 1,
  },
  {
    id: 'step-002',
    number: '02',
    title: 'Portfolio Review',
    description: "We look at your work first. If your output matches the standard we're after, you move forward. That's the only criteria at this stage.",
    order: 2,
  },
  {
    id: 'step-003',
    number: '03',
    title: 'Intro Call',
    description: "A 20-minute conversation. We want to understand how you think, what you care about, and whether this is a place you'd genuinely thrive.",
    order: 3,
  },
  {
    id: 'step-004',
    number: '04',
    title: 'Paid Trial',
    description: "One week on real client work. You'll be briefed, supported, and reviewed. We pay for this period regardless of outcome.",
    order: 4,
  },
  {
    id: 'step-005',
    number: '05',
    title: 'Offer',
    description: "If the trial goes well, we make an offer within 48 hours. No extended deliberation. You'll know exactly where you stand.",
    order: 5,
  },
];

export const MOCK_BENEFITS: Benefit[] = [
  { id: 'b-001', icon: 'remote', title: 'Fully Remote', description: 'Work from anywhere. We care about output, not office hours.', order: 1 },
  { id: 'b-002', icon: 'growth', title: 'Fast Growth', description: 'You level up faster here than anywhere. Feedback is direct and constant.', order: 2 },
  { id: 'b-003', icon: 'clients', title: 'Real Clients', description: 'Work with creators pulling millions of views from week one.', order: 3 },
  { id: 'b-004', icon: 'pay', title: 'Paid Trials', description: 'Every trial week is paid. We don\'t extract free work.', order: 4 },
  { id: 'b-005', icon: 'flexible', title: 'Flexible Hours', description: 'Own your schedule as long as deadlines are met.', order: 5 },
  { id: 'b-006', icon: 'mentorship', title: 'Senior Mentorship', description: 'Every new hire is paired with a senior from day one.', order: 6 },
];

export const MOCK_HERO_WORDS: HeroRotatorWord[] = [
  { id: 'hw-001', word: 'editors', order: 1 },
  { id: 'hw-002', word: 'designers', order: 2 },
  { id: 'hw-003', word: 'storytellers', order: 3 },
  { id: 'hw-004', word: 'motion artists', order: 4 },
  { id: 'hw-005', word: 'creators', order: 5 },
];

export const MOCK_SETTINGS: SiteSettings = {
  siteName: 'Team Zealancy',
  tagline: 'Make content for the top 1% of creators.',
  contactEmail: 'careers@teamzealancy.com',
  whatsappNumber: '+923001234567',
  instagramUrl: 'https://www.instagram.com/teamzealancy/',
  linkedinUrl: 'https://www.linkedin.com/company/zealancy',
  locationCity: 'Lahore',
  locationCountry: 'Pakistan',
  isOpenToWork: true,
  heroHeadlinePrefix: 'We hire the best',
  heroHeadlineSuffix: 'in the creator economy.',
  heroSubtext: 'Make content for the top 1% of creators. Real work, real feedback, real growth.',
  metaTitle: 'Careers at Team Zealancy - Make Content for Top 1%',
  metaDescription: 'Make content for the top 1% of creators. Team Zealancy is actively hiring for creative roles.',
  canonicalUrl: 'https://teamzealancy.com/career',
  ogImageUrl: 'https://teamzealancy.com/og-image.png',
};

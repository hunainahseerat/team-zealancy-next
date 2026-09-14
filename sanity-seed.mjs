#!/usr/bin/env node
/**
 * Sanity Seed Script — Uploads all 19 Team Zealancy live jobs to Sanity Studio
 * 
 * Usage:
 *   node sanity-seed.mjs
 *
 * Requirements:
 *   - SANITY_API_TOKEN env var (write token from sanity.io/manage → API → Tokens)
 *   - @sanity/client installed (already in package.json)
 *
 * Safety: Uses createOrReplace with deterministic _id so re-running is idempotent.
 */

import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';

// Load .env.local
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '07a4uqvi',
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET   || 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

if (!process.env.SANITY_API_TOKEN) {
  console.error('\nERROR: SANITY_API_TOKEN is not set in .env.local');
  console.error('Get a write token from: https://sanity.io/manage -> API -> Tokens\n');
  process.exit(1);
}

const jobs = [
  {
    _id: 'mock-job-001', _type: 'role',
    title: 'Long-Form Video Editor',
    slug: { _type: 'slug', current: 'long-form-video-editor' },
    department: 'Video Production', type: 'Full-time', mode: 'Remote',
    location: 'Pakistan (Remote)', experience: '2+ years',
    status: 'active', order: 1, isUrgent: true, urgentLabel: 'Hiring urgently',
    shortDesc: 'Edit long-form content for top creators with millions of subscribers.',
    description: 'You edit long-form videos for some of the biggest creators in the world. Storytelling, pacing, and retention are everything. If you understand what keeps people watching and know how to build that into an edit, this is your role.',
    responsibilities: [
      'Edit long-form YouTube videos (10–60 min) for engagement and retention.',
      'Work directly with creator briefs, raw footage, and detailed timelines.',
      'Apply graphics, transitions, colour grading, and sound design.',
      'Deliver consistently on tight turnaround windows.',
    ],
    requirements: [
      '2+ years editing long-form YouTube content professionally.',
      'Strong portfolio of videos with 100k+ views.',
      'Expert-level Premiere Pro or DaVinci Resolve.',
      'Deep understanding of retention, hooks, and storytelling structure.',
    ],
    niceToHave: [
      'Experience editing for creators with 1M+ subscribers.',
      'Motion graphics skills in After Effects.',
    ],
  },
  {
    _id: 'mock-job-002', _type: 'role',
    title: 'Short-Form Video Editor (UGC Ads)',
    slug: { _type: 'slug', current: 'short-form-video-editor-ugc-ads' },
    department: 'Video Production', type: 'Full-time', mode: 'Remote',
    location: 'Pakistan (Remote)', experience: '1+ year',
    status: 'active', order: 2, isUrgent: false,
    shortDesc: 'Edit high-converting short-form video ads for e-commerce brands.',
    description: 'You edit short-form video ads that drive real conversions. You understand hooks, pacing, and what makes people stop scrolling and actually buy. You work fast, stay on-brief, and know the difference between content that looks good and content that sells.',
    responsibilities: [
      'Edit 15–60 second video ads for paid social (Meta, TikTok, YouTube Shorts).',
      'Work with UGC footage, product clips, and creator-recorded content.',
      'Apply captions, graphics, music, and fast-paced cuts for ad performance.',
      'Manage multiple deliverables weekly across different client accounts.',
    ],
    requirements: [
      '1+ year editing short-form video ads or UGC content.',
      'Portfolio showing high-performing paid ad creatives.',
      'Fast turnaround ability with consistent quality under pressure.',
      'Strong understanding of direct-response video formats.',
    ],
    niceToHave: [
      'Experience with CapCut, Premiere Pro, or DaVinci Resolve.',
      'Understanding of e-commerce brand voice and performance metrics.',
    ],
  },
  {
    _id: 'mock-job-003', _type: 'role',
    title: 'Higgsfield Expert (AI Generations)',
    slug: { _type: 'slug', current: 'higgsfield-expert-ai-generations' },
    department: 'Video Production', type: 'Full-time', mode: 'Remote',
    location: 'Pakistan (Remote)', experience: '1+ year',
    status: 'active', order: 3, isUrgent: false,
    shortDesc: 'Generate and direct AI video using Higgsfield and other leading tools.',
    description: 'You generate cinematic, high-quality AI video content using Higgsfield and other frontier tools. You understand prompt engineering, iterative generation, and how to combine AI outputs with traditional editing to produce content that actually works at scale.',
    responsibilities: [
      'Generate AI video assets using Higgsfield, Runway, and Kling.',
      'Write and refine prompts to achieve specific visual outcomes.',
      'Integrate AI footage with traditional editing for final deliverables.',
      'Stay ahead of new AI video tools and generation techniques.',
    ],
    requirements: [
      '1+ year working professionally with AI video generation tools.',
      'Strong portfolio of AI-generated video content.',
      'Deep understanding of prompt engineering for video generation.',
      'Ability to iterate quickly and manage large volumes of generations.',
    ],
    niceToHave: [
      'Experience combining AI footage with VFX compositing.',
      'Background in traditional video editing or cinematography.',
    ],
  },
  {
    _id: 'mock-job-004', _type: 'role',
    title: 'Senior Video Editor',
    slug: { _type: 'slug', current: 'senior-video-editor' },
    department: 'Video Production', type: 'Full-time', mode: 'Remote',
    location: 'Pakistan (Remote)', experience: '4+ years',
    status: 'active', order: 4, isUrgent: false,
    shortDesc: 'Lead video editing across formats with a focus on quality and consistency.',
    description: 'You set the standard for video quality across the team. You edit premium content, review junior work, and maintain the production values that keep our clients at the top of their niches. You are technically excellent and creatively sharp.',
    responsibilities: [
      'Edit premium long-form and short-form content for top-tier clients.',
      'Review and provide feedback on edits from junior team members.',
      'Build and maintain editing templates, style guides, and SOPs.',
      'Collaborate with producers and client leads on creative direction.',
    ],
    requirements: [
      '4+ years of professional video editing experience.',
      'Expert in Premiere Pro and After Effects.',
      'Strong portfolio spanning multiple formats and niches.',
      'Experience leading or mentoring other editors.',
    ],
    niceToHave: [
      'DaVinci Resolve colour grading experience.',
      'Background in documentary or branded content.',
    ],
  },
  {
    _id: 'mock-job-005', _type: 'role',
    title: 'Content Writer',
    slug: { _type: 'slug', current: 'content-writer' },
    department: 'Content', type: 'Full-time', mode: 'Remote',
    location: 'Pakistan (Remote)', experience: '2+ years',
    status: 'active', order: 5, isUrgent: false,
    shortDesc: 'Write high-performing content across formats for top creator brands.',
    description: 'You write content that performs. Blog posts, article scripts, email sequences, social captions — you understand voice, platform, and what makes people engage. You work fast without sacrificing quality and adapt your style to match the creator or brand you are writing for.',
    responsibilities: [
      'Write long-form blog posts, articles, and SEO content for clients.',
      'Draft scripts, outlines, and treatments for video content.',
      'Create email newsletters, social captions, and platform-specific copy.',
      'Adapt to different brand voices and content styles.',
    ],
    requirements: [
      '2+ years writing content professionally for creators or brands.',
      'Portfolio showing range across formats and industries.',
      'Strong command of English grammar, tone, and style.',
      'Ability to write fast and accurately under deadline pressure.',
    ],
    niceToHave: [
      'Experience writing for YouTube, LinkedIn, or newsletter audiences.',
      'SEO writing experience.',
    ],
  },
  {
    _id: 'mock-job-006', _type: 'role',
    title: 'Scriptwriter',
    slug: { _type: 'slug', current: 'scriptwriter' },
    department: 'Content', type: 'Full-time', mode: 'Remote',
    location: 'Pakistan (Remote)', experience: '2+ years',
    status: 'active', order: 6, isUrgent: false,
    shortDesc: 'Write engaging scripts for YouTube, ads, and brand video content.',
    description: 'You write scripts that make people watch. Whether it is a YouTube deep-dive, a short-form ad hook, or a brand story piece, you know how to structure a script for retention, emotion, and conversion. You write to be spoken and you understand how pacing translates on screen.',
    responsibilities: [
      'Write video scripts for YouTube, TikTok, and paid social campaigns.',
      'Develop hooks, intros, and CTAs that drive action and retention.',
      'Research topics deeply and translate complex ideas into clear narratives.',
      'Collaborate with editors and producers during the production process.',
    ],
    requirements: [
      '2+ years writing scripts for video content professionally.',
      'Samples of scripts that have performed well on YouTube or paid social.',
      'Strong research skills and ability to simplify complex subjects.',
      'Understanding of video structure, pacing, and platform-specific formats.',
    ],
    niceToHave: [
      'Experience writing VSLs or direct-response video scripts.',
      'Background in journalism, copywriting, or filmmaking.',
    ],
  },
  {
    _id: 'mock-job-007', _type: 'role',
    title: 'Thumbnail Designer',
    slug: { _type: 'slug', current: 'thumbnail-designer' },
    department: 'Design', type: 'Full-time', mode: 'Remote',
    location: 'Pakistan (Remote)', experience: '2+ years',
    status: 'active', order: 7, isUrgent: true, urgentLabel: 'Hiring urgently',
    shortDesc: 'Design high-CTR YouTube thumbnails for top creators.',
    description: 'You design thumbnails that drive clicks. You understand why certain thumbnails work — the contrast, the expression, the visual hierarchy, the text. You create at speed without losing quality and you stay obsessed with what is performing in your clients niches.',
    responsibilities: [
      'Design YouTube thumbnails optimised for high CTR.',
      'Create multiple concept variations per video for A/B testing.',
      'Stay current with thumbnail trends across different niches.',
      'Collaborate with editors and producers to align thumbnails with video content.',
    ],
    requirements: [
      '2+ years designing thumbnails for YouTube channels professionally.',
      'Portfolio showing thumbnails for channels with strong view counts.',
      'Expert-level Photoshop.',
      'Strong understanding of colour, composition, facial expression, and text hierarchy.',
    ],
    niceToHave: [
      'Experience designing for channels with 500k+ subscribers.',
      'Motion graphics or animation skills.',
    ],
  },
  {
    _id: 'mock-job-008', _type: 'role',
    title: 'Graphics Designer',
    slug: { _type: 'slug', current: 'graphics-designer' },
    department: 'Design', type: 'Full-time', mode: 'Remote',
    location: 'Pakistan (Remote)', experience: '2+ years',
    status: 'active', order: 8, isUrgent: false,
    shortDesc: 'Design graphics, visuals, and brand assets for creator and brand clients.',
    description: 'You design graphics that elevate how brands and creators look. From lower thirds and video overlays to social post templates and brand kits, you produce clean, professional visuals that work across formats and platforms. You are fast, versatile, and quality-obsessed.',
    responsibilities: [
      'Design in-video graphics, lower thirds, transitions, and overlays.',
      'Create social media templates, post graphics, and brand assets.',
      'Develop consistent visual identities for creator and brand clients.',
      'Support video editors with graphical elements during post-production.',
    ],
    requirements: [
      '2+ years graphic design experience in a professional setting.',
      'Expert in Adobe Illustrator, Photoshop, and After Effects.',
      'Strong portfolio of digital and brand design work.',
      'Ability to adapt to different visual styles and brand guidelines.',
    ],
    niceToHave: [
      'Experience with motion graphics or animated brand elements.',
      'Figma or Canva skills.',
    ],
  },
  {
    _id: 'mock-job-009', _type: 'role',
    title: 'Business Development Representative',
    slug: { _type: 'slug', current: 'business-development-representative' },
    department: 'Business Development', type: 'Full-time', mode: 'Remote',
    location: 'Pakistan (Remote)', experience: '1+ year',
    status: 'active', order: 9, isUrgent: false,
    shortDesc: 'Prospect, outreach, and qualify leads for the Zealancy client pipeline.',
    description: 'You build the top of the sales funnel. You research prospects, craft personalised outreach, and get meetings booked with brands and creators who would benefit from Zealancy services. You are persistent, organised, and understand what makes a compelling pitch.',
    responsibilities: [
      'Research and identify qualified prospect accounts across target markets.',
      'Execute outbound outreach across email, LinkedIn, and direct message channels.',
      'Qualify inbound leads and route them appropriately within the sales process.',
      'Book and prepare discovery calls for account executives.',
      'Track activity, pipeline, and outreach metrics in CRM.',
    ],
    requirements: [
      '1+ year in sales, business development, or outbound prospecting.',
      'Strong written communication for cold outreach and follow-ups.',
      'Organised and data-driven approach to managing a prospect pipeline.',
      'Resilient and self-motivated working in a remote environment.',
    ],
    niceToHave: [
      'Experience selling creative or marketing services.',
      'Familiarity with outreach tools.',
    ],
  },
  {
    _id: 'mock-job-010', _type: 'role',
    title: 'Proposal Writer',
    slug: { _type: 'slug', current: 'proposal-writer' },
    department: 'Business Development', type: 'Full-time', mode: 'Remote',
    location: 'Pakistan (Remote)', experience: '2+ years',
    status: 'active', order: 10, isUrgent: false,
    shortDesc: 'Write compelling proposals and pitch decks that win creative accounts.',
    description: 'You write proposals that close deals. You take briefing notes and sales context and turn them into polished, persuasive proposals and decks that communicate our value clearly. You understand audience, positioning, and what makes a commercial argument land.',
    responsibilities: [
      'Write tailored proposals and pitch decks for prospective clients.',
      'Develop proposal templates, pricing frameworks, and case study narratives.',
      'Collaborate with business development and account teams to gather context.',
      'Edit and refine proposals based on client feedback and sales outcomes.',
    ],
    requirements: [
      '2+ years writing commercial proposals or pitches in an agency or B2B context.',
      'Strong portfolio of proposal or bid writing work.',
      'Excellent written English and command of persuasive structure.',
      'Ability to translate complex service offerings into clear client-facing language.',
    ],
    niceToHave: [
      'Background in creative, media, or marketing agency sales.',
      'Design skills for proposal decks in Google Slides or Figma.',
    ],
  },
  {
    _id: 'mock-job-011', _type: 'role',
    title: 'Business Development Manager',
    slug: { _type: 'slug', current: 'business-development-manager' },
    department: 'Business Development', type: 'Full-time', mode: 'Remote',
    location: 'Pakistan (Remote)', experience: '3+ years',
    status: 'active', order: 11, isUrgent: false,
    shortDesc: 'Own and grow the Zealancy client acquisition pipeline end-to-end.',
    description: 'You own revenue growth. You build partnerships, close new accounts, and develop a pipeline that feeds the agency long-term. You are senior enough to run a full sales cycle independently and commercially sharp enough to know which deals to chase.',
    responsibilities: [
      'Own the full business development cycle from prospecting to close.',
      'Build and manage a pipeline of creator and brand clients.',
      'Lead commercial negotiations and contract discussions.',
      'Develop partnerships with platforms, networks, and complementary agencies.',
      'Report on pipeline, revenue, and growth metrics to leadership.',
    ],
    requirements: [
      '3+ years in business development or sales at an agency or media company.',
      'Proven track record of closing new business in a services environment.',
      'Strong network in the creator economy, media, or marketing industry.',
      'Excellent negotiation, communication, and relationship-building skills.',
    ],
    niceToHave: [
      'Existing relationships with creator brands or marketing agencies.',
      'Experience scaling a B2B services sales function.',
    ],
  },
  {
    _id: 'mock-job-012', _type: 'role',
    title: 'Project Manager',
    slug: { _type: 'slug', current: 'project-manager' },
    department: 'Operations', type: 'Full-time', mode: 'Remote',
    location: 'Pakistan (Remote)', experience: '2+ years',
    status: 'active', order: 12, isUrgent: false,
    shortDesc: 'Manage creative project delivery across multiple client accounts.',
    description: 'You make sure things ship on time and at quality. You manage creative projects across multiple client accounts, coordinate between editors, designers, and writers, and keep every deliverable on track without the team feeling micromanaged.',
    responsibilities: [
      'Manage end-to-end delivery of video, design, and content projects.',
      'Track timelines, deliverables, and team capacity across client accounts.',
      'Communicate proactively with clients on project status and feedback loops.',
      'Identify and resolve production bottlenecks before they become problems.',
    ],
    requirements: [
      '2+ years managing creative or content production projects.',
      'Experience with project management tools (Asana, ClickUp, Notion, etc.).',
      'Strong organisational skills and ability to track multiple workstreams simultaneously.',
      'Calm, clear communicator who keeps clients and teams informed.',
    ],
    niceToHave: [
      'Background in video production or creative agency project management.',
      'PMP, CAPM, or equivalent certification.',
    ],
  },
  {
    _id: 'mock-job-013', _type: 'role',
    title: 'Account Manager',
    slug: { _type: 'slug', current: 'account-manager' },
    department: 'Operations', type: 'Full-time', mode: 'Remote',
    location: 'Pakistan (Remote)', experience: '2+ years',
    status: 'active', order: 13, isUrgent: false,
    shortDesc: 'Own client relationships and ensure satisfaction across all Zealancy accounts.',
    description: 'You are the face of Zealancy to our clients. You manage relationships, ensure deliverables are aligned with expectations, and proactively solve problems before they become complaints. You are the reason clients stay and grow their accounts with us.',
    responsibilities: [
      'Own day-to-day client communication and relationship management.',
      'Oversee delivery quality and ensure projects align with client expectations.',
      'Handle client feedback, revisions, and escalations professionally.',
      'Identify upsell opportunities and present expansion proposals to existing clients.',
    ],
    requirements: [
      '2+ years in account management at an agency, SaaS, or services company.',
      'Strong written and verbal communication skills.',
      'Ability to manage multiple client relationships simultaneously without dropping the ball.',
      'Commercially aware and able to spot revenue growth opportunities within accounts.',
    ],
    niceToHave: [
      'Experience managing creator or media production accounts.',
      'CRM tool experience.',
    ],
  },
  {
    _id: 'mock-job-014', _type: 'role',
    title: 'Creative Recruiter',
    slug: { _type: 'slug', current: 'creative-recruiter' },
    department: 'People & Culture', type: 'Full-time', mode: 'Remote',
    location: 'Pakistan (Remote)', experience: '1+ year',
    status: 'active', order: 14, isUrgent: false,
    shortDesc: 'Source and hire top creative talent across all Zealancy production roles.',
    description: 'You find the people who make Zealancy excellent. You source, assess, and hire across video production, design, and content roles. You know how to evaluate creative work, move fast without cutting corners, and create a candidate experience that reflects our culture.',
    responsibilities: [
      'Source candidates across job boards, LinkedIn, and creative communities.',
      'Review portfolios and assess creative quality for production roles.',
      'Run structured screening and interview processes for all open positions.',
      'Coordinate with team leads to refine hiring criteria and interview processes.',
    ],
    requirements: [
      '1+ year recruiting creative or technical talent.',
      'Ability to evaluate design, video, or writing work for quality.',
      'Strong sourcing skills across LinkedIn, communities, and platforms.',
      'Organised and responsive with candidates throughout the process.',
    ],
    niceToHave: [
      'Background in creative production or design.',
      'Experience recruiting for a fast-growing agency or startup.',
    ],
  },
  {
    _id: 'mock-job-015', _type: 'role',
    title: 'HR – People Operations',
    slug: { _type: 'slug', current: 'hr-people-operations' },
    department: 'People & Culture', type: 'Full-time', mode: 'Remote',
    location: 'Pakistan (Remote)', experience: '2+ years',
    status: 'active', order: 15, isUrgent: false,
    shortDesc: 'Build the people systems and culture that keep Zealancy running.',
    description: 'You build the systems and culture that make Zealancy a place people want to stay. You handle onboarding, HR processes, team engagement, and the day-to-day people operations that keep the team running smoothly and feeling supported.',
    responsibilities: [
      'Manage employee onboarding, offboarding, and HR documentation.',
      'Develop and maintain HR policies, handbooks, and compliance procedures.',
      'Support team engagement initiatives and culture-building efforts.',
      'Handle leave management, payroll coordination, and HR queries.',
      'Work with leadership on performance review cycles and team development.',
    ],
    requirements: [
      '2+ years in HR, people operations, or a generalist HR role.',
      'Solid understanding of HR policies, employment practices, and compliance.',
      'Strong interpersonal skills and a people-first mindset.',
      'Organised and discreet when handling confidential team information.',
    ],
    niceToHave: [
      'Experience in a remote-first company.',
      'HR certification (SHRM, CIPD, or equivalent).',
    ],
  },
  {
    _id: 'mock-job-016', _type: 'role',
    title: 'Full Stack Developer',
    slug: { _type: 'slug', current: 'full-stack-developer' },
    department: 'Technology', type: 'Full-time', mode: 'Remote',
    location: 'Pakistan (Remote)', experience: '3+ years',
    status: 'active', order: 16, isUrgent: false,
    shortDesc: 'Build internal tools and platforms that power Zealancy operations.',
    description: "You build and maintain the internal tools and platforms that power Zealancy's operations. From client-facing dashboards to internal workflow systems, you write clean, reliable code and ship features that actually solve real problems for the team.",
    responsibilities: [
      'Build and maintain internal tools, dashboards, and operational platforms.',
      'Develop and improve client-facing web applications.',
      'Collaborate with operations and product teams to scope and ship features.',
      'Maintain code quality, testing coverage, and deployment pipelines.',
    ],
    requirements: [
      '3+ years building full-stack web applications in production.',
      'Proficiency in React/Next.js (frontend) and Node.js or Python (backend).',
      'Experience with databases (PostgreSQL, MySQL, or MongoDB).',
      'Comfortable with REST APIs, authentication, and cloud deployments.',
    ],
    niceToHave: [
      'Experience with Vercel, AWS, or GCP.',
      'Familiarity with AI/LLM integrations.',
    ],
  },
  {
    _id: 'mock-job-017', _type: 'role',
    title: 'Admin',
    slug: { _type: 'slug', current: 'admin' },
    department: 'Operations', type: 'Full-time', mode: 'Remote',
    location: 'Pakistan (Remote)', experience: '1+ year',
    status: 'active', order: 17, isUrgent: false,
    shortDesc: 'Keep the back end of Zealancy running with reliable administrative support.',
    description: "You keep the back end of Zealancy running. Administrative tasks, scheduling, documentation, vendor coordination, and day-to-day operational support — you're the reliable foundation that lets everyone else do their best work.",
    responsibilities: [
      'Manage scheduling, calendar coordination, and meeting logistics.',
      'Handle documentation, filing, and administrative records.',
      'Coordinate with vendors, suppliers, and external partners.',
      'Support leadership and operations team with day-to-day administrative needs.',
      'Assist with expense tracking, invoicing, and basic financial administration.',
    ],
    requirements: [
      '1+ year in an administrative or operations support role.',
      'Highly organised with strong attention to detail.',
      'Proficiency in Google Workspace (Docs, Sheets, Calendar, Drive).',
      'Clear and professional written communication.',
    ],
    niceToHave: [
      'Experience in a remote or distributed team environment.',
      'Familiarity with project management tools.',
    ],
  },
  {
    _id: 'mock-job-018', _type: 'role',
    title: 'Operations Manager',
    slug: { _type: 'slug', current: 'operations-manager' },
    department: 'Operations', type: 'Full-time', mode: 'Remote',
    location: 'Pakistan (Remote)', experience: '3+ years',
    status: 'active', order: 18, isUrgent: false,
    shortDesc: 'Build the operating system for a fast-moving creative agency.',
    description: "You build the operating system for a fast-moving creative agency. You identify inefficiencies, implement systems, and make sure every part of the business runs with clarity and consistency. You're a strong operator who can translate vision into process.",
    responsibilities: [
      'Design, implement, and refine operational systems across the agency.',
      'Oversee project delivery, resource allocation, and team capacity planning.',
      'Build SOPs and process documentation for core business functions.',
      'Identify bottlenecks and drive continuous operational improvements.',
      'Report to leadership on operational health, costs, and efficiency metrics.',
    ],
    requirements: [
      '3+ years in operations management, ideally at a creative or media company.',
      'Proven ability to build and implement processes in a fast-growing organisation.',
      'Strong analytical skills and data-driven decision-making.',
      'Excellent leadership and cross-functional communication skills.',
    ],
    niceToHave: [
      'MBA or equivalent business qualification.',
      'Experience scaling operations in a remote-first company.',
    ],
  },
  {
    _id: 'mock-job-019', _type: 'role',
    title: 'IT System Administrator',
    slug: { _type: 'slug', current: 'it-system-administrator' },
    department: 'Technology', type: 'Full-time', mode: 'Remote',
    location: 'Pakistan (Remote)', experience: '2+ years',
    status: 'active', order: 19, isUrgent: false,
    shortDesc: "Keep Zealancy's technology infrastructure secure and running smoothly.",
    description: "You keep Zealancy's technology infrastructure secure and running. From device management and software provisioning to network security and IT support, you're the person the team relies on when something breaks — and more importantly, you're the reason things rarely break.",
    responsibilities: [
      'Manage IT infrastructure, hardware, and software across a remote team.',
      'Administer SaaS tools, user accounts, and access controls.',
      'Implement and maintain IT security policies and practices.',
      'Provide IT support and troubleshooting for team members.',
      'Maintain documentation for systems, processes, and IT assets.',
    ],
    requirements: [
      '2+ years as an IT administrator, system administrator, or IT support specialist.',
      'Experience managing Google Workspace, Microsoft 365, or similar platforms.',
      'Solid understanding of network fundamentals, VPNs, and endpoint security.',
      'Strong troubleshooting skills across Windows, macOS, and Linux environments.',
    ],
    niceToHave: [
      'IT certifications (CompTIA, Google IT Support, or equivalent).',
      'Experience supporting remote-first teams.',
    ],
  },
];

async function seed() {
  console.log(`\nSeeding ${jobs.length} jobs to Sanity (project: 07a4uqvi, dataset: production)...\n`);

  const transaction = client.transaction();
  for (const job of jobs) {
    transaction.createOrReplace(job);
  }

  try {
    const result = await transaction.commit();
    console.log(`\nSeed complete! ${result.results.length} documents created/updated.`);
    console.log('\nAll jobs are now editable at: https://sanity.io/manage -> Studio\n');
  } catch (err) {
    console.error('\nSeed failed:', err.message);
    if (err.message?.includes('401') || err.message?.includes('Unauthorized')) {
      console.error('Check that SANITY_API_TOKEN in .env.local has write permissions.\n');
    }
    process.exit(1);
  }
}

seed();

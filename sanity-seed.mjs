#!/usr/bin/env node
/**
 * Sanity Seed Script — Uploads all 19 Team Zealancy hardcoded roles to Sanity Studio
 * 
 * Usage:
 *   node sanity-seed.mjs <optional_token>
 *
 * Requirements:
 *   - SANITY_API_TOKEN in .env.local or passed as first CLI argument
 *   - @sanity/client (already installed)
 *
 * Safety: Uses createIfNotExists (or createOrReplace with --replace) so re-running is 100% idempotent.
 */

import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '07a4uqvi';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-01';

const token = process.argv[2]?.startsWith('sk')
  ? process.argv[2]
  : process.env.SANITY_API_TOKEN;

const useReplace = process.argv.includes('--replace') || process.argv.includes('--force');

if (!token || token.trim() === '') {
  console.error('\n❌ ERROR: SANITY_API_TOKEN is not set in .env.local or passed as an argument!\n');
  console.error('Sanity Content Lake requires an API Write Token to create documents.');
  console.error('\nHow to run:');
  console.error('  1. Generate token at: https://sanity.io/manage/project/' + projectId + '/api#tokens');
  console.error('     (Click "Add API token" -> Name: "Seeder" -> Permissions: "Editor" or "Administrator")');
  console.error('  2. Run:');
  console.error('     node sanity-seed.mjs <YOUR_SANITY_API_TOKEN>');
  console.error('     - OR -');
  console.error('     Add SANITY_API_TOKEN=<YOUR_TOKEN> into .env.local and run:');
  console.error('     node sanity-seed.mjs\n');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: token.trim(),
});

const jobs = [
  {
    "_id": "role-long-form-video-editor",
    "_type": "role",
    "title": "Long-Form Video Editor",
    "slug": {
      "_type": "slug",
      "current": "long-form-video-editor"
    },
    "status": "open",
    "department": "Video Production",
    "type": "Full-time",
    "employmentType": "Full-time",
    "mode": "Remote",
    "location": "Pakistan (Remote)",
    "experience": "2+ years",
    "order": 1,
    "isUrgent": true,
    "urgentHiring": true,
    "urgentLabel": "Hiring urgently",
    "shortDesc": "",
    "shortDescription": "",
    "description": "You'll edit long-form YouTube videos start-to-finish for creators pulling hundreds of millions of views. We hand you raw footage and a brief \u2014 you return something that grips viewers until the final frame. Pacing, story structure, sound design, graphics, and hooks are all yours to own.",
    "responsibilities": [
      "Edit high-retention YouTube videos (15\u201360 min) for top-tier creators.",
      "Craft compelling hooks, narrative pacing, and sound design from raw footage.",
      "Incorporate motion typography, lower thirds, and visual effects where needed.",
      "Collaborate with lead directors and strategy team to optimise view duration.",
      "Deliver polished, broadcast-quality timelines on time every time."
    ],
    "requirements": [
      "2+ years editing long-form YouTube or documentary content.",
      "Mastery of Premiere Pro or DaVinci Resolve; After Effects proficiency.",
      "Deep understanding of viewer retention and story structure.",
      "Portfolio demonstrating exceptional pacing, sound, and visual hierarchy."
    ],
    "niceToHave": [
      "Experience with channels above 500K subscribers.",
      "Color grading and advanced audio mixing skills."
    ]
  },
  {
    "_id": "role-short-form-video-editor-ugc-ads",
    "_type": "role",
    "title": "Short-Form Video Editor (UGC Ads)",
    "slug": {
      "_type": "slug",
      "current": "short-form-video-editor-ugc-ads"
    },
    "status": "open",
    "department": "Video Production",
    "type": "Full-time",
    "employmentType": "Full-time",
    "mode": "Remote",
    "location": "Pakistan (Remote)",
    "experience": "1+ year",
    "order": 2,
    "isUrgent": false,
    "urgentHiring": false,
    "shortDesc": "",
    "shortDescription": "",
    "description": "You specialise in short-form content that converts \u2014 UGC-style ads, Reels, TikToks, and YouTube Shorts built to stop the scroll and drive action. You understand hooks, pacing for short attention spans, and what makes a creative perform in paid media.",
    "responsibilities": [
      "Edit UGC-style short-form ads (15\u201390 sec) for paid social campaigns.",
      "Produce Reels, TikToks, and YouTube Shorts from raw footage or client-supplied clips.",
      "Build and iterate on hook variations for A/B testing.",
      "Stay current on short-form trends and viral content formats.",
      "Deliver multiple creative variations per brief, fast."
    ],
    "requirements": [
      "1+ year editing short-form content for paid social or organic growth.",
      "Proficiency in CapCut, Premiere Pro, or DaVinci Resolve.",
      "Strong sense of hook, pacing, and text-on-screen techniques.",
      "Understanding of what makes ads perform on Meta, TikTok, and YouTube."
    ],
    "niceToHave": [
      "Experience with paid ad creative for e-commerce or DTC brands.",
      "Basic motion graphics skills."
    ]
  },
  {
    "_id": "role-higgsfield-expert-ai-generations",
    "_type": "role",
    "title": "Higgsfield Expert (AI Generations)",
    "slug": {
      "_type": "slug",
      "current": "higgsfield-expert-ai-generations"
    },
    "status": "open",
    "department": "Video Production",
    "type": "Full-time",
    "employmentType": "Full-time",
    "mode": "Remote",
    "location": "Pakistan (Remote)",
    "experience": "1+ year",
    "order": 3,
    "isUrgent": false,
    "urgentHiring": false,
    "shortDesc": "",
    "shortDescription": "",
    "description": "You're at the frontier of AI-generated video. You'll use Higgsfield and other AI video generation tools to create cinematic sequences, B-roll, and visual effects that would otherwise require full production crews. You understand prompt engineering, model limitations, and how to integrate AI footage seamlessly into final edits.",
    "responsibilities": [
      "Generate high-quality AI video content using Higgsfield and similar tools.",
      "Write precise prompts that produce consistent, on-brand visual output.",
      "Integrate AI-generated footage with real footage in post-production.",
      "Experiment with emerging AI video models and identify best-fit applications.",
      "Collaborate with video editors to enhance productions with AI-generated sequences."
    ],
    "requirements": [
      "1+ year hands-on experience with Higgsfield or comparable AI video tools.",
      "Strong understanding of prompt engineering for video generation.",
      "Ability to evaluate and quality-control AI output for professional use.",
      "Basic post-production skills for compositing AI footage."
    ],
    "niceToHave": [
      "Experience with other AI tools (Runway, Kling, Pika, Sora).",
      "Background in VFX or motion design."
    ]
  },
  {
    "_id": "role-senior-video-editor",
    "_type": "role",
    "title": "Senior Video Editor",
    "slug": {
      "_type": "slug",
      "current": "senior-video-editor"
    },
    "status": "open",
    "department": "Video Production",
    "type": "Full-time",
    "employmentType": "Full-time",
    "mode": "Remote",
    "location": "Pakistan (Remote)",
    "experience": "4+ years",
    "order": 4,
    "isUrgent": false,
    "urgentHiring": false,
    "shortDesc": "",
    "shortDescription": "",
    "description": "You've edited for big channels. You don't need direction on what good looks like \u2014 you set the standard and raise everyone around you. You'll lead complex productions, mentor junior editors, and own the creative output for our highest-profile clients.",
    "responsibilities": [
      "Lead end-to-end editing on flagship YouTube productions.",
      "Set quality benchmarks and review work from junior and mid-level editors.",
      "Mentor team members through direct feedback on their timelines.",
      "Collaborate with Creative Director to maintain visual and narrative excellence.",
      "Manage multiple productions simultaneously without drops in quality."
    ],
    "requirements": [
      "4+ years editing long-form YouTube content for large channels.",
      "Expert-level Premiere Pro and After Effects.",
      "Proven track record of videos that retain viewers and grow channels.",
      "Strong communication skills for client and team feedback loops."
    ],
    "niceToHave": [
      "Experience growing or managing a creative team.",
      "DaVinci Resolve color grading."
    ]
  },
  {
    "_id": "role-content-writer",
    "_type": "role",
    "title": "Content Writer",
    "slug": {
      "_type": "slug",
      "current": "content-writer"
    },
    "status": "open",
    "department": "Content",
    "type": "Full-time",
    "employmentType": "Full-time",
    "mode": "Remote",
    "location": "Pakistan (Remote)",
    "experience": "1\u20132 years",
    "order": 5,
    "isUrgent": false,
    "urgentHiring": false,
    "shortDesc": "",
    "shortDescription": "",
    "description": "You write content people actually read. Articles, video descriptions, social captions, and platform copy that's clear, concise, and on-brand. You understand how online audiences consume content and you write accordingly \u2014 no fluff, no filler.",
    "responsibilities": [
      "Write SEO-optimised articles, blog posts, and long-form web copy.",
      "Draft video descriptions, titles, and metadata for YouTube channels.",
      "Create social media captions and platform-specific content.",
      "Research topics thoroughly and translate complex ideas into clear writing.",
      "Maintain brand voice consistency across all written output."
    ],
    "requirements": [
      "1\u20132 years writing digital content professionally.",
      "Strong command of English grammar, tone, and style.",
      "Understanding of SEO fundamentals and keyword strategy.",
      "Ability to write in multiple brand voices with different audiences."
    ],
    "niceToHave": [
      "Experience writing for YouTube channels or content creators.",
      "Familiarity with tools like Surfer SEO or Ahrefs."
    ]
  },
  {
    "_id": "role-scriptwriter",
    "_type": "role",
    "title": "Scriptwriter",
    "slug": {
      "_type": "slug",
      "current": "scriptwriter"
    },
    "status": "open",
    "department": "Content",
    "type": "Full-time",
    "employmentType": "Full-time",
    "mode": "Remote",
    "location": "Pakistan (Remote)",
    "experience": "1+ year",
    "order": 6,
    "isUrgent": false,
    "urgentHiring": false,
    "shortDesc": "",
    "shortDescription": "",
    "description": "You write scripts that perform. Not just sound good on paper \u2014 scripts that hold viewers, drive watch time, and come to life in edit. You understand narrative structure, YouTube pacing, and how to write for the spoken word. Your scripts have a clear hook, a reason to stay, and a payoff.",
    "responsibilities": [
      "Write long-form YouTube scripts (10\u201360 min) for high-profile creators.",
      "Develop hooks, story structures, and narrative arcs that maximise retention.",
      "Research topics in depth and transform information into compelling stories.",
      "Iterate on scripts based on creator and director feedback.",
      "Collaborate with editors to ensure script translates effectively to final video."
    ],
    "requirements": [
      "1+ year writing scripts for YouTube, podcasts, or video productions.",
      "Strong understanding of YouTube audience retention and pacing.",
      "Ability to adapt tone and style to different creators and niches.",
      "Research skills and ability to simplify complex topics."
    ],
    "niceToHave": [
      "Experience writing for channels with 100K+ subscribers.",
      "Background in journalism, storytelling, or screenwriting."
    ]
  },
  {
    "_id": "role-thumbnail-designer",
    "_type": "role",
    "title": "Thumbnail Designer",
    "slug": {
      "_type": "slug",
      "current": "thumbnail-designer"
    },
    "status": "open",
    "department": "Design",
    "type": "Full-time",
    "employmentType": "Full-time",
    "mode": "Remote",
    "location": "Pakistan (Remote)",
    "experience": "1+ year",
    "order": 7,
    "isUrgent": true,
    "urgentHiring": true,
    "urgentLabel": "Hiring urgently",
    "shortDesc": "",
    "shortDescription": "",
    "description": "Thumbnails are the most important frame in a YouTube video. You design thumbnails that earn the click \u2014 every time. You understand what drives CTR, how to compose for a small screen, and how to create emotional impact in a single image. Your portfolio makes us stop scrolling.",
    "responsibilities": [
      "Design high-CTR YouTube thumbnails for tier-1 creators.",
      "Develop multiple thumbnail concepts and variations per video.",
      "A/B test designs and iterate based on performance data.",
      "Work with editors and strategists to align thumbnails with video content.",
      "Maintain visual consistency across a channel while evolving designs over time."
    ],
    "requirements": [
      "1+ year designing YouTube thumbnails professionally.",
      "Expert-level Photoshop and strong Illustrator skills.",
      "Deep understanding of visual hierarchy, contrast, and colour for small screens.",
      "Portfolio demonstrating measurable CTR-focused design."
    ],
    "niceToHave": [
      "Experience with channels above 500K subscribers.",
      "3D or compositing experience (Blender, Cinema4D)."
    ]
  },
  {
    "_id": "role-graphics-designer",
    "_type": "role",
    "title": "Graphics Designer",
    "slug": {
      "_type": "slug",
      "current": "graphics-designer"
    },
    "status": "open",
    "department": "Design",
    "type": "Full-time",
    "employmentType": "Full-time",
    "mode": "Remote",
    "location": "Pakistan (Remote)",
    "experience": "1\u20132 years",
    "order": 8,
    "isUrgent": false,
    "urgentHiring": false,
    "shortDesc": "",
    "shortDescription": "",
    "description": "You design across the board \u2014 brand assets, social graphics, ad creative, and visual identity systems. You take a brief and deliver finished work that holds together and performs. Your design sense is sharp, your output is consistent, and you move fast without losing quality.",
    "responsibilities": [
      "Create visual identity assets, social media graphics, and marketing collateral.",
      "Design high-converting ad creative for paid social campaigns.",
      "Produce in-video graphics, lower thirds, and motion-ready assets.",
      "Work across multiple client brands maintaining distinct visual voices.",
      "Deliver assets export-ready for various platforms and formats."
    ],
    "requirements": [
      "1\u20132 years of professional graphic design experience.",
      "Expertise in Photoshop, Illustrator, and Figma.",
      "Strong typography, colour theory, and visual hierarchy skills.",
      "Portfolio showing brand work, digital ads, or social design."
    ],
    "niceToHave": [
      "Basic motion design or After Effects skills.",
      "Experience designing for YouTube or content creators."
    ]
  },
  {
    "_id": "role-business-development-representative",
    "_type": "role",
    "title": "Business Development Representative",
    "slug": {
      "_type": "slug",
      "current": "business-development-representative"
    },
    "status": "open",
    "department": "Business Development",
    "type": "Full-time",
    "employmentType": "Full-time",
    "mode": "Remote",
    "location": "Pakistan (Remote)",
    "experience": "1+ year",
    "order": 9,
    "isUrgent": false,
    "urgentHiring": false,
    "shortDesc": "",
    "shortDescription": "",
    "description": "You open doors. You identify and qualify new opportunities, reach out to prospects, and get the right conversations started for our BD Manager to close. You're organised, persistent, and genuinely interested in the creators and brands we work with.",
    "responsibilities": [
      "Identify and research potential creator and brand clients across platforms.",
      "Conduct outbound outreach via email, DMs, and LinkedIn.",
      "Qualify inbound leads and book discovery calls for the BD Manager.",
      "Maintain accurate CRM records and pipeline tracking.",
      "Report on outreach metrics and pipeline health weekly."
    ],
    "requirements": [
      "1+ year in sales, business development, or client outreach.",
      "Excellent written and verbal communication skills.",
      "Comfortable with high-volume outreach and systematic follow-up.",
      "Familiarity with CRM tools (HubSpot, Notion, or similar)."
    ],
    "niceToHave": [
      "Experience in a creative agency or creator economy business.",
      "Understanding of YouTube and influencer marketing landscapes."
    ]
  },
  {
    "_id": "role-proposal-writer",
    "_type": "role",
    "title": "Proposal Writer",
    "slug": {
      "_type": "slug",
      "current": "proposal-writer"
    },
    "status": "open",
    "department": "Business Development",
    "type": "Full-time",
    "employmentType": "Full-time",
    "mode": "Remote",
    "location": "Pakistan (Remote)",
    "experience": "1+ year",
    "order": 10,
    "isUrgent": false,
    "urgentHiring": false,
    "shortDesc": "",
    "shortDescription": "",
    "description": "You write proposals that win. You take a brief from our BD team, understand the client's needs, and craft a clear, compelling, polished proposal that makes the decision easy. You combine strong writing with commercial thinking.",
    "responsibilities": [
      "Draft tailored proposals and pitch decks for new business opportunities.",
      "Translate BD briefs into clear, persuasive written pitches.",
      "Collaborate with account and creative teams to gather supporting information.",
      "Maintain a library of proposal templates, case studies, and capability decks.",
      "Iterate on proposals based on BD team and client feedback."
    ],
    "requirements": [
      "1+ year writing proposals, tenders, or business development documentation.",
      "Exceptional written English \u2014 clear, concise, and persuasive.",
      "Strong attention to detail and ability to meet tight turnaround times.",
      "Proficiency in Google Slides, Canva, or Figma for formatted documents."
    ],
    "niceToHave": [
      "Experience in a creative or marketing agency.",
      "Background in copywriting or brand strategy."
    ]
  },
  {
    "_id": "role-business-development-manager",
    "_type": "role",
    "title": "Business Development Manager",
    "slug": {
      "_type": "slug",
      "current": "business-development-manager"
    },
    "status": "open",
    "department": "Business Development",
    "type": "Full-time",
    "employmentType": "Full-time",
    "mode": "Remote",
    "location": "Pakistan (Remote)",
    "experience": "3+ years",
    "order": 11,
    "isUrgent": false,
    "urgentHiring": false,
    "shortDesc": "",
    "shortDescription": "",
    "description": "You drive revenue. You identify the right clients, build genuine relationships, and close contracts that are good for both sides. You understand the creator economy, know how agencies work, and bring a track record of growing accounts and winning new business.",
    "responsibilities": [
      "Own the full sales cycle from prospecting to contract close.",
      "Build and manage a pipeline of creator and brand clients.",
      "Lead discovery calls, present capabilities, and negotiate contracts.",
      "Work with account and delivery teams to ensure smooth client onboarding.",
      "Report directly to leadership on revenue targets and pipeline status."
    ],
    "requirements": [
      "3+ years in business development or sales, preferably in media or agencies.",
      "Track record of hitting revenue targets and closing complex deals.",
      "Strong network in creator economy, brand marketing, or digital media.",
      "Excellent negotiation and client relationship skills."
    ],
    "niceToHave": [
      "Existing relationships with YouTube creators or brand marketing teams.",
      "Experience building and leading a small BD team."
    ]
  },
  {
    "_id": "role-project-manager",
    "_type": "role",
    "title": "Project Manager",
    "slug": {
      "_type": "slug",
      "current": "project-manager"
    },
    "status": "open",
    "department": "Operations",
    "type": "Full-time",
    "employmentType": "Full-time",
    "mode": "Remote",
    "location": "Pakistan (Remote)",
    "experience": "2+ years",
    "order": 12,
    "isUrgent": false,
    "urgentHiring": false,
    "shortDesc": "",
    "shortDescription": "",
    "description": "You keep production running. You own timelines, manage deliverables, and make sure nothing falls through the cracks between creative teams and clients. You're calm under pressure, clear in communication, and relentless about follow-through.",
    "responsibilities": [
      "Manage production timelines across multiple active client projects.",
      "Coordinate daily between video editors, designers, writers, and account managers.",
      "Track deliverable status and proactively flag risks before they become problems.",
      "Run project kick-offs, status calls, and retrospectives.",
      "Maintain project documentation, SOPs, and delivery checklists."
    ],
    "requirements": [
      "2+ years in project management, ideally in a creative or media agency.",
      "Strong organisational skills and experience managing multiple parallel projects.",
      "Confident communicator comfortable with daily team and client coordination.",
      "Familiarity with project tools (Notion, ClickUp, Asana, or similar)."
    ],
    "niceToHave": [
      "PMP or equivalent project management certification.",
      "Experience in video production workflows."
    ]
  },
  {
    "_id": "role-account-manager",
    "_type": "role",
    "title": "Account Manager",
    "slug": {
      "_type": "slug",
      "current": "account-manager"
    },
    "status": "open",
    "department": "Operations",
    "type": "Full-time",
    "employmentType": "Full-time",
    "mode": "Remote",
    "location": "Pakistan (Remote)",
    "experience": "2+ years",
    "order": 13,
    "isUrgent": false,
    "urgentHiring": false,
    "shortDesc": "",
    "shortDescription": "",
    "description": "You own the client relationship. You're the person clients trust, rely on, and call first. You manage expectations, communicate clearly, and make sure our clients are happy, retained, and growing with us.",
    "responsibilities": [
      "Serve as primary point of contact for an assigned portfolio of clients.",
      "Manage client communications, feedback loops, and approval workflows.",
      "Monitor client satisfaction and proactively resolve issues.",
      "Coordinate with internal teams to deliver on client briefs and timelines.",
      "Identify upsell and expansion opportunities within existing accounts."
    ],
    "requirements": [
      "2+ years as an account manager or client success manager.",
      "Excellent written and verbal communication skills.",
      "Strong organisational skills for managing multiple accounts simultaneously.",
      "Experience handling client feedback professionally and constructively."
    ],
    "niceToHave": [
      "Experience in a creative agency or media production environment.",
      "Understanding of YouTube content and creator workflows."
    ]
  },
  {
    "_id": "role-creative-recruiter",
    "_type": "role",
    "title": "Creative Recruiter",
    "slug": {
      "_type": "slug",
      "current": "creative-recruiter"
    },
    "status": "open",
    "department": "People & Culture",
    "type": "Full-time",
    "employmentType": "Full-time",
    "mode": "Remote",
    "location": "Pakistan (Remote)",
    "experience": "1+ year",
    "order": 14,
    "isUrgent": false,
    "urgentHiring": false,
    "shortDesc": "",
    "shortDescription": "",
    "description": "You find the people who make Zealancy great. You identify creative talent before they're looking, evaluate portfolios and work samples with a trained eye, and move candidates through the process efficiently without losing the human touch.",
    "responsibilities": [
      "Source, screen, and pipeline creative talent (editors, designers, writers).",
      "Review portfolios and work samples for quality and fit.",
      "Manage full recruitment cycles from outreach to offer.",
      "Maintain a proactive talent pipeline for current and future creative roles.",
      "Coordinate with team leads to refine hiring criteria and interview processes."
    ],
    "requirements": [
      "1+ year recruiting creative or technical talent.",
      "Ability to evaluate design, video, or writing work for quality.",
      "Strong sourcing skills across LinkedIn, communities, and platforms.",
      "Organised and responsive with candidates throughout the process."
    ],
    "niceToHave": [
      "Background in creative production or design.",
      "Experience recruiting for a fast-growing agency or startup."
    ]
  },
  {
    "_id": "role-hr-people-operations",
    "_type": "role",
    "title": "HR \u2013 People Operations",
    "slug": {
      "_type": "slug",
      "current": "hr-people-operations"
    },
    "status": "open",
    "department": "People & Culture",
    "type": "Full-time",
    "employmentType": "Full-time",
    "mode": "Remote",
    "location": "Pakistan (Remote)",
    "experience": "2+ years",
    "order": 15,
    "isUrgent": false,
    "urgentHiring": false,
    "shortDesc": "",
    "shortDescription": "",
    "description": "You build the systems and culture that make Zealancy a place people want to stay. You handle onboarding, HR processes, team engagement, and the day-to-day people operations that keep the team running smoothly and feeling supported.",
    "responsibilities": [
      "Manage employee onboarding, offboarding, and HR documentation.",
      "Develop and maintain HR policies, handbooks, and compliance procedures.",
      "Support team engagement initiatives and culture-building efforts.",
      "Handle leave management, payroll coordination, and HR queries.",
      "Work with leadership on performance review cycles and team development."
    ],
    "requirements": [
      "2+ years in HR, people operations, or a generalist HR role.",
      "Solid understanding of HR policies, employment practices, and compliance.",
      "Strong interpersonal skills and a people-first mindset.",
      "Organised and discreet when handling confidential team information."
    ],
    "niceToHave": [
      "Experience in a remote-first company.",
      "HR certification (SHRM, CIPD, or equivalent)."
    ]
  },
  {
    "_id": "role-full-stack-developer",
    "_type": "role",
    "title": "Full Stack Developer",
    "slug": {
      "_type": "slug",
      "current": "full-stack-developer"
    },
    "status": "open",
    "department": "Technology",
    "type": "Full-time",
    "employmentType": "Full-time",
    "mode": "Remote",
    "location": "Pakistan (Remote)",
    "experience": "3+ years",
    "order": 16,
    "isUrgent": false,
    "urgentHiring": false,
    "shortDesc": "",
    "shortDescription": "",
    "description": "You build and maintain the internal tools and platforms that power Zealancy's operations. From client-facing dashboards to internal workflow systems, you write clean, reliable code and ship features that actually solve real problems for the team.",
    "responsibilities": [
      "Build and maintain internal tools, dashboards, and operational platforms.",
      "Develop and improve client-facing web applications.",
      "Collaborate with operations and product teams to scope and ship features.",
      "Maintain code quality, testing coverage, and deployment pipelines.",
      "Troubleshoot and resolve technical issues across the stack."
    ],
    "requirements": [
      "3+ years building full-stack web applications in production.",
      "Proficiency in React/Next.js (frontend) and Node.js or Python (backend).",
      "Experience with databases (PostgreSQL, MySQL, or MongoDB).",
      "Comfortable with REST APIs, authentication, and cloud deployments."
    ],
    "niceToHave": [
      "Experience with Vercel, AWS, or GCP.",
      "Familiarity with AI/LLM integrations."
    ]
  },
  {
    "_id": "role-admin",
    "_type": "role",
    "title": "Admin",
    "slug": {
      "_type": "slug",
      "current": "admin"
    },
    "status": "open",
    "department": "Operations",
    "type": "Full-time",
    "employmentType": "Full-time",
    "mode": "Remote",
    "location": "Pakistan (Remote)",
    "experience": "1+ year",
    "order": 17,
    "isUrgent": false,
    "urgentHiring": false,
    "shortDesc": "",
    "shortDescription": "",
    "description": "You keep the back end of Zealancy running. Administrative tasks, scheduling, documentation, vendor coordination, and day-to-day operational support \u2014 you're the reliable foundation that lets everyone else do their best work.",
    "responsibilities": [
      "Manage scheduling, calendar coordination, and meeting logistics.",
      "Handle documentation, filing, and administrative records.",
      "Coordinate with vendors, suppliers, and external partners.",
      "Support leadership and operations team with day-to-day administrative needs.",
      "Assist with expense tracking, invoicing, and basic financial administration."
    ],
    "requirements": [
      "1+ year in an administrative or operations support role.",
      "Highly organised with strong attention to detail.",
      "Proficiency in Google Workspace (Docs, Sheets, Calendar, Drive).",
      "Clear and professional written communication."
    ],
    "niceToHave": [
      "Experience in a remote or distributed team environment.",
      "Familiarity with project management tools."
    ]
  },
  {
    "_id": "role-operations-manager",
    "_type": "role",
    "title": "Operations Manager",
    "slug": {
      "_type": "slug",
      "current": "operations-manager"
    },
    "status": "open",
    "department": "Operations",
    "type": "Full-time",
    "employmentType": "Full-time",
    "mode": "Remote",
    "location": "Pakistan (Remote)",
    "experience": "3+ years",
    "order": 18,
    "isUrgent": false,
    "urgentHiring": false,
    "shortDesc": "",
    "shortDescription": "",
    "description": "You build the operating system for a fast-moving creative agency. You identify inefficiencies, implement systems, and make sure every part of the business runs with clarity and consistency. You're a strong operator who can translate vision into process.",
    "responsibilities": [
      "Design, implement, and refine operational systems across the agency.",
      "Oversee project delivery, resource allocation, and team capacity planning.",
      "Build SOPs and process documentation for core business functions.",
      "Identify bottlenecks and drive continuous operational improvements.",
      "Report to leadership on operational health, costs, and efficiency metrics."
    ],
    "requirements": [
      "3+ years in operations management, ideally at a creative or media company.",
      "Proven ability to build and implement processes in a fast-growing organisation.",
      "Strong analytical skills and data-driven decision-making.",
      "Excellent leadership and cross-functional communication skills."
    ],
    "niceToHave": [
      "MBA or equivalent business qualification.",
      "Experience scaling operations in a remote-first company."
    ]
  },
  {
    "_id": "role-it-system-administrator",
    "_type": "role",
    "title": "IT System Administrator",
    "slug": {
      "_type": "slug",
      "current": "it-system-administrator"
    },
    "status": "open",
    "department": "Technology",
    "type": "Full-time",
    "employmentType": "Full-time",
    "mode": "Remote",
    "location": "Pakistan (Remote)",
    "experience": "2+ years",
    "order": 19,
    "isUrgent": false,
    "urgentHiring": false,
    "shortDesc": "",
    "shortDescription": "",
    "description": "You keep Zealancy's technology infrastructure secure and running. From device management and software provisioning to network security and IT support, you're the person the team relies on when something breaks \u2014 and more importantly, you're the reason things rarely break.",
    "responsibilities": [
      "Manage IT infrastructure, hardware, and software across a remote team.",
      "Administer SaaS tools, user accounts, and access controls.",
      "Implement and maintain IT security policies and practices.",
      "Provide IT support and troubleshooting for team members.",
      "Maintain documentation for systems, processes, and IT assets."
    ],
    "requirements": [
      "2+ years as an IT administrator, system administrator, or IT support specialist.",
      "Experience managing Google Workspace, Microsoft 365, or similar platforms.",
      "Solid understanding of network fundamentals, VPNs, and endpoint security.",
      "Strong troubleshooting skills across Windows, macOS, and Linux environments."
    ],
    "niceToHave": [
      "IT certifications (CompTIA, Google IT Support, or equivalent).",
      "Experience supporting remote-first teams."
    ]
  }
];

async function seed() {
  console.log('====================================================');
  console.log('Seeding ' + jobs.length + ' hardcoded roles to Sanity (' + projectId + ' / ' + dataset + ')...');
  console.log('====================================================\n');

  try {
    const initialCount = await client.fetch('count(*[_type == "role"])');
    console.log('Connected! Current roles in Sanity dataset: ' + initialCount + '\n');
  } catch (err) {
    console.error('Authentication/Network error:', err.message);
    if (err.message?.includes('Insufficient permissions') || err.message?.includes('401')) {
      console.error('Please ensure the token has "Editor" or "Administrator" write permissions.\n');
    }
    process.exit(1);
  }

  let created = 0;
  let skipped = 0;

  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i];
    process.stdout.write('[' + (i + 1) + '/' + jobs.length + '] Seeding: "' + job.title + '" (' + job.slug.current + ')... ');
    try {
      if (useReplace) {
        await client.createOrReplace(job);
        console.log('✓ created/replaced');
        created++;
      } else {
        const res = await client.createIfNotExists(job);
        if (res) {
          console.log('✓ created (createIfNotExists)');
          created++;
        } else {
          console.log('↷ already exists (skipped)');
          skipped++;
        }
      }
    } catch (err) {
      console.log('❌ failed: ' + err.message);
    }
  }

  console.log('\n----------------------------------------------------');
  console.log('Seed finished! Created/updated: ' + created + ', Skipped: ' + skipped);

  try {
    const roles = await client.fetch('*[_type == "role"] | order(order asc) { _id, title, status, "slug": slug.current }');
    console.log('\n🎉 Verification: Total ' + roles.length + ' roles now exist in Sanity Studio:');
    roles.forEach((r, idx) => {
      console.log('  ' + (idx + 1) + '. [' + (r.status || 'OPEN').toUpperCase() + '] ' + r.title + ' (' + r.slug + ')');
    });
    console.log('\n👉 Verify in Sanity Studio:');
    console.log('   https://teamzealancy-careers-studio.sanity.studio/');
    console.log('   https://sanity.io/manage/project/' + projectId + '/studio\n');
  } catch (err) {
    console.warn('Verification query warning:', err.message);
  }
}

seed().catch(err => {
  console.error('Fatal seed error:', err);
  process.exit(1);
});

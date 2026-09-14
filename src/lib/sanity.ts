import { createClient } from 'next-sanity';
import { createImageUrlBuilder } from '@sanity/image-url';
import { MOCK_JOBS } from '@/data/jobs';
import type { Job } from '@/types';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-01';
const token = process.env.SANITY_API_TOKEN;

export const isSanityConfigured = Boolean(
  projectId &&
  projectId.trim() !== '' &&
  projectId !== 'your-project-id' &&
  projectId !== 'your_project_id'
);

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token,
    })
  : null;

const imageBuilder = isSanityConfigured && sanityClient ? createImageUrlBuilder(sanityClient) : null;

export function urlFor(source: any) {
  if (!imageBuilder || !source) return null;
  return imageBuilder.image(source);
}

export interface SanityRoleDocument {
  _id: string;
  _createdAt?: string;
  _updatedAt?: string;
  title: string;
  slug: { current: string } | string;
  department?: string;
  type?: string;
  employmentType?: string;          // alias
  mode?: string;
  location?: string;
  experience?: string;
  status?: 'active' | 'open' | 'closed' | 'paused' | 'archived';
  order?: number;
  isUrgent?: boolean;
  urgentHiring?: boolean;           // alias
  urgentLabel?: string;
  shortDesc?: string;
  shortDescription?: string;        // alias
  description?: string;
  fullDescription?: any;            // rich text (block array) or string
  responsibilities?: string[];
  requirements?: string[];
  niceToHave?: string[];
  bannerImage?: any;
  applyUrl?: string;
}

function extractTextFromBlocks(blocks: any): string {
  if (typeof blocks === 'string') return blocks;
  if (!Array.isArray(blocks)) return '';
  return blocks
    .map((block) => {
      if (block?._type === 'block' && Array.isArray(block.children)) {
        return block.children.map((c: any) => c.text || '').join('');
      }
      return '';
    })
    .filter(Boolean)
    .join('\n\n');
}

export function mapSanityRoleToJob(doc: SanityRoleDocument): Job {
  const slug = typeof doc.slug === 'string' ? doc.slug : doc.slug?.current || '';
  let bannerImageUrl: string | undefined = undefined;

  if (doc.bannerImage) {
    const built = urlFor(doc.bannerImage);
    if (built) {
      bannerImageUrl = built.width(1600).auto('format').fit('max').url();
    }
  }

  // Resolve field aliases & formatting
  const resolvedType = doc.type || doc.employmentType || 'Full-time';
  const resolvedIsUrgent = Boolean(doc.isUrgent || doc.urgentHiring);
  const resolvedShortDesc = doc.shortDesc || doc.shortDescription || '';
  const fullDescFromBlocks = extractTextFromBlocks(doc.fullDescription);
  const resolvedDescription = doc.description || fullDescFromBlocks || resolvedShortDesc || '';

  // Map Sanity status: 'open' / 'active' -> active; 'closed' / 'archived' -> archived; 'paused' -> paused
  const rawStatus = (doc.status || 'open').toLowerCase();
  const resolvedStatus: 'active' | 'paused' | 'archived' =
    rawStatus === 'open' || rawStatus === 'active' ? 'active' :
    rawStatus === 'paused' ? 'paused' : 'archived';

  return {
    id: doc._id,
    slug,
    title: doc.title || '',
    department: doc.department || 'General',
    type: resolvedType,
    mode: doc.mode || 'Remote',
    location: doc.location || 'Pakistan (Remote)',
    experience: doc.experience || '2+ years',
    status: resolvedStatus,
    order: typeof doc.order === 'number' ? doc.order : 0,
    isUrgent: resolvedIsUrgent,
    urgentLabel: doc.urgentLabel || (resolvedIsUrgent ? 'Hiring urgently' : undefined),
    shortDesc: resolvedShortDesc,
    description: resolvedDescription,
    fullDesc: resolvedDescription,
    responsibilities: Array.isArray(doc.responsibilities) ? doc.responsibilities : [],
    requirements: Array.isArray(doc.requirements) ? doc.requirements : [],
    niceToHave: Array.isArray(doc.niceToHave) ? doc.niceToHave : [],
    bannerImage: bannerImageUrl,
    applyUrl: doc.applyUrl || undefined,
    postedAt: doc._createdAt,
    updatedAt: doc._updatedAt,
  } as Job;
}

/**
 * Fetch all active job listings for /careers and landing pages.
 * Prioritizes Sanity Studio as the authoritative CMS:
 * - If a job exists in Sanity, the Sanity document (and its status) takes precedence.
 * - Closing or unpublishing a job in Sanity will hide it from the active list.
 * - New jobs published in Sanity appear immediately.
 * - Falls back to local MOCK_JOBS if Sanity is unreachable or unseeded.
 */
export async function getActiveJobs(): Promise<Job[]> {
  if (isSanityConfigured && sanityClient) {
    try {
      const GROQ = `*[_type == "role"] | order(order asc, _createdAt desc)`;
      const docs = await sanityClient.fetch<SanityRoleDocument[]>(GROQ, {});

      if (Array.isArray(docs) && docs.length > 0) {
        const sanityJobs = docs.map(mapSanityRoleToJob);

        const sanityJobMap = new Map<string, Job>();
        sanityJobs.forEach((job) => {
          if (job.slug) {
            sanityJobMap.set(job.slug, job);
          }
        });

        const mergedJobs: Job[] = [];
        const handledSlugs = new Set<string>();

        // 1. Process MOCK_JOBS with Sanity precedence
        for (const mockJob of MOCK_JOBS) {
          handledSlugs.add(mockJob.slug);
          if (sanityJobMap.has(mockJob.slug)) {
            const sanityJob = sanityJobMap.get(mockJob.slug)!;
            if (sanityJob.status === 'active') {
              mergedJobs.push(sanityJob);
            }
          } else if (mockJob.status === 'active') {
            mergedJobs.push(mockJob);
          }
        }

        // 2. Add any newly created Sanity jobs not present in MOCK_JOBS
        for (const sanityJob of sanityJobs) {
          if (!handledSlugs.has(sanityJob.slug)) {
            handledSlugs.add(sanityJob.slug);
            if (sanityJob.status === 'active') {
              mergedJobs.push(sanityJob);
            }
          }
        }

        return mergedJobs;
      }
    } catch (error) {
      console.warn('[Sanity] Could not fetch active jobs from Sanity, using local roles fallback:', error);
    }
  }

  return MOCK_JOBS.filter((j) => j.status === 'active');
}

/**
 * Fetch all job slugs for static site generation (generateStaticParams).
 * Merges all Sanity slugs with local mock slugs to guarantee zero 404s.
 */
export async function getAllJobSlugs(): Promise<string[]> {
  const mockSlugs = MOCK_JOBS.map((j) => j.slug);

  if (isSanityConfigured && sanityClient) {
    try {
      const sanitySlugs = await sanityClient.fetch<string[]>(
        `*[_type == "role" && defined(slug.current)][].slug.current`,
        {}
      );
      if (Array.isArray(sanitySlugs)) {
        const unique = new Set([...mockSlugs, ...sanitySlugs]);
        return Array.from(unique);
      }
    } catch (error) {
      console.warn('[Sanity] Could not fetch job slugs from Sanity, using local slugs only:', error);
    }
  }

  return mockSlugs;
}

/**
 * Fetch a single job role by slug.
 * Checks Sanity first (ensuring full CMS editability for any role), then falls back to MOCK_JOBS.
 */
export async function getJobBySlug(slug: string): Promise<Job | undefined> {
  if (isSanityConfigured && sanityClient) {
    try {
      const doc = await sanityClient.fetch<SanityRoleDocument>(
        `*[_type == "role" && slug.current == $slug][0]`,
        { slug }
      );
      if (doc) {
        return mapSanityRoleToJob(doc);
      }
    } catch (error) {
      console.warn(`[Sanity] Could not fetch job "${slug}" from Sanity, falling back to local role:`, error);
    }
  }
  return MOCK_JOBS.find((j) => j.slug === slug);
}

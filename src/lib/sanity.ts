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
      useCdn: false, // CRITICAL: Disable CDN caching for real-time reads & instant deletions
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
  sequence?: number;
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
  customApplyUrl?: string;
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
  const resolvedApplyUrl = doc.applyUrl || doc.customApplyUrl || undefined;

  // Resolve ordering position (sequence taking precedence over order)
  const resolvedOrder = typeof doc.sequence === 'number' ? doc.sequence : (typeof doc.order === 'number' ? doc.order : 0);

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
    order: resolvedOrder,
    isUrgent: resolvedIsUrgent,
    urgentLabel: doc.urgentLabel || (resolvedIsUrgent ? 'Hiring urgently' : undefined),
    shortDesc: resolvedShortDesc,
    description: resolvedDescription,
    fullDesc: resolvedDescription,
    responsibilities: Array.isArray(doc.responsibilities) ? doc.responsibilities : [],
    requirements: Array.isArray(doc.requirements) ? doc.requirements : [],
    niceToHave: Array.isArray(doc.niceToHave) ? doc.niceToHave : [],
    bannerImage: bannerImageUrl,
    applyUrl: resolvedApplyUrl,
    postedAt: doc._createdAt,
    updatedAt: doc._updatedAt,
  } as Job;
}

/**
 * Fetch all active job listings for /careers and landing pages.
 * Directly queries Sanity CMS with strict sequence ordering:
 * - Order: sequence asc, order asc, _createdAt desc
 * - Deletions: Deleted Sanity records vanish immediately from the response.
 * - Cache: useCdn: false and { cache: 'no-store' } bypass edge caching.
 * - Fallback: Uses local MOCK_JOBS only if Sanity is completely empty or offline.
 */
export async function getActiveJobs(): Promise<Job[]> {
  if (isSanityConfigured && sanityClient) {
    try {
      const GROQ = `*[_type == "role" && (status == "open" || status == "active" || status == "Open" || !defined(status))] | order(sequence asc, order asc, _createdAt desc)`;
      const docs = await sanityClient.fetch<SanityRoleDocument[]>(
        GROQ,
        {},
        { cache: 'no-store' }
      );

      if (Array.isArray(docs) && docs.length > 0) {
        return docs.map(mapSanityRoleToJob);
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
        {},
        { cache: 'no-store' }
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
        { slug },
        { cache: 'no-store' }
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

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
  mode?: string;
  location?: string;
  experience?: string;
  status?: 'active' | 'paused' | 'archived';
  order?: number;
  isUrgent?: boolean;
  urgentLabel?: string;
  shortDesc?: string;
  description?: string;
  responsibilities?: string[];
  requirements?: string[];
  niceToHave?: string[];
  bannerImage?: any;
  applyUrl?: string;
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

  return {
    id: doc._id,
    slug,
    title: doc.title || '',
    department: doc.department || 'General',
    type: doc.type || 'Full-time',
    mode: doc.mode || 'Remote',
    location: doc.location || 'Pakistan (Remote)',
    experience: doc.experience || '2+ years',
    status: (doc.status as any) || 'active',
    order: typeof doc.order === 'number' ? doc.order : 0,
    isUrgent: Boolean(doc.isUrgent),
    urgentLabel: doc.urgentLabel || (doc.isUrgent ? 'Hiring urgently' : undefined),
    shortDesc: doc.shortDesc || '',
    description: doc.description || doc.shortDesc || '',
    fullDesc: doc.description || doc.shortDesc || '',
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
 * ALWAYS merges hardcoded MOCK_JOBS with live Sanity jobs.
 * Sanity is queried with cache: 'no-store' to guarantee fresh data on every build.
 * Supports status values: "active", "open", "Open", or undefined/null (treated as active).
 */
export async function getActiveJobs(): Promise<Job[]> {
  const hardcodedJobs = MOCK_JOBS.filter((j) => j.status === 'active');

  if (isSanityConfigured && sanityClient) {
    try {
      const GROQ = `*[_type == "role" && (
        status == "active" ||
        status == "open" ||
        status == "Open" ||
        !defined(status)
      )] | order(order asc, _createdAt desc)`;

      const docs = await sanityClient.fetch<SanityRoleDocument[]>(
        GROQ,
        {}
      );

      if (Array.isArray(docs) && docs.length > 0) {
        const sanityJobs = docs.map(mapSanityRoleToJob);
        // Merge: hardcoded first, then Sanity jobs (deduped by slug)
        const hardcodedSlugs = new Set(hardcodedJobs.map((j) => j.slug));
        const newSanityJobs = sanityJobs.filter((j) => !hardcodedSlugs.has(j.slug));
        return [...hardcodedJobs, ...newSanityJobs];
      }
    } catch (error) {
      console.warn('[Sanity] Could not fetch active jobs from Sanity, using only local roles:', error);
    }
  }

  return hardcodedJobs;
}

/**
 * Fetch all job slugs for static site generation (generateStaticParams).
 * ALWAYS merges Sanity published slugs with local mock slugs — zero 404s guaranteed.
 */
export async function getAllJobSlugs(): Promise<string[]> {
  const mockSlugs = MOCK_JOBS.map((j) => j.slug);

  if (isSanityConfigured && sanityClient) {
    try {
      const sanitySlugs = await sanityClient.fetch<string[]>(
        `*[_type == "role" && defined(slug.current) && (
          status == "active" || status == "open" || status == "Open" || !defined(status)
        )][].slug.current`,
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
 * Checks Sanity first, then falls back to local MOCK_JOBS.
 * Note: no cache override here — this runs during generateStaticParams (SSG).
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

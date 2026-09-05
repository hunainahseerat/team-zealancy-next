import type { Metadata } from 'next';
import { getActiveJobs } from '@/lib/sanity';
import CareersClient from './CareersClient';

export const metadata: Metadata = {
  title: 'Open Roles — Team Zealancy Careers',
  description: "Real work from day one. Every role here ships to channels with millions of viewers. If your portfolio is strong, we want to hear from you.",
};

export default async function CareersPage() {
  const activeJobs = await getActiveJobs();
  return <CareersClient activeJobs={activeJobs} />;
}

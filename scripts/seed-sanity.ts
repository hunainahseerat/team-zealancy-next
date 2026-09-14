import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';
import { MOCK_JOBS } from '../src/data/jobs';

// Load .env.local
dotenv.config({ path: '.env.local' });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '07a4uqvi';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-01';

// Token can come from CLI argument, env, or .env.local
const token = process.argv[2]?.startsWith('sk')
  ? process.argv[2]
  : process.env.SANITY_API_TOKEN;

const useReplace = process.argv.includes('--replace') || process.argv.includes('--force');

async function main() {
  console.log('====================================================');
  console.log('Team Zealancy — Sanity CMS Hardcoded Roles Seeder');
  console.log('====================================================');
  console.log(`Target Project: ${projectId}`);
  console.log(`Target Dataset: ${dataset}`);
  console.log(`Roles to Seed : ${MOCK_JOBS.length}`);
  console.log('----------------------------------------------------');

  if (!token || token.trim() === '') {
    console.error('\n❌ ERROR: SANITY_API_TOKEN is not provided!\n');
    console.error('Sanity Content Lake requires an API Write Token to create documents.');
    console.error('\nTo generate a token:');
    console.error('  1. Go to: https://sanity.io/manage/project/' + projectId + '/api#tokens');
    console.error('  2. Click "Add API token" -> Name: "Seeder" -> Permissions: "Editor" (or "Administrator")');
    console.error('  3. Run the seeder:');
    console.error('     node sanity-seed.mjs <YOUR_SANITY_TOKEN>');
    console.error('     - OR -');
    console.error('     Add SANITY_API_TOKEN=<YOUR_TOKEN> into your .env.local file and run:');
    console.error('     npm run seed:sanity\n');
    process.exit(1);
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: token.trim(),
  });

  console.log('\nChecking connection to Sanity Content Lake...');
  try {
    const existingCount = await client.fetch<number>('count(*[_type == "role"])');
    console.log(`✓ Connected! Current roles in Sanity dataset: ${existingCount}\n`);
  } catch (err: any) {
    console.error('❌ Connection or authentication failed:', err.message);
    if (err.message?.includes('Insufficient permissions') || err.message?.includes('401')) {
      console.error('Please ensure the token has "Editor" or "Administrator" write permissions.\n');
    }
    process.exit(1);
  }

  let createdCount = 0;
  let skippedCount = 0;

  for (let i = 0; i < MOCK_JOBS.length; i++) {
    const job = MOCK_JOBS[i];
    const docId = `role-${job.slug}`;

    const doc: any = {
      _id: docId,
      _type: 'role',
      title: job.title,
      slug: {
        _type: 'slug',
        current: job.slug,
      },
      status: 'open',
      department: job.department,
      type: job.type,
      employmentType: job.type,
      mode: job.mode || 'Remote',
      location: job.location || 'Pakistan (Remote)',
      experience: job.experience || '2+ years',
      order: i + 1,
      isUrgent: Boolean(job.isUrgent),
      urgentHiring: Boolean(job.isUrgent),
      urgentLabel: job.urgentLabel || (job.isUrgent ? 'Hiring urgently' : undefined),
      shortDesc: job.shortDesc || '',
      shortDescription: job.shortDesc || '',
      description: job.description || job.fullDesc || job.shortDesc || '',
      responsibilities: Array.isArray(job.responsibilities) ? job.responsibilities : [],
      requirements: Array.isArray(job.requirements) ? job.requirements : [],
      niceToHave: Array.isArray(job.niceToHave) ? job.niceToHave : [],
      applyUrl: job.applyUrl || undefined,
    };

    try {
      process.stdout.write(`[${i + 1}/${MOCK_JOBS.length}] Seeding: "${job.title}" (${job.slug})... `);
      if (useReplace) {
        await client.createOrReplace(doc);
        console.log('✓ created/replaced');
        createdCount++;
      } else {
        const res = await client.createIfNotExists(doc);
        if (res) {
          console.log('✓ created (createIfNotExists)');
          createdCount++;
        } else {
          console.log('↷ already exists (skipped)');
          skippedCount++;
        }
      }
    } catch (err: any) {
      console.log('❌ failed: ' + err.message);
    }
  }

  console.log('\n----------------------------------------------------');
  console.log(`Seed run finished! Created/updated: ${createdCount}, Skipped: ${skippedCount}`);

  try {
    const finalDocs = await client.fetch<any[]>('*[_type == "role"] | order(order asc) { _id, title, status, "slug": slug.current }');
    console.log(`\n🎉 Verification: Total ${finalDocs.length} roles currently in Sanity Content Lake:`);
    finalDocs.forEach((d, idx) => {
      console.log(`  ${idx + 1}. [${d.status.toUpperCase()}] ${d.title} (slug: ${d.slug})`);
    });
    console.log('\n👉 Check Sanity Studio:');
    console.log('   https://teamzealancy-careers-studio.sanity.studio/');
    console.log('   https://sanity.io/manage/project/' + projectId + '/studio\n');
  } catch (err: any) {
    console.warn('Verification query failed:', err.message);
  }
}

main().catch((err) => {
  console.error('Fatal error in seeder:', err);
  process.exit(1);
});

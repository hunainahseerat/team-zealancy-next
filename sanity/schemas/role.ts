import { defineField, defineType } from 'sanity';

export const role = defineType({
  name: 'role',
  title: 'Job Role',
  type: 'document',
  fields: [
    // ── Core identity ──────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Job Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL path)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    // ── Status ────────────────────────────────────────────────────
    defineField({
      name: 'status',
      title: 'Posting Status',
      type: 'string',
      initialValue: 'open',
      options: {
        list: [
          { title: 'Open (Visible on site)', value: 'open' },
          { title: 'Closed (Hidden from site)', value: 'closed' },
          { title: 'Active (Legacy / visible)', value: 'active' },
          { title: 'Paused', value: 'paused' },
          { title: 'Archived', value: 'archived' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    // ── Classification ────────────────────────────────────────────
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: [
          'Video Production',
          'Design & Creative',
          'Design',
          'Content & Writing',
          'Content',
          'Business Development',
          'Technology',
          'Operations',
          'People & Culture',
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Employment Type',
      type: 'string',
      initialValue: 'Full-time',
      options: {
        list: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'],
      },
    }),
    defineField({
      name: 'employmentType',
      title: 'Employment Type (alias)',
      type: 'string',
      initialValue: 'Full-time',
      description: 'Alias field for API compatibility. Use "type" field above.',
      hidden: true,
    }),
    defineField({
      name: 'mode',
      title: 'Work Mode',
      type: 'string',
      initialValue: 'Remote',
      options: { list: ['Remote', 'Hybrid', 'On-site'] },
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      initialValue: 'Pakistan (Remote)',
    }),
    defineField({
      name: 'experience',
      title: 'Experience Level',
      type: 'string',
      initialValue: '2+ years',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Lower numbers display first.',
    }),

    // ── Urgency ───────────────────────────────────────────────────
    defineField({
      name: 'isUrgent',
      title: 'Urgent Hiring?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'urgentHiring',
      title: 'Urgent Hiring (alias)',
      type: 'boolean',
      initialValue: false,
      description: 'Alias for isUrgent.',
      hidden: true,
    }),
    defineField({
      name: 'urgentLabel',
      title: 'Urgent Badge Label',
      type: 'string',
      initialValue: 'Hiring urgently',
      hidden: ({ document }) => !document?.isUrgent && !document?.urgentHiring,
    }),

    // ── Descriptions ──────────────────────────────────────────────
    defineField({
      name: 'shortDesc',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Shown on role cards and hero banner.',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description (alias)',
      type: 'text',
      rows: 3,
      description: 'Alias for shortDesc.',
      hidden: true,
    }),
    defineField({
      name: 'description',
      title: 'Full Role Description',
      type: 'text',
      rows: 5,
      description: 'Narrative overview — Section 01: The Role.',
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description & Requirements (Rich Text)',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Rich text version. Supports bold, lists, and headings.',
    }),

    // ── Responsibilities & Requirements ──────────────────────────
    defineField({
      name: 'responsibilities',
      title: 'Responsibilities',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Key responsibilities (rendered as checklist).',
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements & Qualifications',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'niceToHave',
      title: 'Bonus / Nice to Have',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    // ── Media & Links ─────────────────────────────────────────────
    defineField({
      name: 'bannerImage',
      title: 'Custom Hero Banner Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'applyUrl',
      title: 'Custom Apply Form URL',
      type: 'url',
      description: 'Overrides default Fillout form URL if set.',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      department: 'department',
      status: 'status',
      media: 'bannerImage',
    },
    prepare(selection: { title?: string; department?: string; status?: string; media?: any }) {
      const { title, department, status, media } = selection;
      const dot =
        status === 'active' || status === 'open' ? '[OPEN]' :
        status === 'closed' ? '[CLOSED]' :
        status === 'paused' ? '[PAUSED]' : '[DRAFT]';
      return {
        title: title || 'Untitled Role',
        subtitle: `${dot} ${department || 'No department'}`,
        media,
      };
    },
  },
});

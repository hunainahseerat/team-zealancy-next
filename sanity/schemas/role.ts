import { defineField, defineType } from 'sanity';

export const role = defineType({
  name: 'role',
  title: 'Job Role',
  type: 'document',
  fields: [
    // ── Core Identity ──────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Job Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL Path)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    // ── Status ────────────────────────────────────────────────────
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'open',
      options: {
        list: [
          { title: 'Open', value: 'open' },
          { title: 'Closed', value: 'closed' },
          { title: 'Active (Legacy)', value: 'active' },
          { title: 'Paused', value: 'paused' },
          { title: 'Archived', value: 'archived' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    // ── Sequence & Ordering ───────────────────────────────────────
    defineField({
      name: 'sequence',
      title: 'Sequence / Sort Order',
      type: 'number',
      initialValue: 0,
      description: 'Numeric position (1, 2, 3...). Lower numbers display first.',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),

    // ── Classification & Types ────────────────────────────────────
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
    }),
    defineField({
      name: 'type',
      title: 'Job Type',
      type: 'string',
      initialValue: 'Full-time',
    }),
    defineField({
      name: 'employmentType',
      title: 'Employment Type',
      type: 'string',
      initialValue: 'Full-time',
    }),
    defineField({
      name: 'mode',
      title: 'Work Mode',
      type: 'string',
      initialValue: 'Remote',
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

    // ── Urgency ───────────────────────────────────────────────────
    defineField({
      name: 'urgentHiring',
      title: 'Urgent Hiring',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isUrgent',
      title: 'Is Urgent',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'urgentLabel',
      title: 'Urgent Label',
      type: 'string',
      initialValue: 'Hiring urgently',
    }),

    // ── Descriptions ──────────────────────────────────────────────
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'shortDesc',
      title: 'Short Description (Card)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'description',
      title: 'Role Overview Description',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),

    // ── Responsibilities & Requirements ──────────────────────────
    defineField({
      name: 'responsibilities',
      title: 'Responsibilities',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements & Qualifications',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'niceToHave',
      title: 'Nice to Have',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    // ── Apply URLs & Media ────────────────────────────────────────
    defineField({
      name: 'customApplyUrl',
      title: 'Custom Apply Form URL',
      type: 'url',
    }),
    defineField({
      name: 'applyUrl',
      title: 'Apply Form URL',
      type: 'url',
    }),
    defineField({
      name: 'bannerImage',
      title: 'Custom Hero Banner Image',
      type: 'image',
      options: { hotspot: true },
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
      const badge =
        status === 'open' || status === 'active' ? '[OPEN]' :
        status === 'closed' ? '[CLOSED]' :
        status === 'paused' ? '[PAUSED]' : '[DRAFT]';
      return {
        title: title || 'Untitled Role',
        subtitle: `${badge} ${department || 'No department'}`,
        media,
      };
    },
  },
});

export default role;

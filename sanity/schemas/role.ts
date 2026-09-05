import { defineField, defineType } from 'sanity';

export const role = defineType({
  name: 'role',
  title: 'Job Role',
  type: 'document',
  fields: [
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
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: [
          'Video Production',
          'Design & Creative',
          'Content & Writing',
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
      name: 'mode',
      title: 'Work Mode',
      type: 'string',
      initialValue: 'Remote',
      options: {
        list: ['Remote', 'Hybrid', 'On-site'],
      },
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
      name: 'status',
      title: 'Posting Status',
      type: 'string',
      initialValue: 'active',
      options: {
        list: [
          { title: 'Active (Visible on site)', value: 'active' },
          { title: 'Paused', value: 'paused' },
          { title: 'Archived', value: 'archived' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Lower numbers display first.',
    }),
    defineField({
      name: 'isUrgent',
      title: 'Urgent Hiring?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'urgentLabel',
      title: 'Urgent Badge Label',
      type: 'string',
      initialValue: 'Hiring urgently',
      hidden: ({ document }) => !document?.isUrgent,
    }),
    defineField({
      name: 'shortDesc',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Displayed under the title in the hero banner and on role cards.',
    }),
    defineField({
      name: 'description',
      title: 'Full Role Description',
      type: 'text',
      rows: 5,
      description: 'The narrative overview rendered in Section 01: The Role.',
    }),
    defineField({
      name: 'responsibilities',
      title: 'Responsibilities',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of key responsibilities (rendered as checklist items).',
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements & Qualifications',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Key skills and experience required.',
    }),
    defineField({
      name: 'niceToHave',
      title: 'Bonus Points / Nice to Have',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Optional nice-to-have qualifications.',
    }),
    defineField({
      name: 'bannerImage',
      title: 'Custom Hero Banner Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Optional: Upload a high-res custom banner. If unset, the default theme image is used.',
    }),
    defineField({
      name: 'applyUrl',
      title: 'Custom Apply Form URL',
      type: 'url',
      description: 'Optional: Custom link for this role. Defaults to the Team Zealancy Fillout form if empty.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      department: 'department',
      status: 'status',
      media: 'bannerImage',
    },
    prepare({ title, department, status, media }) {
      return {
        title,
        subtitle: ${department || 'No dept'} • [],
        media,
      };
    },
  },
});

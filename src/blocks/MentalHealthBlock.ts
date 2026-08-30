import type { Block } from 'payload'

export const MentalHealthBlock: Block = {
  slug: 'mental-health',
  interfaceName: 'MentalHealthBlock',
  labels: { singular: 'Mind-Home Connection Section', plural: 'Mind-Home Connection Sections' },
  fields: [
    {
      name: 'sectionLabel',
      type: 'text',
      label: 'Eyebrow Label',
      defaultValue: 'The Mind-Home Connection',
    },
    {
      name: 'headline',
      type: 'text',
      label: 'Section Headline',
      defaultValue: 'Our homes and our minds are constantly speaking.',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Section Description',
    },
    {
      name: 'categories',
      type: 'array',
      label: 'Support Categories',
      admin: {
        description: 'Cards shown in the grid. Each card maps to a mental health / life situation.',
      },
      fields: [
        {
          name: 'iconType',
          type: 'select',
          label: 'Icon',
          required: true,
          options: [
            { label: 'Brain Circuit (ADHD)', value: 'brain-circuit' },
            { label: 'Heart (Depression)', value: 'heart' },
            { label: 'Eye Off (Clutter)', value: 'eye-off' },
            { label: 'Activity (Chronic Illness)', value: 'activity' },
            { label: 'Milestone (Life Transitions)', value: 'milestone' },
          ],
        },
        { name: 'title', type: 'text', label: 'Category Title', required: true },
        { name: 'description', type: 'textarea', label: 'Category Description', required: true },
      ],
    },
    {
      label: 'Custom Care CTA Card',
      type: 'collapsible',
      fields: [
        { name: 'ctaCardEyebrow', type: 'text', label: 'Card Eyebrow' },
        { name: 'ctaCardTitle', type: 'text', label: 'Card Headline' },
        { name: 'ctaCardDescription', type: 'textarea', label: 'Card Description' },
        { name: 'ctaCardButtonText', type: 'text', label: 'Card Button Text', defaultValue: 'Share Your Story Safely' },
      ],
    },
  ],
}

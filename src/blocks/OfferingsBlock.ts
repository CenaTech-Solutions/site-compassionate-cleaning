import type { Block } from 'payload'

export const OfferingsBlock: Block = {
  slug: 'offerings',
  interfaceName: 'OfferingsBlock',
  labels: { singular: 'Care Offerings Section', plural: 'Care Offerings Sections' },
  fields: [
    {
      name: 'sectionLabel',
      type: 'text',
      label: 'Eyebrow Label',
      defaultValue: 'Gentle Frameworks',
    },
    {
      name: 'headline',
      type: 'text',
      label: 'Section Headline',
      defaultValue: 'Support that honors your energy',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Section Description',
    },
    {
      name: 'services',
      type: 'array',
      label: 'Care Services',
      admin: {
        description: 'The service cards shown in the grid. Drag to reorder.',
      },
      fields: [
        {
          name: 'serviceSlug',
          type: 'select',
          label: 'Service ID (used by the intake form)',
          required: true,
          options: [
            { label: 'Gentle Reset', value: 'gentle-reset' },
            { label: 'Maintenance & Comfort', value: 'maintenance' },
            { label: 'Deep Transition', value: 'deep-transition' },
            { label: 'Neurodivergent & ADHD', value: 'neurodivergent' },
            { label: 'Bespoke Custom Care', value: 'custom-care' },
          ],
        },
        {
          name: 'iconType',
          type: 'select',
          label: 'Card Icon',
          required: true,
          options: [
            { label: 'Coffee Cup', value: 'coffee' },
            { label: 'Calendar', value: 'calendar' },
            { label: 'Layers', value: 'layers' },
            { label: 'Heart Handshake', value: 'heart-handshake' },
          ],
        },
        { name: 'title', type: 'text', label: 'Title', required: true },
        { name: 'subtitle', type: 'text', label: 'Subtitle' },
        { name: 'description', type: 'textarea', label: 'Description', required: true },
        {
          name: 'features',
          type: 'array',
          label: 'Features / What this covers',
          fields: [
            { name: 'feature', type: 'text', label: 'Feature', required: true },
          ],
        },
        { name: 'vibe', type: 'text', label: 'Vibe Badge Text' },
      ],
    },
    {
      label: 'Custom Care Box',
      type: 'collapsible',
      fields: [
        { name: 'customCareTitle', type: 'text', label: 'Box Title', defaultValue: "Don't see exactly what you need?" },
        { name: 'customCareDescription', type: 'textarea', label: 'Box Description' },
        { name: 'customCareButtonText', type: 'text', label: 'Box Button', defaultValue: 'Design a custom care plan' },
      ],
    },
  ],
}

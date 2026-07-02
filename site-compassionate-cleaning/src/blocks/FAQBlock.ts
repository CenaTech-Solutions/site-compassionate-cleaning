import type { Block } from 'payload'

export const FAQBlock: Block = {
  slug: 'faq',
  interfaceName: 'FAQBlock',
  labels: { singular: 'FAQ Section', plural: 'FAQ Sections' },
  fields: [
    {
      name: 'sectionLabel',
      type: 'text',
      label: 'Eyebrow Label',
      defaultValue: 'Compassionate Dialogue',
    },
    {
      name: 'headline',
      type: 'text',
      label: 'Section Headline',
      defaultValue: 'Frequently Asked Questions',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Section Description',
    },
    {
      name: 'items',
      type: 'array',
      label: 'FAQ Items',
      admin: {
        description: 'Questions and answers shown in the accordion. Drag to reorder.',
      },
      fields: [
        { name: 'question', type: 'text', label: 'Question', required: true },
        { name: 'answer', type: 'textarea', label: 'Answer', required: true },
      ],
    },
  ],
}

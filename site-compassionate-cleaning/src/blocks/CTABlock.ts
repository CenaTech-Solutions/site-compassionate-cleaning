import type { Block } from 'payload'

export const CTABlock: Block = {
  slug: 'cta',
  interfaceName: 'CTABlock',
  labels: { singular: 'Book Now CTA Section', plural: 'Book Now CTA Sections' },
  fields: [
    {
      name: 'sectionLabel',
      type: 'text',
      label: 'Eyebrow Label',
      defaultValue: 'Take the first gentle step',
    },
    {
      name: 'headline',
      type: 'text',
      label: 'Headline (first line)',
      defaultValue: 'You deserve a home that',
    },
    {
      name: 'headlineHighlight',
      type: 'text',
      label: 'Headline Highlight (second line, styled differently)',
      defaultValue: 'feels like rest.',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Supporting Copy',
    },
    {
      label: 'CTA Button',
      type: 'collapsible',
      fields: [
        { name: 'buttonText', type: 'text', label: 'Button Label', defaultValue: 'Book Now' },
        { name: 'buttonSubtext', type: 'text', label: 'Button Sub-text', defaultValue: 'Free, private, no commitment required' },
      ],
    },
    {
      name: 'reassurances',
      type: 'array',
      label: 'Reassurance Chips',
      fields: [
        {
          name: 'iconType',
          type: 'select',
          label: 'Icon',
          required: true,
          options: [
            { label: 'Shield Check', value: 'shield-check' },
            { label: 'Clock', value: 'clock' },
            { label: 'Heart', value: 'heart' },
            { label: 'Sparkles', value: 'sparkles' },
          ],
        },
        { name: 'label', type: 'text', label: 'Chip Label', required: true },
      ],
    },
    {
      label: 'Closing Quote',
      type: 'collapsible',
      fields: [
        { name: 'quote', type: 'text', label: 'Quote Text' },
        { name: 'quoteAttribution', type: 'text', label: 'Quote Attribution', defaultValue: 'Compassionate Cleaning NYC' },
      ],
    },
  ],
}

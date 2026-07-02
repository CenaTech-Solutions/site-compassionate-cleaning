import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  labels: { singular: 'Hero Section', plural: 'Hero Sections' },
  fields: [
    {
      name: 'eyebrowLabel',
      type: 'text',
      label: 'Eyebrow Tag',
      defaultValue: 'Judgment-Free Support',
    },
    {
      name: 'headline',
      type: 'text',
      label: 'Main Headline',
      required: true,
      defaultValue: 'Your worth is not measured by the state of your home.',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      label: 'CTA Buttons',
      type: 'collapsible',
      fields: [
        {
          name: 'primaryButtonText',
          type: 'text',
          label: 'Primary Button',
          defaultValue: 'Request a Gentle Visit',
        },
        {
          name: 'secondaryButtonText',
          type: 'text',
          label: 'Secondary Button',
          defaultValue: 'How we support you',
        },
      ],
    },
    {
      label: 'Reassurance Badges',
      type: 'collapsible',
      fields: [
        { name: 'badge1Title', type: 'text', label: 'Badge 1 Title' },
        { name: 'badge1Description', type: 'text', label: 'Badge 1 Description' },
        { name: 'badge2Title', type: 'text', label: 'Badge 2 Title' },
        { name: 'badge2Description', type: 'text', label: 'Badge 2 Description' },
      ],
    },
    {
      label: 'Founder Portrait',
      type: 'collapsible',
      fields: [
        {
          name: 'founderImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Founder Photo',
        },
        { name: 'founderCaption', type: 'text', label: 'Portrait Caption' },
        { name: 'founderTitle', type: 'text', label: 'Founder Title', defaultValue: 'Founder & Lead Cleaner' },
        { name: 'starRatingLabel', type: 'text', label: 'Star Rating Badge', defaultValue: '5-star rated' },
        { name: 'zeroJudgmentLabel', type: 'text', label: 'Zero Judgment Badge', defaultValue: 'Zero-judgment, always' },
      ],
    },
  ],
}

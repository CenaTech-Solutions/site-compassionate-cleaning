import type { Block } from 'payload'

export const GalleryBlock: Block = {
  slug: 'gallery',
  interfaceName: 'GalleryBlock',
  labels: { singular: 'Before & After Gallery', plural: 'Before & After Galleries' },
  fields: [
    {
      name: 'sectionLabel',
      type: 'text',
      label: 'Eyebrow Label',
      defaultValue: 'Spaces Restored',
    },
    {
      name: 'headline',
      type: 'text',
      label: 'Section Headline',
      defaultValue: 'Real care, real transformation',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Section Description',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Gallery Items',
      admin: {
        description: 'Before and after image pairs. Drag to reorder.',
      },
      fields: [
        { name: 'beforeImage', type: 'upload', relationTo: 'media', label: 'Before Image', required: true },
        { name: 'afterImage', type: 'upload', relationTo: 'media', label: 'After Image', required: true },
        { name: 'label', type: 'text', label: 'Space Label', required: true },
        { name: 'caption', type: 'textarea', label: 'Caption' },
      ],
    },
    {
      name: 'dignityNote',
      type: 'textarea',
      label: 'Consent / Dignity Note (shown below gallery)',
    },
  ],
}

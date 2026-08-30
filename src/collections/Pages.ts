import type { CollectionConfig } from 'payload'
import { HeroBlock } from '@/blocks/HeroBlock'
import { MentalHealthBlock } from '@/blocks/MentalHealthBlock'
import { GalleryBlock } from '@/blocks/GalleryBlock'
import { OfferingsBlock } from '@/blocks/OfferingsBlock'
import { CTABlock } from '@/blocks/CTABlock'
import { FAQBlock } from '@/blocks/FAQBlock'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Page', plural: 'Pages' },
  admin: {
    useAsTitle: 'title',
    description: 'Website pages. Each page is built from reusable, orderable blocks.',
    defaultColumns: ['title', 'pageSlug', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Page Title',
      required: true,
    },
    {
      name: 'pageSlug',
      type: 'text',
      label: 'Page Slug',
      required: true,
      unique: true,
      admin: {
        description: 'URL identifier for this page, e.g. "home", "about". Used by the frontend to look up page content.',
      },
    },
    {
      name: 'content',
      type: 'blocks',
      label: 'Page Sections',
      blocks: [HeroBlock, MentalHealthBlock, GalleryBlock, OfferingsBlock, CTABlock, FAQBlock],
      admin: {
        description: 'Drag blocks to reorder sections. Add any block type to build the page.',
      },
    },
  ],
}

import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    description: 'Global brand info, contact details, and social links used across the entire site.',
  },
  fields: [
    {
      name: 'brandName',
      type: 'text',
      label: 'Brand Name',
      defaultValue: 'Compassionate Cleaning',
      required: true,
    },
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline',
      defaultValue: 'Care • Dignity • Mental Wellness',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number (display)',
      defaultValue: '(917) 555-0143',
    },
    {
      name: 'phoneTel',
      type: 'text',
      label: 'Phone Number (tel: link)',
      defaultValue: '9175550143',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
      defaultValue: 'hello@compassionateclean.com',
    },
    {
      name: 'address',
      type: 'text',
      label: 'Service Area Description',
      defaultValue: 'Serving Manhattan, Brooklyn, Queens, Bronx, and Staten Island.',
    },
    {
      name: 'instagramHandle',
      type: 'text',
      label: 'Instagram Handle',
      defaultValue: '@compassionateclean',
    },
    {
      name: 'instagramUrl',
      type: 'text',
      label: 'Instagram URL',
      defaultValue: 'https://instagram.com/compassionateclean',
    },
    {
      name: 'insuranceText',
      type: 'text',
      label: 'Insurance Badge Text',
      defaultValue: 'Fully Insured & Bonded',
    },
    {
      name: 'localityBadgeText',
      type: 'text',
      label: 'Locality Badge Text',
      defaultValue: 'NYC Local',
    },
    {
      name: 'footerDescription',
      type: 'textarea',
      label: 'Footer Brand Description',
      defaultValue: 'We are a judgment-free, trauma-informed home reset service supporting mental wellness, neurodiversity, physical constraints, and hard life transitions.',
    },
  ],
}

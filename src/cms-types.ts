// Shared TypeScript interfaces for Payload CMS block data.
// These mirror the field structures in src/blocks/ and src/globals/SiteSettings.ts.
// After running `npm run generate:types`, import from payload-types instead for full Payload types.

export interface MediaDoc {
  id: string | number
  url?: string | null
  alt: string
  filename?: string | null
}

// ── Site Settings (global, always present) ────────────────────────────────────
export interface SiteSettingsData {
  brandName: string
  tagline: string
  phone: string
  phoneTel: string
  email: string
  address: string
  instagramHandle: string
  instagramUrl: string
  insuranceText: string
  localityBadgeText: string
  footerDescription: string
}

// ── Block interfaces (one per block slug) ─────────────────────────────────────

export interface HeroBlock {
  blockType: 'hero'
  id?: string | null
  eyebrowLabel?: string | null
  headline?: string | null
  description?: string | null
  primaryButtonText?: string | null
  secondaryButtonText?: string | null
  badge1Title?: string | null
  badge1Description?: string | null
  badge2Title?: string | null
  badge2Description?: string | null
  founderImage?: MediaDoc | string | number | null
  founderCaption?: string | null
  founderTitle?: string | null
  starRatingLabel?: string | null
  zeroJudgmentLabel?: string | null
}

export interface MentalHealthCategoryItem {
  id?: string | null
  iconType: 'brain-circuit' | 'heart' | 'eye-off' | 'activity' | 'milestone'
  title: string
  description: string
}

export interface MentalHealthBlock {
  blockType: 'mental-health'
  id?: string | null
  sectionLabel?: string | null
  headline?: string | null
  description?: string | null
  categories?: MentalHealthCategoryItem[] | null
  ctaCardEyebrow?: string | null
  ctaCardTitle?: string | null
  ctaCardDescription?: string | null
  ctaCardButtonText?: string | null
}

export interface GalleryItemData {
  id?: string | null
  beforeImage?: MediaDoc | string | number | null
  afterImage?: MediaDoc | string | number | null
  label?: string | null
  caption?: string | null
}

export interface GalleryBlock {
  blockType: 'gallery'
  id?: string | null
  sectionLabel?: string | null
  headline?: string | null
  description?: string | null
  items?: GalleryItemData[] | null
  dignityNote?: string | null
}

export interface ServiceFeatureItem {
  id?: string | null
  feature: string
}

export interface ServiceItem {
  id?: string | null
  serviceSlug: 'gentle-reset' | 'maintenance' | 'deep-transition' | 'neurodivergent' | 'custom-care'
  iconType: 'coffee' | 'calendar' | 'layers' | 'heart-handshake'
  title: string
  subtitle?: string | null
  description: string
  features?: ServiceFeatureItem[] | null
  vibe?: string | null
}

export interface OfferingsBlock {
  blockType: 'offerings'
  id?: string | null
  sectionLabel?: string | null
  headline?: string | null
  description?: string | null
  services?: ServiceItem[] | null
  customCareTitle?: string | null
  customCareDescription?: string | null
  customCareButtonText?: string | null
}

export interface ReassuranceItem {
  id?: string | null
  iconType: 'shield-check' | 'clock' | 'heart' | 'sparkles'
  label: string
}

export interface CTABlock {
  blockType: 'cta'
  id?: string | null
  sectionLabel?: string | null
  headline?: string | null
  headlineHighlight?: string | null
  description?: string | null
  buttonText?: string | null
  buttonSubtext?: string | null
  reassurances?: ReassuranceItem[] | null
  quote?: string | null
  quoteAttribution?: string | null
}

export interface FAQItemData {
  id?: string | null
  question: string
  answer: string
}

export interface FAQBlock {
  blockType: 'faq'
  id?: string | null
  sectionLabel?: string | null
  headline?: string | null
  description?: string | null
  items?: FAQItemData[] | null
}

// Discriminated union of all page blocks
export type PageBlock = HeroBlock | MentalHealthBlock | GalleryBlock | OfferingsBlock | CTABlock | FAQBlock

// Full page data passed from server to client
export interface PageData {
  siteSettings: SiteSettingsData
  blocks: PageBlock[]
}

// ── Fallback site settings ────────────────────────────────────────────────────
export const FALLBACK_SITE_SETTINGS: SiteSettingsData = {
  brandName: 'Compassionate Cleaning',
  tagline: 'Care • Dignity • Mental Wellness',
  phone: '(917) 555-0143',
  phoneTel: '9175550143',
  email: 'hello@compassionateclean.com',
  address: 'Serving Manhattan, Brooklyn, Queens, Bronx, and Staten Island.',
  instagramHandle: '@compassionateclean',
  instagramUrl: 'https://instagram.com/compassionateclean',
  insuranceText: 'Fully Insured & Bonded',
  localityBadgeText: 'NYC Local',
  footerDescription:
    'We are a judgment-free, trauma-informed home reset service supporting mental wellness, neurodiversity, physical constraints, and hard life transitions.',
}

import { getPayload } from 'payload'
import config from '@/payload.config'
import HomePage from '@/components/HomePage'
import { FALLBACK_SITE_SETTINGS, type PageData, type PageBlock, type SiteSettingsData } from '@/cms-types'
import './styles.css'

export default async function FrontendPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Fetch the home page document and site-wide settings in parallel
  const [pagesResult, siteSettingsRaw] = await Promise.all([
    payload
      .find({
        collection: 'pages',
        where: { pageSlug: { equals: 'home' } },
        depth: 3, // resolves media relationships inside nested arrays
        limit: 1,
      })
      .catch(() => ({ docs: [] })),
    payload
      .findGlobal({ slug: 'site-settings', depth: 1 })
      .catch(() => ({} as Record<string, unknown>)),
  ])

  // Merge site settings with fallbacks
  const raw = siteSettingsRaw as Record<string, unknown>
  const siteSettings: SiteSettingsData = {
    brandName: String(raw.brandName ?? FALLBACK_SITE_SETTINGS.brandName),
    tagline: String(raw.tagline ?? FALLBACK_SITE_SETTINGS.tagline),
    phone: String(raw.phone ?? FALLBACK_SITE_SETTINGS.phone),
    phoneTel: String(raw.phoneTel ?? FALLBACK_SITE_SETTINGS.phoneTel),
    email: String(raw.email ?? FALLBACK_SITE_SETTINGS.email),
    address: String(raw.address ?? FALLBACK_SITE_SETTINGS.address),
    instagramHandle: String(raw.instagramHandle ?? FALLBACK_SITE_SETTINGS.instagramHandle),
    instagramUrl: String(raw.instagramUrl ?? FALLBACK_SITE_SETTINGS.instagramUrl),
    insuranceText: String(raw.insuranceText ?? FALLBACK_SITE_SETTINGS.insuranceText),
    localityBadgeText: String(raw.localityBadgeText ?? FALLBACK_SITE_SETTINGS.localityBadgeText),
    footerDescription: String(raw.footerDescription ?? FALLBACK_SITE_SETTINGS.footerDescription),
  }

  // Extract blocks from the home page document (safe-cast; runtime shape is correct)
  const homeDoc = pagesResult.docs[0] as { content?: unknown } | undefined
  const blocks = (Array.isArray(homeDoc?.content) ? homeDoc.content : []) as PageBlock[]

  const pageData: PageData = { siteSettings, blocks }

  return <HomePage pageData={pageData} />
}

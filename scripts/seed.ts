import 'dotenv/config'
import { getPayload } from 'payload'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Resolve __dirname in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function seed() {
  // Dynamic import so dotenv loads env vars before payload config is evaluated
  const { default: config } = await import('../src/payload.config.ts')
  const payload = await getPayload({ config: await config })

  // Guard: skip if home page already exists
  const existing = await payload.find({
    collection: 'pages',
    where: { pageSlug: { equals: 'home' } },
    limit: 1,
  })

  if (existing.totalDocs > 0) {
    console.log('⏭  Already seeded — home page exists. No changes made.')
    process.exit(0)
  }

  // ── 1. Upload images from public/images ──────────────────────────────────
  const publicImagesDir = path.resolve(__dirname, '..', 'public', 'images')

  const uploadImage = async (filename: string, altText: string) => {
    const filePath = path.join(publicImagesDir, filename)
    if (!fs.existsSync(filePath)) {
      console.warn(`  ⚠  Image not found, skipping: ${filename}`)
      return null
    }
    const fileData = fs.readFileSync(filePath)
    const stats = fs.statSync(filePath)
    const result = await payload.create({
      collection: 'media',
      data: { alt: altText },
      file: { data: fileData, mimetype: 'image/webp', name: filename, size: stats.size },
    })
    console.log(`  ✓  Uploaded: ${filename}`)
    return result
  }

  console.log('\n📤 Uploading images…')
  const [founderMedia, before1, after1, before2, after2, before3, after3] = await Promise.all([
    uploadImage('cc-bio-pic.webp', 'Founder of Compassionate Cleaning'),
    uploadImage('before-and-afters/cc-before-1.webp', 'Living space before cleaning'),
    uploadImage('before-and-afters/cc-after-1.webp', 'Living space after cleaning'),
    uploadImage('before-and-afters/cc-before-2.webp', 'Kitchen area before cleaning'),
    uploadImage('before-and-afters/cc-after-2.webp', 'Kitchen area after cleaning'),
    uploadImage('before-and-afters/cc-before-3.webp', 'Bedroom before cleaning'),
    uploadImage('before-and-afters/cc-after-3.webp', 'Bedroom after cleaning'),
  ])

  // ── 2. SiteSettings global (from Footer + Header) ───────────────────────
  console.log('\n⚙️  Writing SiteSettings global…')
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
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
    },
  })
  console.log('  ✓  SiteSettings saved')

  // ── 3. Home page with all blocks ─────────────────────────────────────────
  console.log('\n📄 Creating "home" page with all content blocks…')
  await payload.create({
    collection: 'pages',
    data: {
      title: 'Home',
      pageSlug: 'home',
      content: [

        // ── Hero (Hero.tsx) ────────────────────────────────────────────────
        {
          blockType: 'hero' as const,
          eyebrowLabel: 'Judgment-Free Support',
          headline: 'Your worth is not measured by the state of your home.',
          description:
            'Whether you are living with mental health struggles, neurodivergent executive exhaustion, a major transition, or physical limits, we clean with care, dignity, and absolute zero judgment.',
          primaryButtonText: 'Request a Gentle Visit',
          secondaryButtonText: 'How we support you',
          badge1Title: 'Trauma-Informed & Safe',
          badge1Description: 'Every member trained in empathy, quiet presence, and custom pace.',
          badge2Title: 'No Pre-Cleaning Expected',
          badge2Description: 'No moralizing, no lecturing, and absolutely no shame.',
          founderImage: founderMedia?.id ?? undefined,
          founderCaption: 'A human who gets it — here to help, never to judge.',
          founderTitle: 'Founder & Lead Cleaner',
          starRatingLabel: '5-star rated',
          zeroJudgmentLabel: 'Zero-judgment, always',
        },

        // ── Mind-Home Connection (MentalHealthSupport.tsx) ────────────────
        {
          blockType: 'mental-health' as const,
          sectionLabel: 'The Mind-Home Connection',
          headline: 'Our homes and our minds are constantly speaking.',
          description:
            'When visual clutter, laundry hills, and dust gather, they create an echoing mental noise. We do not see "mess" as laziness—we see it as a courageous story of someone who has had their hands full with survival.',
          categories: [
            {
              iconType: 'brain-circuit' as const,
              title: 'ADHD & Executive Dysfunction',
              description:
                'Organizing systems are often built for typical brains. We provide body-doubling (working alongside you) or design quiet visual cues that support your flow without overwhelm.',
            },
            {
              iconType: 'heart' as const,
              title: 'Depression & Fatigue Reset',
              description:
                'When survival is your only task, tidy countertops slip. We step in with zero lectures to lift the heavy weight, leaving you with a fresh, airy space to breathe and heal.',
            },
            {
              iconType: 'eye-off' as const,
              title: 'Clutter & Hoarding Recovery',
              description:
                'We work slowly and consensually. We never throw anything away without your verbal permission, protecting your comfort and privacy every step of the journey.',
            },
            {
              iconType: 'activity' as const,
              title: 'Chronic Illness & Physical Limits',
              description:
                'Scrubbing floors or lifting vacuums can cause intense pain or exhaustion. We serve as your physical extensions, keeping your space hygienic and fully supporting your safety.',
            },
            {
              iconType: 'milestone' as const,
              title: 'Life Transitions & Caregiver Respite',
              description:
                'Grief, divorce, postpartum, or intense workloads drain mental resources. We carry the visual noise out of your space so you can safely process the changes in your life.',
            },
          ],
          ctaCardEyebrow: 'Need something customized?',
          ctaCardTitle: 'Your situation is unique. We are entirely adaptable.',
          ctaCardDescription:
            'Tell us exactly what boundaries or pacing you need. Whether that means starting with just one small box of laundry or doing a completely silent clean—we are here to support your peace.',
          ctaCardButtonText: 'Share Your Story Safely',
        },

        // ── Before & After Gallery (BeforeAfterGallery.tsx) ───────────────
        {
          blockType: 'gallery' as const,
          sectionLabel: 'Spaces Restored',
          headline: 'Real care, real transformation',
          description:
            'Every image here was shared with express client permission and gratitude. Drag the slider to reveal how a space can breathe again — without judgment, without rush.',
          items: [
            ...(before1 && after1
              ? [{
                  beforeImage: before1.id,
                  afterImage: after1.id,
                  label: 'Living Space',
                  caption: 'Gentle Reset — restored breathing room and calm paths.',
                }]
              : []),
            ...(before2 && after2
              ? [{
                  beforeImage: before2.id,
                  afterImage: after2.id,
                  label: 'Kitchen Area',
                  caption: 'Deep Transition Reset — surfaces cleared, dishes done, and dignity restored.',
                }]
              : []),
            ...(before3 && after3
              ? [{
                  beforeImage: before3.id,
                  afterImage: after3.id,
                  label: 'Bedroom & Rest Space',
                  caption: 'Maintenance Care — a safe haven returned to rest and recovery.',
                }]
              : []),
          ],
          dignityNote:
            'All spaces shown here belong to clients who chose to share their journey. We never photograph without consent — your story belongs to you.',
        },

        // ── Care Offerings (ServiceOfferings.tsx) ─────────────────────────
        {
          blockType: 'offerings' as const,
          sectionLabel: 'Gentle Frameworks',
          headline: 'Support that honors your energy',
          description:
            "We don't believe in rigid lists or checklists that ignore the human in the room. Our care models represent starting points—each one is fully tailorable to your mood, pace, and comfort.",
          services: [
            {
              serviceSlug: 'gentle-reset' as const,
              iconType: 'coffee' as const,
              title: 'Gentle Reset Care',
              subtitle: 'First Breath of Fresh Air',
              description:
                'Designed specifically for spaces that have piled up during depressive cycles, severe burnout, or intense life storms.',
              features: [
                { feature: 'Quiet, non-judgmental initial evaluation' },
                { feature: 'Dishes washed, dried, and neatly stacked' },
                { feature: 'Clearing primary walking paths for basic safety' },
                { feature: 'Hygienic bathroom and kitchen disinfection' },
                { feature: 'Garbage and recycling removal' },
              ],
              vibe: 'Warm, slow-paced, safety-first support',
            },
            {
              serviceSlug: 'maintenance' as const,
              iconType: 'calendar' as const,
              title: 'Maintenance & Comfort',
              subtitle: 'Predictable Rhythmic Support',
              description:
                'For chronic illness, long work hours, or daily executive dysfunction where maintaining the baseline is the hardest struggle.',
              features: [
                { feature: 'Regular, recurring scheduled visits' },
                { feature: 'Surfaces dusted, vacuumed, and mopped' },
                { feature: 'Linen replacement & bed-making' },
                { feature: 'Pantry & fridge maintenance checks' },
                { feature: 'Tidying living rooms and resting zones' },
              ],
              vibe: 'Predictable, gentle routine',
            },
            {
              serviceSlug: 'deep-transition' as const,
              iconType: 'layers' as const,
              title: 'Deep Transition Reset',
              subtitle: 'Fresh Canvas, Fresh Pages',
              description:
                'A thorough room-by-room renewal following major life events: grieving, divorce, new babies, or recovery periods.',
              features: [
                { feature: 'Dusting high fixtures, vents, and baseboards' },
                { feature: 'Thorough kitchen appliances clean (inside/out)' },
                { feature: 'Deep scrub of bathrooms & tile grout' },
                { feature: 'Window sills, frames, and glass detail' },
                { feature: 'Deep rug vacuuming and floor treatment' },
              ],
              vibe: 'Complete environmental renewal',
            },
            {
              serviceSlug: 'neurodivergent' as const,
              iconType: 'heart-handshake' as const,
              title: 'Neurodivergent & ADHD Support',
              subtitle: 'Designed for Unique Brains',
              description:
                "Cleaning coupled with executive function support. We don't force neurotypical systems; we adapt to how your mind runs.",
              features: [
                { feature: 'Body-doubling (cleaning collaboratively with you)' },
                { feature: 'Quiet presence (using headphones or minimal noise)' },
                { feature: "Dignified sorting: 'Keep', 'Relocate', 'Donate'" },
                { feature: 'No forced labeling: custom categorizing' },
                { feature: 'Sensory-friendly, unscented eco-cleaning' },
              ],
              vibe: 'Accommodating, neuro-affirming, sensory-aware',
            },
          ],
          customCareTitle: "Don't see exactly what you need?",
          customCareDescription:
            'Our most popular care plan is simply Bespoke Custom Care. Let us know which boundaries or requirements feel safest for you, and we will construct a visit that respects your terms.',
          customCareButtonText: 'Design a custom care plan',
        },

        // ── CTA Section (CTASection.tsx) ───────────────────────────────────
        {
          blockType: 'cta' as const,
          sectionLabel: 'Take the first gentle step',
          headline: 'You deserve a home that',
          headlineHighlight: 'feels like rest.',
          description:
            'Reaching out takes courage. Our compassionate team will meet you exactly where you are — no judgment, no pressure, no prep required. One small step is all it takes.',
          buttonText: 'Book Now',
          buttonSubtext: 'Free, private, no commitment required',
          reassurances: [
            { iconType: 'shield-check' as const, label: 'Fully Insured & Bonded' },
            { iconType: 'clock' as const,         label: 'Response within 24 hours' },
            { iconType: 'heart' as const,         label: 'Zero judgment, always' },
            { iconType: 'sparkles' as const,      label: 'No prep required' },
          ],
          quote: 'Your worth is not measured by the state of your home.',
          quoteAttribution: 'Compassionate Cleaning NYC',
        },

        // ── FAQ (FAQ.tsx) ─────────────────────────────────────────────────
        {
          blockType: 'faq' as const,
          sectionLabel: 'Compassionate Dialogue',
          headline: 'Frequently Asked Questions',
          description:
            'Asking for help with our private spaces is deeply vulnerable. Here are answers to the most common worries we hear from our clients.',
          items: [
            {
              question: 'What if my home is extremely messy or smells bad? Will you judge me?',
              answer:
                'Never. We are trained, mental-health-informed professionals, not critical inspectors. We have seen spaces in every imaginable condition—from mountains of unwashed laundry to years of unopened mail. Where you see embarrassment, we see a human being who has had their hands full with survival. Our mission is to restore comfort, warmth, and safe breathing space, with absolute dignity.',
            },
            {
              question: 'Do I have to clean or tidy up before you arrive?',
              answer:
                "Absolutely not. The entire reason we are coming is that things have felt too heavy to carry alone. Pre-cleaning or sorting out of anxiety is very common, but we strongly encourage you to rest and let us see the space exactly as it is today. You do not need to 'earn' or prepare for our support.",
            },
            {
              question: 'Can I stay in the room, or do I need to leave while you work?',
              answer:
                "You are welcome to do whatever feels safest for your mind. Some of our clients put on noise-cancelling headphones and read in a cozy corner. Others prefer 'body-doubling'—working gently alongside us in the same room to maintain momentum. And many choose to take a long-deserved walk to get a complete break. We honor and support whatever you decide.",
            },
            {
              question: 'What products do you use? I have chemical or scent sensitivities.',
              answer:
                'We use ecological, cruelty-free, and unscented products by default to ensure your reset feels fresh, healthy, and safe. If you have specific respiratory issues, asthma, or chemical sensitivities, simply check the scent sensitivity box on our intake form, and we will formulate a completely hypoallergenic plan.',
            },
            {
              question: 'How does sliding-scale pricing work for overlooked communities?',
              answer:
                'We believe that a hygienic, peaceful sanctuary is a fundamental wellness right, not an exclusive luxury. We reserve special sliding-scale slots every month for clients navigating low-income, elder transitions, gender-affirming care, or mental health crises. During our initial 15-minute consultation, we can discuss sliding rates privately and without judgment.',
            },
            {
              question: 'Will you throw away my letters, books, or personal objects?',
              answer:
                'We never throw away mail, papers, sentimental items, or objects without your explicit, verbal consent. If we encounter cluttered surfaces with bills or personal letters, we place them gently into beautiful, labeled sorting baskets so you can review them at your own speed whenever you feel ready.',
            },
          ],
        },

      ],
    },
  })

  console.log('  ✓  Home page created with all 6 section blocks')
  console.log('\n✅ Seed complete!\n')
  process.exit(0)
}

seed().catch((err) => {
  console.error('\n❌ Seed failed:', err)
  process.exit(1)
})

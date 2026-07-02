'use client'

import type { PageBlock } from '@/cms-types'
import type { ServiceType } from '@/types'
import Hero from './Hero'
import MentalHealthSupport from './MentalHealthSupport'
import BeforeAfterGallery from './BeforeAfterGallery'
import ServiceOfferings from './ServiceOfferings'
import CTASection from './CTASection'
import FAQ from './FAQ'

interface BlockRendererProps {
  block: PageBlock
  onBegin: (service?: ServiceType) => void
  onSelectService: (service: ServiceType) => void
  onExploreSupport: () => void
}

export default function BlockRenderer({
  block,
  onBegin,
  onSelectService,
  onExploreSupport,
}: BlockRendererProps) {
  switch (block.blockType) {
    case 'hero':
      return (
        <Hero
          data={block}
          onBegin={() => onBegin()}
          onExploreSupport={onExploreSupport}
        />
      )

    case 'mental-health':
      return <MentalHealthSupport data={block} />

    case 'gallery':
      return <BeforeAfterGallery data={block} />

    case 'offerings':
      return (
        <ServiceOfferings
          data={block}
          onSelectService={onSelectService}
          onOpenIntake={(service) => onBegin(service)}
        />
      )

    case 'cta':
      return <CTASection data={block} onBegin={() => onBegin()} />

    case 'faq':
      return <FAQ data={block} />

    default:
      return null
  }
}

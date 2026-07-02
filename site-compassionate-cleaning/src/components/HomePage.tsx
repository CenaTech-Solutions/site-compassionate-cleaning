'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X } from 'lucide-react'
import Header from './Header'
import Footer from './Footer'
import BlockRenderer from './BlockRenderer'
import IntakeForm from './IntakeForm'
import type { PageData, PageBlock } from '@/cms-types'
import type { ServiceType } from '@/types'

interface HomePageProps {
  pageData: PageData
}

export default function HomePage({ pageData }: HomePageProps) {
  const { siteSettings, blocks } = pageData
  const [selectedService, setSelectedService] = useState<ServiceType>('gentle-reset')
  const [isIntakeOpen, setIsIntakeOpen] = useState(false)

  const handleOpenIntake = (service?: ServiceType) => {
    if (service) setSelectedService(service)
    setIsIntakeOpen(true)
  }

  const handleExploreSupport = () => {
    const el = document.getElementById('connection-section')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative min-h-screen bg-cream-50 text-navy-900 selection:bg-rose-100 selection:text-rose-900">
      {/* Ambient background blobs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-rose-100/20 blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-2/4 right-10 w-96 h-96 rounded-full bg-lavender-100/20 blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-3/4 left-10 w-[30vw] h-[30vw] rounded-full bg-cream-100/40 blur-3xl pointer-events-none -z-10" />

      <Header onBegin={() => handleOpenIntake()} siteSettings={siteSettings} />

      {/* Render every block in order */}
      {blocks.map((block: PageBlock, i: number) => (
        <BlockRenderer
          key={block.id ?? i}
          block={block}
          onBegin={handleOpenIntake}
          onSelectService={setSelectedService}
          onExploreSupport={handleExploreSupport}
        />
      ))}

      <Footer siteSettings={siteSettings} />

      {/* Intake Form Modal */}
      <AnimatePresence>
        {isIntakeOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsIntakeOpen(false)}
              className="absolute inset-0 bg-navy-950/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.97, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.97, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl bg-cream-50 shadow-2xl ring-1 ring-white/60 z-10"
            >
              <button
                id="btn-close-intake-modal"
                onClick={() => setIsIntakeOpen(false)}
                className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 hover:bg-white border border-navy-100 text-navy-500 hover:text-navy-800 transition-all duration-200 shadow-sm"
                aria-label="Close"
              >
                <X className="w-4.5 h-4.5" />
              </button>

              <IntakeForm
                selectedService={selectedService}
                setSelectedService={setSelectedService}
                onClose={() => setIsIntakeOpen(false)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

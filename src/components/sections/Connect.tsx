'use client'

import React, { useState, useRef, useEffect } from 'react'
import { SectionHeader } from '../ui/SectionHeader'
import { MagneticButton } from '../ui/MagneticButton'
import { emailAddress } from '@/data/socials'
import { resume } from '@/data/resume'
import { profile } from '@/data/profile'
import { Download, Copy, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { revealOnScroll } from '@/lib/animations'
import { ContactForm } from '../ui/ContactForm'
import { StatusCard } from '../ui/StatusCard'
import { QuickLinksCard } from '../ui/QuickLinksCard'
import { VisitorCounter } from '../ui/VisitorCounter'

export function Connect() {
  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    revealOnScroll(headerRef.current)
    revealOnScroll(cardsRef.current, {
      from: { y: 30, opacity: 0 },
      to: { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.2 }
    })
  }, [])

  const handleCopyEmail = async () => {
    if (!navigator.clipboard) {
      setCopied(false)
      return
    }
    try {
      await navigator.clipboard.writeText(emailAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(false)
    }
  }

  const handleDownloadResume = () => {
    window.open(resume.pdfPath, '_blank')
    setDownloading(true)
    setTimeout(() => setDownloading(false), 1500)
  }

  return (
    <section id="connect" className="py-24 relative overflow-hidden bg-[#f5efe8]" aria-label="Contact and connect">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div ref={headerRef} className="text-center">
          <SectionHeader
            eyebrow="Connect"
            eyebrowNumber="06"
            title="Let's Start a Conversation"
            subtitle={`I'm currently ${profile.availabilityLabel.toLowerCase()} and seeking teams that value engineering discipline, performance, and narrative clarity.`}
            align="center"
          />
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-10">
          {/* Contact Form — takes 3 columns */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          {/* Sidebar — Status + Social — takes 2 columns */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <StatusCard />
            <QuickLinksCard />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <MagneticButton
            onClick={handleCopyEmail}
            data-cursor-label={copied ? 'Copied!' : 'Copy'}
            className={cn(
              'flex items-center gap-3 px-7 py-4 rounded-xl text-sm font-semibold border transition-all duration-300',
              copied
                ? 'bg-[#111111]/10 border-[#111111]/25 text-[#111111]'
                : 'glass border-[#111111]/10 hover:border-[#111111]/20 text-[#111111]'
            )}
            aria-label={copied ? 'Email copied to clipboard' : 'Copy email address'}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span>{copied ? 'Copied!' : 'Copy Email'}</span>
          </MagneticButton>

          <MagneticButton
            onClick={handleDownloadResume}
            disabled={downloading}
            data-cursor-label="Resume"
            className={cn(
              'flex items-center gap-3 px-7 py-4 rounded-xl text-sm font-semibold border border-[#111111]/10 hover:bg-[#111111]/5 text-[#111111] transition-all duration-300',
              downloading && 'opacity-70 cursor-wait'
            )}
            aria-label="Download resume PDF"
          >
            <Download size={16} className={downloading ? 'animate-bounce' : ''} />
            <span>{downloading ? 'Downloading…' : 'Download Resume'}</span>
          </MagneticButton>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-[#111111]/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-[#6b6b6b]">
          <span>© {new Date().getFullYear()} {profile.name}. Narrative engineering story.</span>
          <VisitorCounter />
          <span>Designed &amp; developed with care.</span>
        </div>
      </div>
    </section>
  )
}

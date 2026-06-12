'use client'

import React, { useState, useRef, useEffect } from 'react'
import { SectionHeader } from '../ui/SectionHeader'
import { GlassCard } from '../ui/GlassCard'
import { MagneticButton } from '../ui/MagneticButton'
import { socials, emailAddress } from '@/data/socials'
import { resume } from '@/data/resume'
import { profile } from '@/data/profile'
import { Mail, Download, Copy, Check, ArrowUpRight, Send, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { revealOnScroll } from '@/lib/animations'

const ICON_MAP: Record<string, React.ReactNode> = {
  Github: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
  Linkedin: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  Mail: <Mail size={20} />,
}

const AVAILABLE_FOR = [
  'Enterprise Distributed Systems Roles',
  'AI Integration Consulting',
  'Open Source Software Design',
  'Full-Stack System Architectures'
]

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormStatus {
  state: 'idle' | 'sending' | 'sent' | 'error'
  message: string
}

export function Connect() {
  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [form, setForm] = useState<FormData>({ name: '', email: '', subject: '', message: '' })
  const [formStatus, setFormStatus] = useState<FormStatus>({ state: 'idle', message: '' })
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    revealOnScroll(headerRef.current)
    revealOnScroll(cardsRef.current, { from: { y: 30, opacity: 0 }, to: { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.2 } })
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
    setDownloading(true)
    const link = document.createElement('a')
    link.href = resume.pdfPath
    link.download = `${profile.name.replace(' ', '-')}-Resume.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setTimeout(() => setDownloading(false), 2000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus({ state: 'sending', message: '' })

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message.')
      }

      setFormStatus({ state: 'sent', message: 'Message sent successfully! I\'ll get back to you soon.' })
      setForm({ name: '', email: '', subject: '', message: '' })
      if (formRef.current) formRef.current.reset()
    } catch (err) {
      setFormStatus({
        state: 'error',
        message: err instanceof Error ? err.message : 'Something went wrong. Please try again.',
      })
    }
  }

  const inputClasses = cn(
    'w-full px-4 py-3 rounded-xl border border-[#111111]/10 bg-[#fcfaf7] text-[#111111] text-sm font-sans',
    'placeholder:text-[#6b6b6b]/50 focus:outline-none focus:border-[#111111]/25 focus:ring-1 focus:ring-[#111111]/10',
    'transition-all duration-200'
  )

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
            <GlassCard className="p-6 sm:p-8 border-[#111111]/8 h-full" glowColor="none" hoverEffect={false}>
              <div className="text-[9px] font-mono text-[#6b6b6b] uppercase tracking-widest mb-6">Send a Message</div>

              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-[10px] font-mono text-[#6b6b6b] uppercase tracking-wider mb-1.5">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[10px] font-mono text-[#6b6b6b] uppercase tracking-wider mb-1.5">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-[10px] font-mono text-[#6b6b6b] uppercase tracking-wider mb-1.5">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="What's this about?"
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-[10px] font-mono text-[#6b6b6b] uppercase tracking-wider mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me about your project, opportunity, or just say hello..."
                    className={cn(inputClasses, 'resize-none')}
                  />
                </div>

                {/* Status message */}
                {formStatus.message && (
                  <div
                    className={cn(
                      'text-xs font-sans px-4 py-3 rounded-xl',
                      formStatus.state === 'sent' && 'bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20',
                      formStatus.state === 'error' && 'bg-red-500/10 text-red-600 border border-red-500/20'
                    )}
                    role="alert"
                  >
                    {formStatus.message}
                  </div>
                )}

                <MagneticButton
                  type="submit"
                  disabled={formStatus.state === 'sending'}
                  className={cn(
                    'flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 mt-2',
                    'bg-[#111111] hover:bg-[#222222] text-[#f5efe8]',
                    formStatus.state === 'sending' && 'opacity-70 cursor-wait'
                  )}
                >
                  {formStatus.state === 'sending' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Send Message</span>
                    </>
                  )}
                </MagneticButton>
              </form>
            </GlassCard>
          </div>

          {/* Sidebar — Status + Social — takes 2 columns */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Status card */}
            <GlassCard className="p-6 border-[#111111]/8 flex flex-col gap-4" glowColor="none" hoverEffect>
              <div className="flex items-center gap-3">
                <div className="status-dot bg-[#10B981]" />
                <div>
                  <div className="text-xs font-mono text-[#6b6b6b] font-semibold">Status</div>
                  <div className="text-[#111111] text-sm font-heading font-semibold">{profile.availabilityLabel}</div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#111111]/8">
                <div className="text-[9px] font-mono text-[#6b6b6b] uppercase tracking-widest mb-3">Interests</div>
                <ul className="flex flex-col gap-2" aria-label="Available for">
                  {AVAILABLE_FOR.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-[#6b6b6b]">
                      <span className="text-[#111111] text-[10px] font-bold">→</span>
                      <span className="font-mono">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[#111111]/8">
                <div className="text-[9px] font-mono text-[#6b6b6b] mb-1">Details</div>
                <div className="text-xs text-[#111111] font-mono">{profile.location}</div>
                <div className="text-[9px] text-[#6b6b6b] font-mono mt-0.5">{profile.timezone}</div>
              </div>
            </GlassCard>

            {/* Social links */}
            <GlassCard className="p-6 border-[#111111]/8 flex flex-col gap-4 flex-1" glowColor="none" hoverEffect={false}>
              <div className="text-[9px] font-mono text-[#6b6b6b] uppercase tracking-widest">Quick Links</div>

              <div className="flex flex-col gap-2.5">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target={social.label !== 'Email' ? '_blank' : undefined}
                    rel="noreferrer"
                    className={cn(
                      'flex items-center justify-between p-3.5 rounded-xl border transition-all duration-300 group',
                      'glass border-[#111111]/8 hover:border-[#111111]/20 hover:bg-[#111111]/5'
                    )}
                    aria-label={`Visit ${social.label}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[#6b6b6b] group-hover:text-[#111111] transition-colors">
                        {ICON_MAP[social.icon]}
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-[#111111]">{social.label}</div>
                        {social.username && (
                          <div className="text-[11px] font-mono text-[#6b6b6b]">{social.username}</div>
                        )}
                      </div>
                    </div>
                    <ArrowUpRight
                      size={16}
                      className="text-[#6b6b6b] group-hover:text-[#111111] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                    />
                  </a>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <MagneticButton
            onClick={handleCopyEmail}
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
          <span>Designed &amp; developed with care.</span>
        </div>
      </div>
    </section>
  )
}

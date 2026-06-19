'use client'

import React, { useState, useRef } from 'react'
import { GlassCard } from './GlassCard'
import { MagneticButton } from './MagneticButton'
import { Send, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

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

export function ContactForm() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', subject: '', message: '' })
  const [formStatus, setFormStatus] = useState<FormStatus>({ state: 'idle', message: '' })
  const formRef = useRef<HTMLFormElement>(null)

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
    <GlassCard className="p-6 sm:p-8 border-[#111111]/8 h-full" hoverEffect={false}>
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
  )
}

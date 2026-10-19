'use client'

import React, { useState, useRef } from 'react'
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

interface FormData {
  name: string
  email: string
  message: string
  honeypot: string // hidden honeypot
}

export function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    honeypot: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState<string>('')
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Bot trap: if honeypot is filled, simulate success silently without hitting API
    if (form.honeypot) {
      setStatus('success')
      setStatusMessage('Message transmitted successfully!')
      return
    }

    setStatus('loading')
    setStatusMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: 'Signal from Portfolio Form',
          message: form.message,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message.')
      }

      setStatus('success')
      setStatusMessage('Message sent successfully! I will get back to you shortly.')
      setForm({ name: '', email: '', message: '', honeypot: '' })
      if (formRef.current) formRef.current.reset()
    } catch (err) {
      setStatus('error')
      setStatusMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <div className="border-3 border-[#121212] dark:border-[#FAF7F0] bg-[#FAF7F0] dark:bg-[#181818] p-6 sm:p-8 shadow-[8px_8px_0px_0px_#121212] dark:shadow-[8px_8px_0px_0px_#000000]">
      <div className="flex items-center justify-between border-b-2 border-[#121212] dark:border-[#FAF7F0] pb-3 mb-6 font-mono text-xs">
        <span className="font-bold uppercase tracking-wider text-[#FF5C35]">TRANSMIT // MESSAGE</span>
        <span className="text-[#555555] dark:text-[#A3A3A3] uppercase">ENCRYPTED_POST</span>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Honeypot field (hidden for human users) */}
        <input
          type="text"
          name="website_hp"
          value={form.honeypot}
          onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        {/* Name & Email Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="contact-name"
              className="block font-mono text-xs font-bold uppercase tracking-wider text-[#121212] dark:text-[#FAF7F0] mb-1.5"
            >
              Name <span className="text-[#FF5C35]">*</span>
            </label>
            <input
              id="contact-name"
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Ada Lovelace"
              className="w-full px-3.5 py-2.5 border-2.5 border-[#121212] dark:border-[#FAF7F0] bg-[#FFFFFF] dark:bg-[#222222] text-[#121212] dark:text-[#FAF7F0] font-mono text-xs placeholder:text-[#888888] focus:outline-none focus:bg-[#FAF7F0] dark:focus:bg-[#282828] shadow-[2px_2px_0px_0px_#121212]"
            />
          </div>

          <div>
            <label
              htmlFor="contact-email"
              className="block font-mono text-xs font-bold uppercase tracking-wider text-[#121212] dark:text-[#FAF7F0] mb-1.5"
            >
              Email <span className="text-[#FF5C35]">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="ada@example.com"
              className="w-full px-3.5 py-2.5 border-2.5 border-[#121212] dark:border-[#FAF7F0] bg-[#FFFFFF] dark:bg-[#222222] text-[#121212] dark:text-[#FAF7F0] font-mono text-xs placeholder:text-[#888888] focus:outline-none focus:bg-[#FAF7F0] dark:focus:bg-[#282828] shadow-[2px_2px_0px_0px_#121212]"
            />
          </div>
        </div>

        {/* Message Box */}
        <div>
          <label
            htmlFor="contact-message"
            className="block font-mono text-xs font-bold uppercase tracking-wider text-[#121212] dark:text-[#FAF7F0] mb-1.5"
          >
            Message <span className="text-[#FF5C35]">*</span>
          </label>
          <textarea
            id="contact-message"
            required
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Tell me about your project, engineering role, or technical challenge..."
            className="w-full px-3.5 py-2.5 border-2.5 border-[#121212] dark:border-[#FAF7F0] bg-[#FFFFFF] dark:bg-[#222222] text-[#121212] dark:text-[#FAF7F0] font-mono text-xs placeholder:text-[#888888] focus:outline-none focus:bg-[#FAF7F0] dark:focus:bg-[#282828] shadow-[2px_2px_0px_0px_#121212] resize-none"
          />
        </div>

        {/* Status Notifications */}
        {statusMessage && (
          <div
            role="alert"
            className={`border-2 p-3.5 font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              status === 'success'
                ? 'border-[#121212] bg-[#A3E635] text-[#121212] shadow-[3px_3px_0px_0px_#121212]'
                : 'border-red-600 bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-300'
            }`}
          >
            <div className="flex items-center gap-2">
              {status === 'success' ? <CheckCircle2 size={16} className="shrink-0" /> : <AlertCircle size={16} className="shrink-0" />}
              <span>{statusMessage}</span>
            </div>
            {status === 'error' && (
              <a
                href={`mailto:mukulburoli@gmail.com?subject=${encodeURIComponent(
                  form.name ? `Message from ${form.name}` : 'Portfolio Contact'
                )}&body=${encodeURIComponent(form.message)}`}
                className="underline font-bold text-xs uppercase hover:opacity-80 shrink-0"
              >
                Send via Mail Client →
              </a>
            )}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="brutal-btn mt-2 flex items-center justify-center gap-2 bg-[#FF5C35] text-[#FAF7F0] py-3.5 px-6 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider cursor-pointer disabled:opacity-60 disabled:cursor-wait"
        >
          {status === 'loading' ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Transmitting...</span>
            </>
          ) : (
            <>
              <Send size={16} />
              <span>Send Signal</span>
            </>
          )}
        </button>
      </form>
    </div>
  )
}

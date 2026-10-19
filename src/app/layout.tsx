import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter, Outfit, Fira_Code } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
})

import './globals.css'
import { Providers } from './providers'
import { NavBar } from '@/components/ui/NavBar'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { ClickSoundListener } from '@/components/ui/ClickSoundListener'
import { CompileTransition } from '@/components/ui/CompileTransition'
import { RealisticCurtain } from '@/components/ui/RealisticCurtain'
import { profile } from '@/data/profile'
import { ThemeProvider } from '@/context/ThemeContext'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mukul-kumar.dev'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — Software Engineer`,
    template: `%s | ${profile.name}`,
  },
  description: profile.shortBio,
  keywords: [
    'Software Engineer',
    'Backend Engineer',
    'AI Applications',
    'C++',
    'Java',
    'Spring Boot',
    'Python',
    'FastAPI',
    'TypeScript',
    'Node.js',
    'Jest',
    'Docker',
    'SOME/IP',
    'Protocol Buffers',
    'Budibase',
    'IIT Hyderabad',
    profile.name,
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: `${profile.name} — Software Engineer Portfolio`,
    title: `${profile.name} — Software Engineer | Backend Development & AI Applications`,
    description: profile.shortBio,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${profile.name} — Software Engineer`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.name} — Software Engineer | Backend Development & AI Applications`,
    description: profile.shortBio,
    creator: '@mukulburoli',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  url: siteUrl,
  jobTitle: 'Software Engineer | Backend Development & AI Applications',
  description: profile.shortBio,
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Indian Institute of Technology Hyderabad',
  },
  sameAs: [
    'https://github.com/MUKULBUROL',
    'https://www.linkedin.com/in/mukul-kumar-036587254/',
    'https://leetcode.com/u/mukul_kumar200/',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${firaCode.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
<Script
          id="json-ld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#FAF7F0" />
        <Script
          id="theme-initializer"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full bg-[#FAF7F0] dark:bg-[#121212] text-[#121212] dark:text-[#FAF7F0] overflow-x-hidden selection:bg-[#FF5C35] selection:text-[#FAF7F0]">
        <ThemeProvider>
          <Providers>
            {/* Desktop Custom Cursor */}
            <CustomCursor />

            {/* Global Rotating Musical Click Sound Listener */}
            <ClickSoundListener />

            {/* Initial Realistic Theatrical Curtain Premiere Reveal */}
            <RealisticCurtain />

            {/* Navigation Transition Compiler Overlay */}
            <CompileTransition />

            {/* Global Fixed Navigation Bar */}
            <NavBar />

            {/* Main Application Container */}
            <main id="main-content">{children}</main>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}

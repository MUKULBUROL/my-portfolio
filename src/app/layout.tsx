import type { Metadata } from 'next'
import { Inter, Outfit, Fira_Code } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { NavBar } from '@/components/ui/NavBar'
import { profile } from '@/data/profile'

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://alexchen.dev'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.headline}`,
    template: `%s | ${profile.name}`,
  },
  description: profile.shortBio,
  keywords: [
    'AI Engineer',
    'Software Engineer',
    'Full Stack Developer',
    'Next.js',
    'React',
    'TypeScript',
    'LangChain',
    'LLM',
    profile.name,
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: `${profile.name} — Engineering Portfolio`,
    title: `${profile.name} — ${profile.headline}`,
    description: profile.shortBio,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${profile.name} — ${profile.headline}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.name} — ${profile.headline}`,
    description: profile.shortBio,
    creator: '@alexchen',
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
  jobTitle: profile.headline,
  description: profile.shortBio,
  sameAs: [
    'https://github.com/alexchen',
    'https://linkedin.com/in/alexchen',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${firaCode.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#f5efe8" />
      </head>
      <body className="min-h-full bg-[#f5efe8] text-[#111111] overflow-x-hidden">
        <div className="film-grain-overlay" aria-hidden="true" />
        <Providers>
          <NavBar />
          <main id="main-content">{children}</main>
        </Providers>
      </body>
    </html>
  )
}

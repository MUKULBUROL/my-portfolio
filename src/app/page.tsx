import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Projects } from '@/components/sections/Projects'
import { SystemDesign } from '@/components/sections/SystemDesign'
import { Journey } from '@/components/sections/Journey'
import { ContactHub } from '@/components/sections/ContactHub'

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Section divider */}
      <div className="section-divider mx-auto max-w-5xl" aria-hidden="true" />

      <About />

      <div className="section-divider mx-auto max-w-5xl" aria-hidden="true" />

      <Projects />

      <div className="section-divider mx-auto max-w-5xl" aria-hidden="true" />

      <SystemDesign />

      <div className="section-divider mx-auto max-w-5xl" aria-hidden="true" />

      <Journey />

      <div className="section-divider mx-auto max-w-5xl" aria-hidden="true" />

      <ContactHub />
    </>
  )
}

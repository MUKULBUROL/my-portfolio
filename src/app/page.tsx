import { Hero } from '@/components/sections/Hero'
import { SelectedWork } from '@/components/sections/SelectedWork'
import { Pause } from '@/components/sections/Pause'
import { HowIThink } from '@/components/sections/HowIThink'
import { MyJourney } from '@/components/sections/MyJourney'
import { WhatImBuildingNext } from '@/components/sections/WhatImBuildingNext'
import { Connect } from '@/components/sections/Connect'

/**
 * Section order optimised for both recruiter and editorial goals:
 *  1. Hero           — Immediate identity + aesthetic hook
 *  2. SelectedWork   — Projects first (recruiter-critical in <30s scan)
 *  3. Pause          — Typographic breath / philosophy beat
 *  4. HowIThink      — Systems architecture mindset
 *  5. MyJourney      — Narrative chapters + full experience record
 *  6. BuildingNext   — Research / future signal
 *  7. Connect        — CTA
 */
export default function HomePage() {
  return (
    <>
      <Hero />

      <SelectedWork />

      <div className="section-divider mx-auto max-w-5xl" aria-hidden="true" />

      <Pause />

      <div className="section-divider mx-auto max-w-5xl" aria-hidden="true" />

      <HowIThink />

      <div className="section-divider mx-auto max-w-5xl" aria-hidden="true" />

      <MyJourney />

      <div className="section-divider mx-auto max-w-5xl" aria-hidden="true" />

      <WhatImBuildingNext />

      <div className="section-divider mx-auto max-w-5xl" aria-hidden="true" />

      <Connect />
    </>
  )
}

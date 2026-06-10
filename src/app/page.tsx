import { Hero } from '@/components/sections/Hero'
import { Pause } from '@/components/sections/Pause'
import { MyJourney } from '@/components/sections/MyJourney'
import { HowIThink } from '@/components/sections/HowIThink'
import { SelectedWork } from '@/components/sections/SelectedWork'
import { WhatImBuildingNext } from '@/components/sections/WhatImBuildingNext'
import { Connect } from '@/components/sections/Connect'

export default function HomePage() {
  return (
    <>
      <Hero />

      <div className="section-divider mx-auto max-w-5xl" aria-hidden="true" />

      <Pause />

      <div className="section-divider mx-auto max-w-5xl" aria-hidden="true" />

      <MyJourney />

      <div className="section-divider mx-auto max-w-5xl" aria-hidden="true" />

      <HowIThink />

      <div className="section-divider mx-auto max-w-5xl" aria-hidden="true" />

      <SelectedWork />

      <div className="section-divider mx-auto max-w-5xl" aria-hidden="true" />

      <WhatImBuildingNext />

      <div className="section-divider mx-auto max-w-5xl" aria-hidden="true" />

      <Connect />
    </>
  )
}

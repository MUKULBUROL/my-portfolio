import React from 'react'

export function BackgroundAurora() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-bg-dark pointer-events-none select-none">
      {/* Purple radial aurora in top-left */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full aurora-blur" />
      
      {/* Cyan radial aurora in bottom-right */}
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full aurora-blur-cyan" />
      
      {/* Dark overlay mask to blend gradients into background */}
      <div 
        className="absolute inset-0 bg-no-repeat" 
        style={{
          background: 'radial-gradient(circle at center, transparent 20%, #050816 80%)'
        }}
      />
      
      {/* Technical grid mapping */}
      <div className="absolute inset-0 tech-grid opacity-30" />
    </div>
  )
}

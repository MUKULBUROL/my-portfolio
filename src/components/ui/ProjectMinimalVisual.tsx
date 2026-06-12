'use client'

import React from 'react'

export function ProjectMinimalVisual({ projectId }: { projectId: string }) {
  if (projectId === 'documind-ai') {
    return (
      <svg viewBox="0 0 520 260" className="w-full max-w-2xl h-auto stroke-[#111111]/30 fill-none font-mono text-[9px] mx-auto select-none">
        {/* Grid background */}
        <pattern id="grid-dm" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.8" fill="#111111" fillOpacity="0.08" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid-dm)" className="pointer-events-none" />

        {/* PDF Upload */}
        <rect x="10" y="100" width="65" height="55" rx="3" stroke="#111111" strokeWidth="1.5" className="fill-[#fcfaf7]" />
        <text x="42" y="122" textAnchor="middle" className="fill-[#111111] font-bold text-[8px]">PDF</text>
        <text x="42" y="134" textAnchor="middle" className="fill-[#6b6b6b] text-[7px]">Upload</text>

        <path d="M 75 127 L 105 127" stroke="#111111" strokeWidth="1" />

        {/* PyMuPDF Extractor */}
        <rect x="105" y="92" width="80" height="70" rx="3" stroke="#111111" strokeWidth="1.5" className="fill-[#fcfaf7]" />
        <text x="145" y="118" textAnchor="middle" className="fill-[#111111] font-bold text-[8px]">PyMuPDF</text>
        <text x="145" y="130" textAnchor="middle" className="fill-[#6b6b6b] text-[7px]">Text Extract</text>
        <text x="145" y="142" textAnchor="middle" className="fill-[#111111]/60 text-[7px]">+ OCR</text>

        {/* Split paths */}
        <path d="M 185 110 L 220 80" stroke="#111111" strokeWidth="1" />
        <path d="M 185 110 L 220 110" stroke="#111111" strokeWidth="1" />
        <path d="M 185 145 L 220 175" stroke="#111111" strokeWidth="1" />

        {/* Gemini AI */}
        <rect x="220" y="55" width="80" height="50" rx="3" stroke="#7C3AED" strokeWidth="1.5" className="fill-[#f5f0ff]" />
        <text x="260" y="78" textAnchor="middle" className="fill-[#7C3AED] font-bold text-[8px]">Gemini</text>
        <text x="260" y="90" textAnchor="middle" className="fill-[#6b6b6b] text-[7px]">AI Analysis</text>

        {/* FAISS Vector Search */}
        <rect x="220" y="95" width="80" height="30" rx="3" stroke="#22C55E" strokeWidth="1.5" className="fill-[#f0fdf4]" />
        <text x="260" y="114" textAnchor="middle" className="fill-[#22C55E] font-bold text-[8px]">FAISS</text>
        <text x="260" y="123" textAnchor="middle" className="fill-[#6b6b6b] text-[6px]">Semantic Search</text>

        {/* Azure TTS */}
        <rect x="220" y="155" width="80" height="50" rx="3" stroke="#06B6D4" strokeWidth="1.5" className="fill-[#f0fdfa]" />
        <text x="260" y="178" textAnchor="middle" className="fill-[#06B6D4] font-bold text-[8px]">Azure TTS</text>
        <text x="260" y="190" textAnchor="middle" className="fill-[#6b6b6b] text-[7px]">Audio Output</text>

        {/* Converge to React UI */}
        <path d="M 300 80 L 360 110" stroke="#111111" strokeWidth="1" />
        <path d="M 300 110 L 360 110" stroke="#111111" strokeWidth="1" />
        <path d="M 300 180 L 360 110" stroke="#111111" strokeWidth="1" />

        {/* React Frontend */}
        <rect x="360" y="80" width="80" height="60" rx="3" stroke="#111111" strokeWidth="1.5" className="fill-[#fcfaf7]" />
        <text x="400" y="105" textAnchor="middle" className="fill-[#111111] font-bold text-[9px]">React</text>
        <text x="400" y="117" textAnchor="middle" className="fill-[#6b6b6b] text-[7px]">Frontend UI</text>
        <text x="400" y="128" textAnchor="middle" className="fill-[#111111]/60 text-[7px]">Tailwind + Framer</text>

        {/* Docker badge */}
        <rect x="380" y="160" width="60" height="22" rx="11" stroke="#111111" strokeWidth="1" className="fill-[#111111]" />
        <text x="410" y="175" textAnchor="middle" className="fill-[#fcfaf7] font-bold text-[7px]">DOCKER</text>

        {/* FastAPI backend label */}
        <rect x="115" y="180" width="70" height="20" rx="3" stroke="#111111" strokeWidth="1" className="fill-[#111111]" />
        <text x="150" y="194" textAnchor="middle" className="fill-[#fcfaf7] font-bold text-[7px]">FastAPI</text>
      </svg>
    )
  }

  if (projectId === 'smart-expense-splitter') {
    return (
      <svg viewBox="0 0 520 260" className="w-full max-w-2xl h-auto stroke-[#111111]/30 fill-none font-mono text-[9px] mx-auto select-none">
        <pattern id="grid-es" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.8" fill="#111111" fillOpacity="0.08" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid-es)" className="pointer-events-none" />

        {/* Users */}
        <circle cx="40" cy="80" r="18" stroke="#111111" strokeWidth="1.5" className="fill-[#fcfaf7]" />
        <text x="40" y="84" textAnchor="middle" className="fill-[#111111] font-bold text-[8px]">User A</text>

        <circle cx="40" cy="180" r="18" stroke="#111111" strokeWidth="1.5" className="fill-[#fcfaf7]" />
        <text x="40" y="184" textAnchor="middle" className="fill-[#111111] font-bold text-[8px]">User B</text>

        <circle cx="120" cy="130" r="18" stroke="#111111" strokeWidth="1.5" className="fill-[#fcfaf7]" />
        <text x="120" y="134" textAnchor="middle" className="fill-[#111111] font-bold text-[8px]">User C</text>

        <path d="M 58 80 L 90 115" stroke="#111111" strokeWidth="1" />
        <path d="M 58 180 L 90 145" stroke="#111111" strokeWidth="1" />
        <path d="M 138 130 L 170 130" stroke="#111111" strokeWidth="1" />

        {/* Spring Boot API */}
        <rect x="170" y="95" width="90" height="70" rx="3" stroke="#22C55E" strokeWidth="1.5" className="fill-[#f0fdf4]" />
        <text x="215" y="122" textAnchor="middle" className="fill-[#22C55E] font-bold text-[9px]">Spring Boot</text>
        <text x="215" y="134" textAnchor="middle" className="fill-[#6b6b6b] text-[7px]">REST API</text>
        <text x="215" y="146" textAnchor="middle" className="fill-[#111111]/60 text-[7px]">Java 17</text>

        <path d="M 260 130 L 290 130" stroke="#111111" strokeWidth="1" />

        {/* MySQL DB */}
        <ellipse cx="320" cy="115" rx="35" ry="12" stroke="#111111" strokeWidth="1.5" className="fill-[#fcfaf7]" />
        <rect x="285" y="115" width="70" height="35" stroke="#111111" strokeWidth="1.5" className="fill-[#fcfaf7]" />
        <ellipse cx="320" cy="150" rx="35" ry="12" stroke="#111111" strokeWidth="1.5" className="fill-[#fcfaf7]" />
        <text x="320" y="138" textAnchor="middle" className="fill-[#111111] font-bold text-[8px]">MySQL</text>
        <text x="320" y="148" textAnchor="middle" className="fill-[#6b6b6b] text-[6px]">Normalized</text>

        <path d="M 355 130 L 385 130" stroke="#111111" strokeWidth="1" />

        {/* Settlement Algorithm */}
        <rect x="385" y="95" width="100" height="70" rx="3" stroke="#7C3AED" strokeWidth="1.5" className="fill-[#f5f0ff]" />
        <text x="435" y="118" textAnchor="middle" className="fill-[#7C3AED] font-bold text-[8px]">GREEDY</text>
        <text x="435" y="130" textAnchor="middle" className="fill-[#7C3AED] font-bold text-[8px]">SETTLEMENT</text>
        <text x="435" y="142" textAnchor="middle" className="fill-[#6b6b6b] text-[7px]">Min Transactions</text>
        <text x="435" y="154" textAnchor="middle" className="fill-[#111111]/60 text-[7px]">Optimal Matching</text>

        {/* Output arrows */}
        <path d="M 435 165 L 435 200" stroke="#111111" strokeWidth="1" />
        <rect x="400" y="200" width="70" height="24" rx="3" stroke="#111111" strokeWidth="1" className="fill-[#111111]" />
        <text x="435" y="216" textAnchor="middle" className="fill-[#fcfaf7] font-bold text-[7px]">SETTLED</text>
      </svg>
    )
  }

  if (projectId === 'graph-recommendation-system') {
    return (
      <svg viewBox="0 0 520 260" className="w-full max-w-2xl h-auto stroke-[#111111]/30 fill-none font-mono text-[9px] mx-auto select-none">
        <pattern id="grid-gr" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.8" fill="#111111" fillOpacity="0.08" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid-gr)" className="pointer-events-none" />

        {/* User nodes */}
        <circle cx="60" cy="60" r="20" stroke="#7C3AED" strokeWidth="1.5" className="fill-[#f5f0ff]" />
        <text x="60" y="64" textAnchor="middle" className="fill-[#7C3AED] font-bold text-[8px]">U1</text>

        <circle cx="60" cy="180" r="20" stroke="#7C3AED" strokeWidth="1.5" className="fill-[#f5f0ff]" />
        <text x="60" y="184" textAnchor="middle" className="fill-[#7C3AED] font-bold text-[8px]">U2</text>

        <circle cx="150" cy="120" r="20" stroke="#7C3AED" strokeWidth="1.5" className="fill-[#f5f0ff]" />
        <text x="150" y="124" textAnchor="middle" className="fill-[#7C3AED] font-bold text-[8px]">U3</text>

        {/* Weighted edges */}
        <line x1="78" y1="72" x2="132" y2="112" stroke="#111111" strokeWidth="1" />
        <text x="100" y="85" textAnchor="middle" className="fill-[#6b6b6b] text-[6px]">0.92</text>

        <line x1="78" y1="172" x2="132" y2="128" stroke="#111111" strokeWidth="1" />
        <text x="100" y="162" textAnchor="middle" className="fill-[#6b6b6b] text-[6px]">0.87</text>

        <line x1="60" y1="80" x2="60" y2="160" stroke="#111111" strokeWidth="1" strokeDasharray="4,3" />
        <text x="52" y="124" textAnchor="middle" className="fill-[#6b6b6b] text-[6px]">0.78</text>

        {/* Item nodes */}
        <rect x="220" y="40" width="55" height="35" rx="3" stroke="#22C55E" strokeWidth="1.5" className="fill-[#f0fdf4]" />
        <text x="247" y="62" textAnchor="middle" className="fill-[#22C55E] font-bold text-[7px]">Item A</text>

        <rect x="220" y="100" width="55" height="35" rx="3" stroke="#22C55E" strokeWidth="1.5" className="fill-[#f0fdf4]" />
        <text x="247" y="122" textAnchor="middle" className="fill-[#22C55E] font-bold text-[7px]">Item B</text>

        <rect x="220" y="165" width="55" height="35" rx="3" stroke="#22C55E" strokeWidth="1.5" className="fill-[#f0fdf4]" />
        <text x="247" y="187" textAnchor="middle" className="fill-[#22C55E] font-bold text-[7px]">Item C</text>

        {/* User-Item edges */}
        <line x1="78" y1="52" x2="220" y2="55" stroke="#111111" strokeWidth="1" />
        <line x1="168" y1="115" x2="220" y2="115" stroke="#111111" strokeWidth="1" />
        <line x1="78" y1="188" x2="220" y2="180" stroke="#111111" strokeWidth="1" />

        {/* Similarity Engine */}
        <path d="M 275 60 L 320 100" stroke="#111111" strokeWidth="1" />
        <path d="M 275 120 L 320 120" stroke="#111111" strokeWidth="1" />
        <path d="M 275 180 L 320 140" stroke="#111111" strokeWidth="1" />

        <rect x="320" y="80" width="90" height="80" rx="3" stroke="#F59E0B" strokeWidth="1.5" className="fill-[#fffbeb]" />
        <text x="365" y="105" textAnchor="middle" className="fill-[#F59E0B] font-bold text-[8px]">SIMILARITY</text>
        <text x="365" y="117" textAnchor="middle" className="fill-[#6b6b6b] text-[7px]">Cosine</text>
        <text x="365" y="128" textAnchor="middle" className="fill-[#6b6b6b] text-[7px]">Jaccard · Pearson</text>
        <text x="365" y="139" textAnchor="middle" className="fill-[#6b6b6b] text-[7px]">Euclidean</text>

        <path d="M 410 120 L 440 120" stroke="#111111" strokeWidth="1" />

        {/* Priority Queue */}
        <rect x="440" y="95" width="70" height="50" rx="3" stroke="#111111" strokeWidth="1.5" className="fill-[#fcfaf7]" />
        <text x="475" y="118" textAnchor="middle" className="fill-[#111111] font-bold text-[8px]">PRIORITY</text>
        <text x="475" y="130" textAnchor="middle" className="fill-[#111111] font-bold text-[8px]">QUEUE</text>
        <text x="475" y="140" textAnchor="middle" className="fill-[#6b6b6b] text-[6px]">Top-K</text>

        {/* C++ badge */}
        <rect x="340" y="210" width="50" height="20" rx="10" stroke="#111111" strokeWidth="1" className="fill-[#111111]" />
        <text x="365" y="224" textAnchor="middle" className="fill-[#fcfaf7] font-bold text-[7px]">C++17</text>

        <text x="260" y="245" textAnchor="middle" className="fill-[#6b6b6b] text-[8px] font-semibold">Sub-millisecond latency</text>
      </svg>
    )
  }

  // Fallback — generic system diagram
  return (
    <svg viewBox="0 0 500 240" className="w-full max-w-2xl h-auto stroke-[#111111]/30 fill-none font-mono text-[9px] mx-auto select-none">
      <pattern id="grid-fb" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="0.8" fill="#111111" fillOpacity="0.08" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#grid-fb)" className="pointer-events-none" />

      <rect x="20" y="95" width="70" height="50" rx="3" stroke="#111111" strokeWidth="1.5" className="fill-[#fcfaf7]" />
      <text x="55" y="124" textAnchor="middle" className="fill-[#111111] font-bold">Client</text>

      <path d="M 90 120 L 150 120" stroke="#111111" strokeWidth="1" />

      <rect x="150" y="85" width="100" height="70" rx="3" stroke="#111111" strokeWidth="1.5" className="fill-[#fcfaf7]" />
      <text x="200" y="115" textAnchor="middle" className="fill-[#111111] font-bold">SERVICE</text>
      <text x="200" y="128" textAnchor="middle" className="fill-[#6b6b6b] text-[8px]">Business Logic</text>

      <path d="M 250 120 L 310 120" stroke="#111111" strokeWidth="1" />

      <ellipse cx="340" cy="105" rx="30" ry="10" stroke="#111111" className="fill-[#fcfaf7]" />
      <rect x="310" y="105" width="60" height="30" stroke="#111111" className="fill-[#fcfaf7]" />
      <ellipse cx="340" cy="135" rx="30" ry="10" stroke="#111111" className="fill-[#fcfaf7]" />
      <text x="340" y="124" textAnchor="middle" className="fill-[#111111] font-bold text-[8px]">Database</text>

      <path d="M 370 120 L 420 120" stroke="#111111" strokeWidth="1" />

      <rect x="420" y="95" width="60" height="50" rx="3" stroke="#111111" className="fill-[#fcfaf7]" />
      <text x="450" y="124" textAnchor="middle" className="fill-[#111111] font-semibold">Cache</text>
    </svg>
  )
}

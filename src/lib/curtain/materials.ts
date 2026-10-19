// src/lib/curtain/materials.ts
/**
 * Configurable Fabric Material Definitions
 *
 * Primary Art Direction: Direction B — Burnt Orange Canvas.
 * Configurable presets for Burgundy Velvet and Charcoal Canvas.
 */

export interface FabricMaterial {
  id: 'burnt-orange' | 'burgundy' | 'charcoal'
  name: string
  baseHex: string
  shadowHex: string
  highlightHex: string
  uiTextHex: string
  // Normalized RGB [0..1] for WebGL uniforms
  baseRgb: [number, number, number]
  shadowRgb: [number, number, number]
  highlightRgb: [number, number, number]
  uiTextRgb: [number, number, number]
  foldCountDesktop: number
  foldCountMobile: number
}

function hexToRgb01(hex: string): [number, number, number] {
  const clean = hex.replace('#', '')
  const r = parseInt(clean.substring(0, 2), 16) / 255
  const g = parseInt(clean.substring(2, 4), 16) / 255
  const b = parseInt(clean.substring(4, 6), 16) / 255
  return [r, g, b]
}

export const FABRIC_MATERIALS: Record<FabricMaterial['id'], FabricMaterial> = {
  'burnt-orange': {
    id: 'burnt-orange',
    name: 'Burnt Orange Canvas',
    baseHex: '#B94D27',
    shadowHex: '#582313',
    highlightHex: '#D87945',
    uiTextHex: '#FFF7E8',
    baseRgb: hexToRgb01('#B94D27'),
    shadowRgb: hexToRgb01('#582313'),
    highlightRgb: hexToRgb01('#D87945'),
    uiTextRgb: hexToRgb01('#FFF7E8'),
    foldCountDesktop: 8,
    foldCountMobile: 5,
  },
  burgundy: {
    id: 'burgundy',
    name: 'Burgundy Velvet',
    baseHex: '#781424',
    shadowHex: '#38060E',
    highlightHex: '#A82C3E',
    uiTextHex: '#FFF7E8',
    baseRgb: hexToRgb01('#781424'),
    shadowRgb: hexToRgb01('#38060E'),
    highlightRgb: hexToRgb01('#A82C3E'),
    uiTextRgb: hexToRgb01('#FFF7E8'),
    foldCountDesktop: 8,
    foldCountMobile: 5,
  },
  charcoal: {
    id: 'charcoal',
    name: 'Charcoal Canvas',
    baseHex: '#2B2B2E',
    shadowHex: '#141416',
    highlightHex: '#45454C',
    uiTextHex: '#F5F5F7',
    baseRgb: hexToRgb01('#2B2B2E'),
    shadowRgb: hexToRgb01('#141416'),
    highlightRgb: hexToRgb01('#45454C'),
    uiTextRgb: hexToRgb01('#F5F5F7'),
    foldCountDesktop: 8,
    foldCountMobile: 5,
  },
}

export const DEFAULT_FABRIC_MATERIAL: FabricMaterial = FABRIC_MATERIALS['burnt-orange']

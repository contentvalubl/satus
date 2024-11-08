import { useMediaQuery } from '@darkroom.engineering/hamo'
import { useOrchestra } from 'libs/orchestra/react'
import variables from 'styles/config.js'

export function useDeviceDetection() {
  const breakpoint = variables.breakpoints.mobile.replace('px', '')

  const { webgl } = useOrchestra()

  const isMobile = useMediaQuery(`(max-width: ${breakpoint - 1}px)`)
  const isDesktop = useMediaQuery(`(min-width: ${breakpoint}px)`)
  const isReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const isWebGL = isDesktop && !isReducedMotion && webgl
  // TODO: const isLowPowerMode

  return { isMobile, isDesktop, isReducedMotion, isWebGL }
}

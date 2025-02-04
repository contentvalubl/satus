import { writeFile } from 'node:fs/promises'

import { colors, themes } from '../colors.mjs'
import { breakpoints, headerHeight, layout, screens } from '../layout.mjs'
import { fontFamilies, typeStyles } from '../typography.mjs'

import { generateBase } from './generate-base.mjs'
import { generateFluid } from './generate-fluid.mjs'

const base = generateBase({
  breakpoints,
  colors,
  fontFamilies,
  headerHeight,
  layout,
  screens,
  themes,
  typeStyles,
})

const fluid = generateFluid()

const banner = `/*
 * THIS FILE IS GENERATED BY tailwind.mjs
 * DO NOT EDIT IT DIRECTLY.
 */`

const parts = [banner, base, fluid]

await writeFile('./styles/css/tailwind.css', parts.join('\n\n'), 'utf-8')

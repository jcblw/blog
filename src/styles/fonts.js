import { generateStyle } from './helpers'

const sizes = {
  xs: '12px',
  s: '16px',
  m: '24px',
  l: '32px',
  xl: '40px',
}

const weights = {
  regular: 'regular',
  italic: 'italic',
  bold: 'bold',
  boldItalic: 'bold italic',
}

export const fontSize = Object.keys(sizes).reduce(
  generateStyle('fontSize', sizes),
  {}
)

export const fontWeight = Object.keys(weights).reduce(
  generateStyle('fontWeight', weights),
  {}
)

import { generateStyle } from './helpers'

const names = {
  // older colors
  outerSpace: '#353D42',
  mischka: '#EAE2EB',
  cornFlower: '#7297F1',
  abbey: '#515A60',

  // new colors
  masala: '#3C3736',
  emperor: '#585250',
  java: '#11C2AF',
  polar: '#E8FAF8',
  blackSqueez: '#F1FAF9',
  white: '#FFF',
}

const keys = Object.keys(names)

export const backgroundColor = keys.reduce(
  generateStyle('backgroundColor', names),
  {}
)

export const color = keys.reduce(generateStyle('color', names), {})

export const sizes = {
  xs: '12px',
  s: '16px',
  m: '24px',
  l: '32px',
  xl: '40px',
}
export const weights = {
  regular: 300,
  italic: 300,
  bold: 400,
  boldItalic: 400,
}

export const font = {
  header1: {
    fontSize: sizes.xl,
    fontWeight: weights.bold,
  },
  header2: {
    fontSize: sizes.l,
    fontWeight: weights.regular,
  },
  header3: {
    fontSize: sizes.l,
    fontWeight: weights.bold,
  },
  header4: {
    fontSize: sizes.m,
    fontWeight: weights.bold,
  },
  header5: {
    fontSize: sizes.m,
    fontWeight: weights.regular,
  },
  header6: {
    fontSize: sizes.s,
    fontWeight: weights.bold,
  },
  paragraph: {
    fontSize: sizes.s,
    fontWeight: weights.regular,
    lineHeight: '2em',
  },
}

import { makeStyles } from '@mujo/box'
import { names } from './colors'
import { sizes, weights, font } from './fonts'
import { spacing } from './spacing'

export const styleGuide = {
  // colors
  color: makeStyles('color', names),
  backgroundColor: makeStyles('backgroundColor', names),

  // fonts
  font,
  fontSize: makeStyles('fontSize', sizes),
  fontWeight: makeStyles('fontWeight', weights),

  // spacing
  marginBottom: makeStyles('marginBottom', spacing),
  marginTop: makeStyles('marginTop', spacing),
  marginLeft: makeStyles('marginLeft', spacing),
  marginRight: makeStyles('marginRight', spacing),
  margin: makeStyles('margin', spacing),
  paddingBottom: makeStyles('paddingBottom', spacing),
  paddingTop: makeStyles('paddingTop', spacing),
  paddingLeft: makeStyles('paddingLeft', spacing),
  paddingRight: makeStyles('paddingRight', spacing),
  padding: makeStyles('padding', spacing),

  // Border radius
  borderRadius: makeStyles('borderRadius', spacing),

  // utils
  display: {
    inlineFlex: { display: 'inline-flex' },
    flex: { display: 'flex' },
    block: { display: 'block' },
    table: { display: 'table' },
  },

  maxWidth: {
    '100%': { maxWidth: '100%' },
    '300px': { maxWidth: '300px' },
    '600px': { maxWidth: '600px' },
    '720px': { maxWidth: '720px' },
  },

  textOverflow: {
    ellipsis: { textOverflow: 'ellipsis' },
    clip: { textOverflow: 'clip' },
    none: { textOverflow: 'none' },
    fade: { textOverflow: 'none' },
  },

  overflow: {
    hidden: { overflow: 'hidden' },
    visible: { overflow: 'visible' },
    scroll: { overflow: 'scroll' },
  },

  position: {
    absolute: { position: 'absolute' },
    relative: { position: 'relative' },
    static: { position: 'static' },
    sticky: { position: 'sticky' },
  },

  layer: {
    0: { zIndex: 0 },
    1: { zIndex: 10 },
    2: { zIndex: 100 },
  },

  textDecoration: {
    none: { textDecoration: 'none' },
    underline: { textDecoration: 'underline' },
  },

  width: {
    '100px': { width: '100px' },
    '60px': { width: '60px' },
  },

  height: {
    '1px': { height: '1px' },
    '100px': { height: '100px' },
    '60px': { height: '60px' },
  },
}

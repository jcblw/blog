import { css } from '@emotion/core'

export const maxWidth = {
  '100%': css({ maxWidth: '100%' }),
  '300px': css({ maxWidth: '300px' }),
  '700px': css({ maxWidth: '700px' }),
}

export const textOverflow = {
  ellipsis: css({ textOverflow: 'ellipsis' }),
  clip: css({ textOverflow: 'clip' }),
  none: css({ textOverflow: 'none' }),
  fade: css({ textOverflow: 'none' }),
}

export const overflow = {
  hidden: css({ overflow: 'hidden' }),
  visible: css({ overflow: 'visible' }),
  scroll: css({ overflow: 'scroll' }),
}

export const alignItems = { baseline: css({ alignItems: 'baseline' }) }

export const position = {
  absolute: css({ position: 'absolute' }),
  relative: css({ position: 'relative' }),
  static: css({ position: 'static' }),
  sticky: css({ position: 'sticky' }),
}

export const display = { table: css({ display: 'table' }) }

export const borderRadius = {
  xs: css({ borderRadius: '4px' }),
  xl: css({ borderRadius: '80px' }),
}

export const layer = {
  0: css({ zIndex: 0 }),
  1: css({ zIndex: 10 }),
  2: css({ zIndex: 100 }),
}

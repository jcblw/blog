import { css } from '@emotion/core'

export const generateStyle = (property, dict) => (accum, key) =>
  Object.assign(accum, { [key]: css({ [property]: dict[key] }) })

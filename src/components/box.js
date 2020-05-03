import { withBox, flexStyles } from '@mujo/box'
import { styleGuide } from '../styles'

export const Box = withBox({
  styleGuide: { ...flexStyles, ...styleGuide },
  defaultComponent: 'div',
})

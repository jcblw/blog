import React from 'react'
import { useTheme } from '../hooks/useTheme'
import { Box } from './box'

export const Link = props => {
  const theme = useTheme()
  return <Box Component="a" color={theme.link} {...props} />
}

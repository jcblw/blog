import React from 'react'
import { useTheme } from '../hooks/useTheme'
import { Box } from './box'

export const HR = ({ margin = 'l' }) => {
  const theme = useTheme()
  return (
    <Box
      flex="0"
      height="3px"
      borderRadius="s"
      backgroundColor={theme.backgroundSecondary}
      marginTop={margin}
      marginBottom={margin}
    />
  )
}

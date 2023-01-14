import React from 'react'
import { useTheme, themeCSSVariables } from '../hooks/useTheme'
import { Box } from './box'

export const Blockquote = ({ children, ...props }) => {
  const theme = useTheme()
  return (
    <Box
      Component="blockquote"
      css={{
        display: 'flex',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        '::before': {
          left: 0,
          position: 'absolute',
          display: 'block',
          content: '""',
          paddingLeft: '8px',
          height: '50%',
          borderRadius: '8px',
          backgroundColor: `${themeCSSVariables[theme.overline]} !important`,
          zIndex: 1000,
        },
        '*': {
          fontStyle: 'italic',
          color: `${themeCSSVariables[theme.paragraph]} !important`,
        },
      }}
      paddingLeft="m"
      marginTop="m"
      marginBottom="m"
      marginLeft="zero"
      marginRight="zero"
      {...props}
    >
      {children}
    </Box>
  )
}

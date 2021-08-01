import React from 'react'
import { Box } from './box'

export const Container = ({ sidebarContent, ...props }) => (
  <Box display="flex" flexDirection="row" minHeight="fit-content">
    <Box flex="1"></Box>
    <Box
      paddingLeft="xl"
      paddingRight="xl"
      maxWidth="720px"
      width="100%"
      {...props}
    />
    <Box flex="1" position="relative">
      {sidebarContent}
    </Box>
  </Box>
)

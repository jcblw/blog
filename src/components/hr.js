import React from 'react'
import { Box } from './box'

export const HR = ({ margin = 'l' }) => (
  <Box
    flex="0"
    height="1px"
    backgroundColor="emperor"
    borderRadius="s"
    marginTop={margin}
    marginBottom={margin}
  />
)

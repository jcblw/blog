import { Box } from '@mujo/box'
import React from 'react'

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

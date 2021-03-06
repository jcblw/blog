import React from 'react'
import { Box } from './box'

export const Container = props => (
  <Box paddingLeft="xl" paddingRight="xl" maxWidth="600px" {...props} />
)

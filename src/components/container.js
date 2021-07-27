import React from 'react'
import { Box } from './box'

export const Container = props => (
  <Box
    paddingLeft="xl"
    paddingRight="xl"
    maxWidth="720px"
    css={{
      margin: '0 auto',
      width: '100%',
    }}
    {...props}
  />
)

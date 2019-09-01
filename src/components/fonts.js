import { Box } from '@mujo/box'
import React from 'react'

const BaseFont = props => (
  <Box
    marginTop={props.marginTop || 'm'}
    marginBottom={props.marginBottom || 'm'}
    color={props.color || 'polar'}
    {...props}
  />
)

export const Header1 = props => (
  <BaseFont Component="h1" fontSize="xl" fontWeight="bold" {...props} />
)

export const Header2 = props => (
  <BaseFont Component="h2" fontSize="l" fontWeight="bold" {...props} />
)

export const Header3 = props => (
  <BaseFont Component="h3" fontSize="l" fontWeight="regular" {...props} />
)

export const Header4 = props => (
  <BaseFont Component="h4" fontSize="m" fontWeight="bold" {...props} />
)

export const Header5 = props => (
  <BaseFont Component="h5" fontSize="m" fontWeight="regular" {...props} />
)

export const Header6 = props => (
  <BaseFont Component="h6" fontSize="s" fontWeight="bold" {...props} />
)

export const Paragraph = props => (
  <BaseFont Component="p" fontSize="s" fontWeight="regular" {...props} />
)

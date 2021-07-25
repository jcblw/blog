import React from 'react'
import { Box } from './box'

const BaseFont = props => (
  <Box
    marginTop={props.marginTop || 'l'}
    marginBottom={props.marginBottom || 'l'}
    color={props.color || 'white'}
    {...props}
  />
)

export const Header1 = props => (
  <BaseFont Component="h1" font="header1" color="aeroBlue" {...props} />
)

export const Header2 = props => (
  <BaseFont Component="h2" font="header2" color="aeroBlue" {...props} />
)

export const Header3 = props => (
  <BaseFont Component="h3" font="header3" color="aeroBlue" {...props} />
)

export const Header4 = props => (
  <BaseFont Component="h4" font="header4" color="aeroBlue" {...props} />
)

export const Header5 = props => (
  <BaseFont Component="h5" font="header5" color="aeroBlue" {...props} />
)

export const Header6 = props => (
  <BaseFont Component="h6" font="header6" color="aeroBlue" {...props} />
)

export const Paragraph = props => (
  <BaseFont Component="p" font="paragraph" {...props} />
)

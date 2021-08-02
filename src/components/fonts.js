import React from 'react'
import { useTheme } from '../hooks/useTheme'
import { Box } from './box'

const BaseFont = props => (
  <Box
    marginTop={props.marginTop || 'l'}
    marginBottom={props.marginBottom || 'l'}
    color={props.color || 'white'}
    {...props}
  />
)

export const Header1 = props => {
  const theme = useTheme()
  return (
    <BaseFont Component="h1" font="header1" color={theme.header} {...props} />
  )
}

export const Header2 = props => {
  const theme = useTheme()
  return (
    <BaseFont Component="h2" font="header2" color={theme.header} {...props} />
  )
}

export const Header3 = props => {
  const theme = useTheme()
  return (
    <BaseFont Component="h3" font="header3" color={theme.header} {...props} />
  )
}

export const Header4 = props => {
  const theme = useTheme()
  return (
    <BaseFont Component="h4" font="header4" color={theme.header} {...props} />
  )
}

export const Header5 = props => {
  const theme = useTheme()
  return (
    <BaseFont Component="h5" font="header5" color={theme.header} {...props} />
  )
}

export const Header6 = props => (
  <BaseFont Component="h6" font="header6" color="aeroBlue" {...props} />
)

export const Paragraph = props => {
  const theme = useTheme()
  return (
    <BaseFont
      Component="p"
      font="paragraph"
      color={theme.paragraph}
      {...props}
    />
  )
}

export const Overline = props => {
  const theme = useTheme()
  return <Header6 color={theme.overline} {...props} />
}

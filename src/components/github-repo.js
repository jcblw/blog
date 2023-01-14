import React from 'react'
import { useTheme } from '../hooks/useTheme'
import { Header5, Paragraph } from './fonts'
import { Box } from './box'
import { Link } from './link'
import { Icon } from './icon'

export const GithubRepo = ({
  name,
  description,
  starGazers,
  url,
  ...otherProps
}) => {
  const theme = useTheme()
  return (
    <Box
      backgroundColor={theme.background}
      borderRadius="m"
      marginBottom="l"
      padding="m"
      display="flex"
      flexDirection="column"
      {...otherProps}
    >
      <Box flex={1}>
        <Header5 marginTop="zero" marginBottom="xs">
          <Link href={url}>{name}</Link>
        </Header5>
        <Paragraph marginTop="zero" marginBottom="s">
          {description}
        </Paragraph>
      </Box>

      <Box display="flex" justifyContent="flexEnd" alignItems="center">
        <Icon
          iconName="star"
          width="24"
          height="24"
          marginRight="xxs"
          color={theme.overline}
        />
        <Paragraph marginTop="zero" marginBottom="zero">
          {Intl.NumberFormat().format(starGazers)}
        </Paragraph>
      </Box>
    </Box>
  )
}

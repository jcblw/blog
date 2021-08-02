/* eslint-disable max-len */
import React from 'react'
import { format } from 'date-fns'
import { useTheme } from '../hooks/useTheme'
import { Header3, Paragraph } from './fonts'
import { Box } from './box'

export const Talk = ({ title, date, youtube, description }) => {
  const theme = useTheme()
  return (
    <Box key={title}>
      <Header3 marginBottom="zero" color={theme.link}>
        {title}
      </Header3>
      <Paragraph marginTop="zero" color={theme.header}>
        {format(date, 'MMMM do yyyy')}
      </Paragraph>
      <Box
        paddingLeft="md"
        paddingRight="md"
        css={{
          position: 'relative',
          '::before': {
            content: '""',
            display: 'block',
            paddingBottom: 'calc(100% / (16/9))',
          },
          '& > :first-child': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          },
        }}
      >
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${youtube}`}
          frameBorder="0"
          allowFullScreen
          title={title}
        />
      </Box>
      <Paragraph>{description}</Paragraph>
    </Box>
  )
}

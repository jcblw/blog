import { Global } from '@emotion/core'
import React from 'react'
import { names } from './colors'

export const GlobalStyles = () => (
  <>
    <Global
      styles={{
        'html, body': {
          margin: 0,
          padding: 0,
          minHeight: '100%',
          height: '100%',
          backgroundColor: names.steelGrey,
          position: 'relative',
        },
        '*': { fontFamily: "'Oxygen', sans-serif" },
        'h1, h2, h3, h4, h5, h6, p': {
          margin: 0,
          padding: 0,
          fontWeight: 300,
        },
        '#___gatsby, #___gatsby > div': {
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          minHeight: '100%',
        },
        hr: {
          border: 0,
          backgroundColor: names.vulcan,
          height: `1px`,
        },
        li: {
          paddingBottom: '8px',
          paddingTop: '8px',
        },
        '.anchor.before': {
          position: 'absolute',
          left: '-24px',
          fill: names.periwinkleGray,
        },
      }}
    />
  </>
)

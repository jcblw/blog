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
          backgroundColor: names.limedSpruce,
        },
        '*': { fontFamily: "'IBM Plex Sans', sans-serif" },
        'h1, h2, h3, h4, h5, h6, p': {
          margin: 0,
          padding: 0,
        },
        '#___gatsby, #___gatsby > div': {
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          minHeight: '100%',
        },
      }}
    />
  </>
)

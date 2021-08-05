import React from 'react'
import { themes } from './src/hooks/useTheme'
import { names } from './src/styles/colors'

const themeValues = Object.keys(themes.dark)

const DarkModeScript = () => {
  const code = `
  (function () {
    const colorMode = window.matchMedia(
      '(prefers-color-scheme: light)'
    ).matches ? 'light' : 'dark'
    window.__prefersColorScheme = colorMode
    const root = document.documentElement;
    ${themeValues
      .map(
        key =>
          `root.style.setProperty('--${key}', colorMode === 'light' ? '${
            names[themes.light[key]]
          }' : '${names[themes.dark[key]]}')\n`
      )
      .join('')}
  })()
  `
  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: code }} />
}

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents(<DarkModeScript />)
}

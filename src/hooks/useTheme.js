import React, { createContext, useContext } from 'react'
import { names } from '../styles/colors'

export const themes = {
  light: {
    scheme: 'light',
    paragraph: 'vulcan',
    link: 'blumine',
    header: 'tradewind',
    background: 'bridalHealth',
    backgroundSecondary: 'white',
    overline: 'rawSienna',
  },
  dark: {
    scheme: 'dark',
    paragraph: 'white',
    link: 'periwinkleGray',
    header: 'aeroBlue',
    background: 'vulcan',
    backgroundSecondary: 'steelGrey',
    overline: 'calico',
  },
}

export const themeCSSVariables = {
  scheme: 'var(--scheme)',
  paragraph: 'var(--paragraph)',
  link: 'var(--link)',
  header: 'var(--header)',
  background: 'var(--background)',
  backgroundSecondary: 'var(--backgroundSecondary)',
  overline: 'var(--overline)',
}

export const themeNames = {
  scheme: 'scheme',
  paragraph: 'paragraph',
  link: 'link',
  header: 'header',
  background: 'background',
  backgroundSecondary: 'backgroundSecondary',
  overline: 'overline',
}

const context = createContext({})
const { Provider } = context

export const ThemeProvider = ({ children }) => {
  const value = useThemeProvider()
  return <Provider value={value}>{children}</Provider>
}

export const useThemeProvider = () => ({
  theme: themeNames,
})

export const useTheme = () => {
  const { theme } = useContext(context)
  return theme
}

export const useSetScheme = () => () => {}

/**
 * can only be used on the client
 */
export const useGetColorHex = () => name =>
  // eslint-disable-next-line no-underscore-dangle
  names[themes[window.__prefersColorScheme][name]]

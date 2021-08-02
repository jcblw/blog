import React, { createContext, useContext } from 'react'
import { useLocalStorage } from './useLocalStorage'

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

const context = createContext({})
const { Provider } = context

export const ThemeProvider = ({ children }) => {
  const value = useThemeProvider()
  return <Provider value={value}>{children}</Provider>
}

export const useThemeProvider = () => {
  const [scheme, setScheme] = useLocalStorage('jcblw:user-prefer', 'dark')
  return {
    theme: themes[scheme] ?? themes.dark,
    setScheme,
    scheme,
  }
}

export const useTheme = () => {
  const { theme } = useContext(context)
  return theme
}

export const useSetScheme = () => {
  const { setScheme } = useContext(context)
  return setScheme
}

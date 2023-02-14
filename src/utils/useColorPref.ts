import { useLocalStorage } from './useLocalStorage'
import { useColorScheme } from 'use-color-scheme'
import { useEffect } from 'react'

export const useColorPref = () => {
  const { scheme } = useColorScheme()
  const [colorScheme, setColorScheme] = useLocalStorage<
    'dark' | 'light' | 'none'
  >('_tp', null)

  const resolvedColorScheme = colorScheme ?? scheme
  return {
    colorScheme: resolvedColorScheme,
    setColorScheme,
    mediaMatch: scheme,
    storeScheme: colorScheme,
  }
}

export const useColorPrefManager = () => {
  const { colorScheme, setColorScheme, mediaMatch, storeScheme } =
    useColorPref()

  useEffect(() => {
    if (!storeScheme) {
      if (matchMedia.toString() === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }, [mediaMatch, storeScheme])

  return {
    colorScheme,
    toggleColorScheme: () => {
      const nextColorScheme = colorScheme === 'dark' ? 'light' : 'dark'
      setColorScheme(nextColorScheme)
      if (nextColorScheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },
  }
}

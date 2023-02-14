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
    if (
      colorScheme === 'dark' &&
      !document.documentElement.classList.contains('dark')
    ) {
      document.documentElement.classList.add('dark')
    } else if (
      colorScheme === 'light' &&
      document.documentElement.classList.contains('dark')
    ) {
      document.documentElement.classList.remove('dark')
    }
  }, [colorScheme])

  return {
    colorScheme,
    toggleColorScheme: () => {
      const nextColorScheme = colorScheme === 'dark' ? 'light' : 'dark'
      setColorScheme(nextColorScheme)
    },
  }
}

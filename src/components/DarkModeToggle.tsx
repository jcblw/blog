import { useState } from 'react'
import { useColorScheme } from 'use-color-scheme'
import { useColorPrefManager } from '../utils/useColorPref'
import { useLocalStorage } from '../utils/useLocalStorage'
import { Icon } from './Icon'

export const DarkModeToggle = () => {
  const { colorScheme, toggleColorScheme } = useColorPrefManager()
  const [animating, setAnimating] = useState(false)

  const handleToggle = () => {
    setAnimating(true)
    setTimeout(() => {
      toggleColorScheme()
      setTimeout(() => setAnimating(false), 200)
    }, 150)
  }

  return (
    <div className="flex items-center justify-center">
      <div
        style={{
          transition: 'opacity 0.15s ease, transform 0.15s ease',
          opacity: animating ? 0 : 1,
          transform: animating
            ? `rotate(${colorScheme === 'dark' ? '45deg' : '360deg'})`
            : 'rotate(0deg)',
          transformOrigin: 'center center',
        }}
      >
        <Icon
          icon={colorScheme === 'dark' ? 'luna' : 'sol'}
          className="cursor-pointer p-2"
          width="24"
          height="24"
          color={colorScheme === 'dark' ? 'link' : 'overline'}
          onClick={handleToggle}
        />
      </div>
    </div>
  )
}

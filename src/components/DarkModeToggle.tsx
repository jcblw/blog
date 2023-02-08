import { useColorScheme } from 'use-color-scheme'
import { useColorPrefManager } from '../utils/useColorPref'
import { useLocalStorage } from '../utils/useLocalStorage'
import { Icon } from './Icon'

export const DarkModeToggle = () => {
  const { colorScheme, toggleColorScheme } = useColorPrefManager()
  return (
    <div className="flex items-center justify--center">
      <Icon
        icon={colorScheme === 'dark' ? 'luna' : 'sol'}
        className="p--m cursor--pointer"
        width="32"
        height="32"
        color={colorScheme === 'dark' ? 'var(--link)' : 'var(--overline)'}
        onClick={toggleColorScheme}
      />
    </div>
  )
}

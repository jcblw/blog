import { useColorScheme } from 'use-color-scheme'
import { useColorPrefManager } from '../utils/useColorPref'
import { useLocalStorage } from '../utils/useLocalStorage'
import { Icon } from './Icon'

export const DarkModeToggle = () => {
  const { colorScheme, toggleColorScheme } = useColorPrefManager()
  return (
    <div className="flex items-center justify-center">
      <Icon
        icon={colorScheme === 'dark' ? 'luna' : 'sol'}
        className="p-2 cursor-pointer"
        width="32"
        height="32"
        color={colorScheme === 'dark' ? 'link' : 'overline'}
        onClick={toggleColorScheme}
      />
    </div>
  )
}

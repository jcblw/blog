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
        className="cursor-pointer p-2"
        width="24"
        height="24"
        color={colorScheme === 'dark' ? 'link' : 'overline'}
        onClick={toggleColorScheme}
      />
    </div>
  )
}

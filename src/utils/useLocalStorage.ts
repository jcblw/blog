import { useCallback, useMemo, useSyncExternalStore } from 'react'
import { localStore } from './storage'

const safeSerialize = <T extends unknown>(value: T): string | null => {
  try {
    return JSON.stringify(value)
  } catch (e) {
    return null
  }
}

const safeParse = <T extends unknown>(
  value: string,
  defaultValue: T | null
): T | null => {
  try {
    return JSON.parse(value) as T
  } catch (e) {
    return defaultValue ?? null
  }
}

export const useLocalStorage = <T extends unknown>(
  key: string,
  defaultValue: T | null = null
): [T | null, (value: T) => void] => {
  const setLocalStorageValue = (newValue: T) => {
    const serializedValue = safeSerialize(newValue)
    if (serializedValue) {
      localStore.setItem(key, serializedValue)
    }
  }

  const subscribe = useCallback(localStore.subscribe.bind(localStore, key), [
    key,
  ])

  const value = useSyncExternalStore(
    subscribe,
    () => {
      const value = localStore.getItem(key)
      if (value !== null) {
        return safeParse<T>(value, defaultValue)
      }
      return null
    },
    () => null
  )

  return [value, setLocalStorageValue]
}

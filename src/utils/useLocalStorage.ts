import React, { useEffect } from 'react'
const { useState } = React

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
  const [value, setValue] = useState<T | null>(() => {
    const rawValue =
      typeof localStorage === 'object' ? localStorage.getItem(key) : null
    return rawValue ? safeParse<T>(rawValue, defaultValue) : defaultValue
  })

  const setLocalStorageValue = (newValue: T) => {
    const serializedValue = safeSerialize(newValue)
    if (serializedValue) {
      localStorage.setItem(key, serializedValue)
    }
    setValue(newValue)
  }

  useEffect(() => {
    const eventName = `storage:change:${key}`
    const handler = () => {
      const value = localStorage.getItem(key)
      if (value !== null) {
        setValue(safeParse<T>(value, defaultValue))
      }
    }
    window.addEventListener(eventName, handler)
    return () => {
      window.removeEventListener(eventName, handler)
    }
  }, [key])

  return [value, setLocalStorageValue]
}

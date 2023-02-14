class CustomStorage {
  private handlers: [string, () => void][] = []
  private storageKey: 'localStorage' | 'sessionStorage'
  constructor(storageKey: 'localStorage' | 'sessionStorage') {
    this.storageKey = storageKey
  }

  get context() {
    return typeof window !== 'undefined' ? window[this.storageKey] : undefined
  }

  setItem(key: string, value: string) {
    this.context?.setItem(key, value)
    const eventName = `change:${key}`
    const handlers = this.handlers.filter(([name]) => name === eventName)
    handlers.forEach(([, handler]) => handler())
  }
  getItem(key: string) {
    return this.context?.getItem(key) ?? null
  }
  subscribe(key: string, callback: () => void) {
    const eventName = `change:${key}`
    console.log('eventName', eventName)
    this.handlers.push([eventName, callback])
    console.log(this.handlers)
    return () => {
      this.handlers = this.handlers.filter(
        ([name, handler]) => name !== eventName && handler !== callback
      )
    }
  }
}

export const localStore = new CustomStorage('localStorage')
export const sessionStore = new CustomStorage('sessionStorage')

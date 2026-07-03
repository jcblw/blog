import { useEffect, useState } from 'react'
import { useLocalStorage } from '../utils/useLocalStorage'
import { Icon } from './Icon'
import { siteMetadata } from '../consts'

const SUBSCRIBE_URL = `${siteMetadata.substack}/subscribe?utm_source=website&utm_medium=popup`

export const EmailList = () => {
  const [showEmailUpsell, setShowEmailUpsell] = useState(false)
  const [hasClosedEmailList, setEmailListClosed] = useLocalStorage(
    '__elc',
    false
  )
  const shouldShowEmailList = !hasClosedEmailList && showEmailUpsell

  useEffect(() => {
    if (hasClosedEmailList) {
      return
    }
    const timeout = setTimeout(() => {
      setShowEmailUpsell(true)
    }, 10000)
    return () => clearTimeout(timeout)
  }, [hasClosedEmailList])

  const dismiss = () => {
    setShowEmailUpsell(false)
    setEmailListClosed(true)
  }

  return (
    <div
      className="sticky bottom-0 z-20 p-0 sm:p-2"
      style={{
        transform: shouldShowEmailList
          ? 'scale(1) translateX(0px)'
          : 'scale(0.95) translateX(calc(min(100%, 500px) * -1))',
        opacity: shouldShowEmailList ? 1 : 0,
        transition: `transform ${
          shouldShowEmailList ? '0.2s' : '0.1s'
        } ease-in-out`,
        marginTop: '-16px',
        width: 'min(100%, 500px)',
      }}
    >
      <div className="bg-backgroundSecondary rounded-none p-0 sm:rounded-md sm:p-2">
        <div
          className="relative p-2"
          aria-hidden={shouldShowEmailList ? 'false' : 'true'}
        >
          {shouldShowEmailList && (
            <div
              tabIndex={0}
              role="button"
              aria-label="Dismiss newsletter prompt"
              className="color-link absolute cursor-pointer p-2"
              style={{ right: 0, top: 0 }}
              onClick={dismiss}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  dismiss()
                }
              }}
            >
              <Icon icon="close" width="24" height="24" />
            </div>
          )}
          <h4 className="color-overline py-2 pt-0 font-medium">
            Subscribe to my newsletter
          </h4>
          <p className="pt-0">
            I share new articles, projects, and thoughts on building humane
            technology. Free, no spam, unsubscribe anytime.
          </p>
          <div className="flex flex-row items-center pb-2">
            <a
              href={SUBSCRIBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={dismiss}
              className="text-bold bg-overline color-backgroundSecondary rounded-md border-none px-3 py-1 no-underline"
            >
              Subscribe on Substack
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

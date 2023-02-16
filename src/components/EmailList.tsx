import { useEffect, useState } from 'react'
import { useLocalStorage } from '../utils/useLocalStorage'
import { Icon } from './Icon'

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
          <form
            action="https://buttondown.email/api/emails/embed-subscribe/jcblw"
            method="post"
            target="popupwindow"
            onSubmit={() => {
              setShowEmailUpsell(false)
              setEmailListClosed(true)
              window.open('https://buttondown.email/jcblw', 'popupwindow')
            }}
            className="embeddable-buttondown-form border--none"
          >
            {shouldShowEmailList && (
              <div
                tabIndex={0}
                className="color-link absolute cursor-pointer p-2"
                style={{ right: 0, top: 0 }}
                onClick={() => {
                  setShowEmailUpsell(false)
                  setEmailListClosed(true)
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    setShowEmailUpsell(false)
                    setEmailListClosed(true)
                  }
                }}
              >
                <Icon icon="close" width="24" height="24" />
              </div>
            )}
            <h4 className="color-overline py-2 pt-0 font-bold">
              Subscribe to my newsletter
            </h4>
            <p className="pt-0">
              I will be sharing out my newest articles, projects, and other
              thoughts to the email list. Join me in exploring technology and
              how to build humane tech.
            </p>
            <div className="flex flex-row pb-2">
              <input
                required
                type="email"
                name="email"
                id="bd-email"
                placeholder="Your email"
                className="bg-paragraph color-backgroundSecondary mr-2 flex-1 rounded-md border-none px-3 py-1"
              />
              <div className="flex--0">
                <input
                  type="submit"
                  className="text-bold bg-overline color-backgroundSecondary rounded-md border-none px-3 py-1"
                  value="Subscribe"
                />
              </div>
            </div>
            <div className="text-right">
              <small>
                <a href="https://buttondown.email" target="_blank">
                  Powered by Buttondown.
                </a>
              </small>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

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
      className="bg-backgroundSecondary p-3 sticky bottom-0 z-20 container"
      style={{
        transform: shouldShowEmailList ? 'scale(1)' : 'scale(0.95)',
        opacity: shouldShowEmailList ? 1 : 0,
        transition: `all ${shouldShowEmailList ? '0.5s' : '0.2s'} ease-in-out`,
        borderTopLeftRadius: '32px',
        borderTopRightRadius: '32px',
      }}
    >
      <div
        className="py-4"
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
              className="absolute h3 color-link p-2 cursor-pointer"
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
          <h4 className="color-overline font-bold pt-0">
            Subscribe to my newsletter
          </h4>
          <p className="pt-0">
            I will be sharing out my newest articles, projects, and other
            thoughts to the email list. Join me in exploring technology and how
            to build humane tech.
          </p>
          <div className="flex flex-row pb-2">
            <input
              required
              type="email"
              name="email"
              id="bd-email"
              placeholder="Your email"
              className="bg-paragraph flex-1 color-backgroundSecondary rounded-md px-3 py-1 border-none mr-2"
            />
            <div className="flex--0">
              <input
                type="submit"
                className="text-bold bg-overline color-backgroundSecondary rounded-md px-3 py-1 border-none"
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
  )
}

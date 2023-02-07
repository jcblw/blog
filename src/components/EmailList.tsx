import { useEffect, useState } from 'react'
import { useLocalStorage } from '../utils/useLocalStorage'

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
      className="bg--backgroundSecondary p--m sticky bottom--0 relative layer--2 container"
      style={{
        transform: shouldShowEmailList
          ? 'translateY(2px) scale(1)'
          : 'translateY(200px) scale(0.95)',
        opacity: shouldShowEmailList ? 1 : 0,
        transition: `all ${shouldShowEmailList ? '0.5s' : '0.2s'} ease-in-out`,
        borderTopLeftRadius: 'var(--spacing-l)',
        borderTopRightRadius: 'var(--spacing-l)',
      }}
    >
      <div
        className="py--l"
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
              className="absolute h3 color--link p--s mr--s cursor--pointer"
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
              <span>𝘅</span>
            </div>
          )}
          <h4 className="color--overline bold pt--zero">
            Subscribe to my newsletter
          </h4>
          <p className="pt--zero">
            I will be sharing out my newest articles, projects, and other
            thoughts to the email list. Join me in exploring technology and how
            to build humane tech.
          </p>
          <div className="flex row pb--s">
            <input
              required
              type="email"
              name="email"
              id="bd-email"
              placeholder="Your email"
              className="bg--paragraph flex--1 color--backgroundSecondary rounded--m px--m py--xs border--none h6 mr--s"
            />
            <div className="flex--0">
              <input
                type="submit"
                className="h6 bg--overline color--backgroundSecondary rounded--m px--m py--xs border--none"
                value="Subscribe"
              />
            </div>
          </div>
          <div className="text--right">
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

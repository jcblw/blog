import PropTypes from 'prop-types'
import React from 'react'

const googleFonts = 'https://fonts.googleapis.com/'
const fonts = 'css2?family=Inconsolata&family=Oxygen:wght@300;400&display=swap'

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link href={`${googleFonts}${fonts}`} rel="stylesheet" />
        <stylesheet dangerouslySetInnerHTML={{ __html: props.css }} />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={'body'}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
        <div id="___page" />
      </body>
      {/* script that loads prism plugins once prism is available in the window */}
      <script
        defer
        dangerouslySetInnerHTML={{
          __html: ` 
          function checkForPrism() {
            const hasCodeblocks = document.getElementsByTagName('pre').length > 0
            const hasPrism = window.Prism
            console.log('hasCodeblocks', hasCodeblocks)
            console.log('hasPrism', hasPrism)

            if (hasCodeblocks && hasPrism) {
              ['https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/components/prism-python.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/components/prism-typescript.min.js']
                .forEach((url) => {
                  const script = document.createElement('script')
                  script.src = url
                  document.body.appendChild(script)
                })
                window.setTimeout(() => {
                  window.Prism.highlightAll()
                }, 400)
                return
            } 

            if (hasCodeblocks && !hasPrism) {
              window.setTimeout(checkForPrism, 400)
            }
          }

          window.setTimeout(checkForPrism, 400)
        `,
        }}
      />
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}

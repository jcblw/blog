import type { HTMLAttributes } from 'react'
import { useEffect, useMemo, useState } from 'react'

export interface Props extends HTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  width?: number
  quality?: number
}

const isBuild = import.meta.env.MODE === 'production'

export const Img = ({
  src,
  width,
  quality,
  alt,
  className,
  ...rest
}: Props) => {
  const [isLoaded, setIsLoaded] = useState(!isBuild)
  const { optimizedURL, shouldBlur, placeholderURL } = useMemo(() => {
    if (isBuild) {
      return {
        shouldBlur: true,
        placeholderURL: `/_vercel/image?url=${encodeURIComponent(
          src
        )}&w=8&q=50`,
        optimizedURL: `/_vercel/image?url=${encodeURIComponent(
          src
        )}&w=${width}&q=${quality}`,
      }
    } else {
      return {
        shouldBlur: false,
        placeholderURL: '',
        optimizedURL: src,
      }
    }
  }, [width, quality, src])

  useEffect(() => {
    if (shouldBlur && !isLoaded) {
      console.log('loading image', optimizedURL)
      const img = new Image()
      img.src = optimizedURL
      img.onload = () => {
        console.log('img loading', optimizedURL)
        setIsLoaded(true)
      }
    }
  }, [optimizedURL, shouldBlur])

  return (
    <div className={className} style={width ? { width: `${width}px` } : {}}>
      {shouldBlur && !isLoaded ? (
        <img
          src={placeholderURL}
          alt={alt}
          width={`${width}px`}
          className={className}
          {...rest}
        />
      ) : (
        <img
          src={optimizedURL}
          alt={alt}
          width={`${width}px`}
          className={className}
          {...rest}
        />
      )}
    </div>
  )
}

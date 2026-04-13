import { useState, useEffect, useCallback } from 'react'
import { Icon } from './Icon'

const COOKIE_PREFIX = 'likes_'

function getCookie(name: string): number {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  return match ? parseInt(match[1], 10) || 0 : 0
}

function setCookie(name: string, value: number) {
  const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString()
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`
}

export const LikeButton = ({ slug }: { slug: string }) => {
  const [totalLikes, setTotalLikes] = useState(0)
  const [myLikes, setMyLikes] = useState(0)
  const [animating, setAnimating] = useState(false)

  const cookieName = `${COOKIE_PREFIX}${slug.replace(/\//g, '_')}`

  useEffect(() => {
    setMyLikes(getCookie(cookieName))
    fetch(`/api/likes?slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((data) => setTotalLikes(data.likes ?? 0))
      .catch(() => {})
  }, [slug, cookieName])

  const handleLike = useCallback(() => {
    setAnimating(true)
    setTimeout(() => setAnimating(false), 300)

    const newMyLikes = myLikes + 1
    setMyLikes(newMyLikes)
    setTotalLikes((prev) => prev + 1)
    setCookie(cookieName, newMyLikes)

    fetch('/api/likes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
    }).catch(() => {})
  }, [slug, myLikes, cookieName])

  return (
    <div className="flex items-center justify-center">
      <div
        className={`like-icon cursor-pointer p-1 flex items-center ${animating ? 'like-pop' : ''}`}
        onClick={handleLike}
        role="button"
        aria-label={`Like this post. ${totalLikes} total likes, you've liked ${myLikes} times`}
      >
        <Icon
          icon={myLikes > 0 ? 'heart-filled' : 'heart'}
          width="24"
          height="24"
          color={myLikes > 0 ? 'liked' : 'link'}
        />
      </div>
      <span className="color-link text-sm">{totalLikes}</span>
    </div>
  )
}

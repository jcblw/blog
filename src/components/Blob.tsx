// @ts-ignore
import { createNoise2D } from 'simplex-noise'
import alea from 'alea'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  getPointOnCircle,
  normalize,
  angleToRadian,
  distance,
  type Point,
} from '../utils/math'
import { useColorPref } from '../utils/useColorPref'

const prng = alea('seed')
const noise2D = createNoise2D(prng)

const GRID_SIZE = 40
const DOT_RADIUS = 2.5
const FADE_ZONE = GRID_SIZE * 2

const randomN = (n = 100) => Math.floor(Math.random() * n)

const fpsTimeout = (callback: () => void, fps: number) => {
  let raf: number
  let time = Date.now()
  const check = () => {
    if (time + 1000 / fps - Date.now() < 0) {
      callback()
      time = Date.now()
    }
    raf = window.requestAnimationFrame(check)
  }
  raf = window.requestAnimationFrame(check)
  return () => cancelAnimationFrame(raf)
}

const getBlobRadius = (
  angle: number,
  noisePoint: Point,
  time: number,
  baseRadius: number
) => {
  const noiseCenter = getPointOnCircle(
    ...noisePoint,
    angleToRadian(time),
    10
  )
  const perlinPoint = getPointOnCircle(...noiseCenter, angle, 0.5)
  const off = normalize(noise2D(...perlinPoint), 0, 1, 0, 200)
  return baseRadius + off
}

export const Blob = () => {
  const noisePoint = useMemo<Point>(() => [randomN(), randomN()], [])
  const [canvas, setCanvas] = useState<HTMLCanvasElement>()
  const { colorScheme } = useColorPref()
  const meta = useRef({ time: 0, colorScheme: 'light' })

  useEffect(() => {
    meta.current.colorScheme = colorScheme
  }, [colorScheme])

  useEffect(() => {
    const ctx = canvas?.getContext('2d')
    if (!ctx) return

    const render = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      ctx.canvas.width = w
      ctx.canvas.height = h

      const isDark = meta.current.colorScheme === 'dark'
      const blobColor = isDark ? '#b8fff2' : '#4ba796'
      const gridColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,17,29,0.07)'
      const ghostDotColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15,17,29,0.08)'
      const t = meta.current.time

      const cx = w - w / 3
      const cy = h / 3
      const baseRadius = Math.max(w, h) / 2

      // Grid lines
      ctx.strokeStyle = gridColor
      ctx.lineWidth = 1
      ctx.beginPath()
      for (let x = 0; x <= w; x += GRID_SIZE) {
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
      }
      for (let y = 0; y <= h; y += GRID_SIZE) {
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
      }
      ctx.stroke()

      // Dots at grid intersections
      for (let x = 0; x <= w; x += GRID_SIZE) {
        for (let y = 0; y <= h; y += GRID_SIZE) {
          const angle = Math.atan2(y - cy, x - cx)
          const dist = distance([x, y], [cx, cy])
          const blobR = getBlobRadius(angle, noisePoint, t, baseRadius)
          const diff = blobR - dist // positive = inside, negative = outside

          if (diff < -FADE_ZONE) {
            // outside and beyond fade zone — ghost dot only
            ctx.globalAlpha = 1
            ctx.fillStyle = ghostDotColor
            ctx.beginPath()
            ctx.arc(x, y, 1.5, 0, Math.PI * 2)
            ctx.fill()
            continue
          }

          if (diff >= 0) {
            // fully inside
            ctx.globalAlpha = 1
          } else {
            // in the fade zone
            ctx.globalAlpha = 1 + diff / FADE_ZONE
          }

          ctx.fillStyle = blobColor
          ctx.beginPath()
          ctx.arc(x, y, DOT_RADIUS, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      ctx.globalAlpha = 1
      meta.current.time += 0.005
    }

    return fpsTimeout(render, 60)
  }, [canvas, noisePoint])

  return (
    <canvas
      ref={(ref) => ref && setCanvas(ref)}
      className="fixed top-0 left-0 h-full w-full pointer-events-none"
    />
  )
}

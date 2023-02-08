// @ts-ignore
import { createNoise2D } from 'simplex-noise'
import alea from 'alea'
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useColorScheme } from 'use-color-scheme'
import {
  getPointOnCircle,
  normalize,
  radianBetweenPoints,
  distance,
  angleToRadian,
  Point,
} from '../utils/math'
import { useColorPref } from '../utils/useColorPref'

const prng = alea('seed')
const noise2D = createNoise2D(prng)

export const drawBlob = ({
  scale,
  x,
  y,
  lr,
  ur,
  ctx,
  radius,
  noisePoint,
  angles,
  animated,
  meta,
}: {
  scale: number
  x: number
  y: number
  lr: number
  ur: number
  ctx: CanvasRenderingContext2D
  radius: number
  noisePoint: Point
  angles: number
  animated: boolean
  meta: any
}) => {
  const arr: Point[] = []
  const center: Point = [x, y]
  const noiseCenter = getPointOnCircle(
    ...noisePoint,
    angleToRadian(meta.current.time),
    10
  )
  for (let angle = 0; angle <= Math.PI * 2; angle += Math.PI / angles) {
    const perlinPoint = getPointOnCircle(...noiseCenter, angle, 0.5)
    const off = normalize(noise2D(...perlinPoint), 0, 1, lr, ur)

    const radii = radius * scale + off
    const px = radii * Math.cos(angle) + center[0]
    const py = radii * Math.sin(angle) + center[1]
    arr.push([px, py])
  }

  arr.sort(
    (a, b) => radianBetweenPoints(b, center) - radianBetweenPoints(a, center)
  )

  const newArr = arr
    .filter((point) => distance(point, center) > 3)
    .map((point) => {
      const d = distance(point, center)
      const r = radianBetweenPoints(center, point)
      return getPointOnCircle(...center, r, d)
    })

  let started = false
  ctx.beginPath()
  ctx.fillStyle = meta.current.color
  newArr.forEach(([px, py], ii) => {
    if (started) {
      ctx.lineTo(px, py)
    } else {
      ctx.moveTo(px, py)
      started = true
    }
  })
  ctx.closePath()
  ctx.fill()
}

const randomN = (n = 100) => Math.floor(Math.random() * n)

const fpsTimeout = (callback: () => void, fps: number) => {
  let requestAnimationFrame: number
  let time = Date.now()
  const checkTime = () => {
    const delay = 1000 / fps
    if (time + delay - Date.now() < 0) {
      callback()
      time = Date.now()
    }
    requestAnimationFrame = window.requestAnimationFrame(checkTime)
  }
  requestAnimationFrame = window.requestAnimationFrame(checkTime)

  return () => {
    cancelAnimationFrame(requestAnimationFrame)
  }
}

export const Blob = ({
  scale = 1,
  lr = 0,
  ur = 100,
  animated = true,
  angles = 100,
}: {
  scale?: number
  x?: number
  x2?: number
  y?: number
  lr?: number
  ur?: number
  radius?: number
  animated?: boolean
  angles?: number
}) => {
  const noisePoint = useMemo<Point>(() => [randomN(), randomN()], [])
  const ref = useRef({ time: 0, color: `#1a1c27`, mouse: [0, 0] })
  const [canvas, setCanvas] = useState<HTMLCanvasElement>()
  const { colorScheme } = useColorPref()
  const rageColor = colorScheme === 'dark' ? '#450f09' : '#ffd1d1'

  useEffect(() => {
    if (colorScheme === 'dark') {
      Object.assign(ref.current, { color: `#1a1c27` })
    } else {
      Object.assign(ref.current, { color: `#fff` })
    }
  }, [colorScheme])

  useEffect(() => {
    const ctx = canvas?.getContext('2d')
    if (!ctx) return
    let clearTimeout: () => void
    const renderCanvas = () => {
      // clear canvas
      ctx.canvas.width = window.innerWidth
      ctx.canvas.height = window.innerHeight
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      drawBlob({
        scale,
        x: window.innerWidth - window.innerWidth / 3,
        y: window.innerHeight / 3,
        lr: 0,
        ur: 10,
        ctx,
        radius: Math.max(window.innerWidth, window.innerHeight) / 2,
        noisePoint,
        angles,
        animated,
        meta: ref,
      })

      if (animated) {
        Object.assign(ref.current, { time: ref.current.time + 0.05 })
      }
    }
    clearTimeout = fpsTimeout(renderCanvas, 60)
    return () => {
      clearTimeout()
    }
  }, [canvas])

  return (
    <canvas
      ref={(ref) => ref && setCanvas(ref)}
      className="blob-canvas layer--0"
    />
  )
}

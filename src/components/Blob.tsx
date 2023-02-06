// @ts-ignore
import { createNoise2D } from 'simplex-noise'
import alea from 'alea';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useColorScheme } from 'use-color-scheme'
import {
   getPointOnCircle,
   normalize,
   radianBetweenPoints,
   distance,
   angleToRadian,
   Point,
} from '../utils/math'

const prng = alea('seed');
const noise2D = createNoise2D(prng);

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
  noisePoint: Point,
  angles: number
  animated: boolean
  meta: any
}) => {
  console.log('render')
  ctx.canvas.width = window.innerWidth
  ctx.canvas.height = window.innerHeight
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
    .filter(point => distance(point, center) > 3)
    .map(point => {
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

  if (animated) {
    Object.assign(meta, {
      current: { time: meta.current.time + 0.005, color: meta.current.color },
    })
  }
}

const randomN = (n = 100) => Math.floor(Math.random() * n)

export const Blob = ({
  scale = 1,
  x = 200,
  y = 200,
  lr = 0,
  ur = 100,
  animated = true,
  angles = 50,
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
  const ref = useRef({ time: 0, color: `#1a1c27` })
  const [canvas, setCanvas] = useState<HTMLCanvasElement>()
  const { scheme } = useColorScheme()

  useEffect(() => {
    if (scheme === 'dark') {
      Object.assign(ref, { current: { time: 0, color: `#1a1c27` } })
    } else {
      Object.assign(ref, { current: { time: 0, color: `#fff` } })
    }
  }, [scheme])

  useEffect(() => {
    const ctx = canvas?.getContext('2d')
    if (!ctx) return
    let animationFrame: number;
    const renderCanvas = () => {
      drawBlob({
        scale,
        x: window.innerWidth - window.innerWidth / 4,
        y: window.innerHeight / 10,
        lr,
        ur,
        ctx,
        radius: Math.max(window.innerWidth, window.innerHeight) / 2,
        noisePoint,
        angles,
        animated,
        meta: ref,
      })
      animationFrame = requestAnimationFrame(renderCanvas)
    }
    animationFrame = requestAnimationFrame(renderCanvas)
    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [canvas])

  return <canvas ref={(ref) => ref && setCanvas(ref)} className="blob-canvas layer--0" />
}

import SimplexNoise from 'perlin-simplex'
import { useCallback, useMemo } from 'react'
import { useDraw } from 'react-scribble'
import {
  getPointOnCircle,
  normalize,
  radianBetweenPoints,
  distance,
  angleToRadian,
} from '../../lib/math'

export const drawBlob = ({
  scale,
  x,
  y,
  lr,
  ur,
  simplex,
  ctx,
  radius,
  noisePoint,
  angles,
  animated,
  meta,
}) => {
  const arr = []
  const center = [x, y]
  const noiseCenter = getPointOnCircle(
    ...noisePoint,
    angleToRadian(meta.current.time),
    10
  )
  for (let angle = 0; angle <= Math.PI * 2; angle += Math.PI / angles) {
    const perlinPoint = getPointOnCircle(...noiseCenter, angle, 0.5)
    const off = normalize(simplex.noise(...perlinPoint), 0, 1, lr, ur)

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
      current: { time: meta.current.time + 0.001, color: meta.current.color },
    })
  }
}

const randomN = (n = 100) => Math.floor(Math.random() * n)
const initialSimplex = new SimplexNoise()

export const Blob = ({
  scale = 1,
  x = 0,
  x2,
  y = 0,
  lr = 10,
  ur = 20,
  radius = 100,
  animated = true,
  angles = 50,
  simplex = initialSimplex,
}) => {
  const noisePoint = useMemo(() => [randomN(), randomN()], [])
  const draw = useCallback(
    (ctx, _canvas, meta) => {
      drawBlob({
        scale,
        x,
        x2,
        y,
        lr,
        ur,
        simplex,
        ctx,
        radius,
        animated,
        noisePoint,
        angles,
        meta,
      })
    },
    [angles, animated, lr, noisePoint, radius, scale, simplex, ur, x, x2, y]
  )
  useDraw(draw)
  return null
}
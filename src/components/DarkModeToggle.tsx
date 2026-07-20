import { useEffect, useRef, useState } from 'react'
import { useColorPrefManager } from '../utils/useColorPref'
import { MOON, SUN, type Point } from './morphShapes'

// Morph parameters mirror sandman-android's SandmanLoadingIndicator:
// point-wise lerp between index-aligned outlines, rendered as a
// Catmull-Rom spline with tension 0.35.
const TENSION = 0.35
const DURATION_MS = 700

const easeInOutQuad = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2

const lerpPoints = (a: Point[], b: Point[], t: number): Point[] =>
  a.map(([ax, ay], i) => [
    ax + (b[i][0] - ax) * t,
    ay + (b[i][1] - ay) * t,
  ])

const buildSmoothPath = (points: Point[]): string => {
  const n = points.length
  let d = `M ${points[0][0].toFixed(4)} ${points[0][1].toFixed(4)}`
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n]
    const p1 = points[i]
    const p2 = points[(i + 1) % n]
    const p3 = points[(i + 2) % n]
    const cp1x = p1[0] + ((p2[0] - p0[0]) * TENSION) / 3
    const cp1y = p1[1] + ((p2[1] - p0[1]) * TENSION) / 3
    const cp2x = p2[0] - ((p3[0] - p1[0]) * TENSION) / 3
    const cp2y = p2[1] - ((p3[1] - p1[1]) * TENSION) / 3
    d += ` C ${cp1x.toFixed(4)} ${cp1y.toFixed(4)}, ${cp2x.toFixed(4)} ${cp2y.toFixed(4)}, ${p2[0].toFixed(4)} ${p2[1].toFixed(4)}`
  }
  return d + ' Z'
}

export const DarkModeToggle = () => {
  const { colorScheme, toggleColorScheme } = useColorPrefManager()
  const isDark = colorScheme === 'dark'
  // 0 = moon (dark mode), 1 = sun (light mode)
  const target = isDark ? 0 : 1
  const [progress, setProgress] = useState(target)
  const [rotation, setRotation] = useState(0)
  const progressRef = useRef(progress)
  const rotationRef = useRef(0)
  const rafRef = useRef<number>()

  useEffect(() => {
    const from = progressRef.current
    if (from === target) {
      return
    }
    // Rotation is cumulative so the spin stays clockwise in both
    // directions, rather than playing backwards on sun -> moon.
    const rotationFrom = rotationRef.current
    const start = performance.now()
    const tick = (now: number) => {
      const elapsed = Math.min((now - start) / DURATION_MS, 1)
      const eased = easeInOutQuad(elapsed)
      const value = from + (target - from) * eased
      progressRef.current = value
      rotationRef.current = rotationFrom + eased * 180
      setProgress(value)
      setRotation(rotationRef.current)
      if (elapsed < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [target])

  return (
    <button
      type="button"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggleColorScheme}
      className={`cursor-pointer border-none bg-transparent p-2 ${
        isDark ? 'color-link' : 'color-overline'
      }`}
    >
      <svg width="24" height="24" viewBox="-1.05 -1.05 2.1 2.1">
        <path
          d={buildSmoothPath(lerpPoints(MOON, SUN, progress))}
          fill="currentColor"
          transform={`rotate(${rotation})`}
        />
      </svg>
    </button>
  )
}

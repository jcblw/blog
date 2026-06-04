// @ts-ignore
import { createNoise2D } from 'simplex-noise'
import alea from 'alea'
import { useEffect, useRef, useState } from 'react'
import { useColorPref } from '../utils/useColorPref'

const prng = alea('seed')
const noise2D = createNoise2D(prng)

const GRID_SIZE = 40
const DOT_RADIUS = 2.5

const LIGHT_COLORS = [
  '#4ba796', // tradewind
  '#4e9ee4', // pictonBlue
  '#225b82', // blumine
  '#d08654', // rawSienna
  '#c25b5b', // rosewood
  '#ADCBE0', // periwinkleGray
]

const DARK_COLORS = [
  '#4ba796', // tradewind
  '#4e9ee4', // pictonBlue
  '#b8fff2', // aeroBlue
  '#e2b393', // calico
  '#ADCBE0', // periwinkleGray
]

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

export const Blob = () => {
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
      const colors = isDark ? DARK_COLORS : LIGHT_COLORS
      const gridColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,17,29,0.07)'
      const t = meta.current.time

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
          const n1 = noise2D(x * 0.006 + t * 0.25, y * 0.006 + t * 0.15)
          const n2 = noise2D(x * 0.009 + 100, y * 0.009 + t * 0.08)

          // n1 drives opacity and size
          const brightness = (n1 + 1) / 2
          if (brightness < 0.3) continue // skip very dim dots for sparsity

          const opacity = (brightness - 0.3) / 0.7 * 0.75 + 0.05
          const radius = DOT_RADIUS * (0.4 + brightness * 0.8)

          // n2 drives color choice
          const colorIdx = Math.floor(((n2 + 1) / 2) * colors.length) % colors.length

          ctx.globalAlpha = opacity
          ctx.fillStyle = colors[colorIdx]
          ctx.beginPath()
          ctx.arc(x, y, radius, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      ctx.globalAlpha = 1
      meta.current.time += 0.004
    }

    return fpsTimeout(render, 60)
  }, [canvas])

  return (
    <canvas
      ref={(ref) => ref && setCanvas(ref)}
      className="fixed top-0 left-0 h-full w-full pointer-events-none"
    />
  )
}

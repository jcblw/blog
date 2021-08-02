import React, { useRef, useState, useEffect } from 'react'
import { Canvas as ScribbleCanvas, Canvas2d } from 'react-scribble'
import { names } from '../../styles/colors'
import { useTheme } from '../../hooks/useTheme'
import { Blob } from './generative'

const { Clear } = Canvas2d

export const Canvas = () => {
  const [hasMounted, setHasMounted] = useState(false)
  const theme = useTheme()
  const canvasMeta = useRef({
    time: 0,
    color: names[theme.backgroundSecondary],
  })

  useEffect(() => {
    setHasMounted(true)
  }, [])

  canvasMeta.current.color = names[theme.backgroundSecondary]

  if (!hasMounted) {
    return null
  }

  console.log(canvasMeta)
  return (
    <ScribbleCanvas
      loop
      width={window.innerWidth}
      height={window.innerHeight}
      style={{
        position: 'fixed',
        top: 0,
        zIndex: 0,
      }}
      meta={canvasMeta}
    >
      <Clear />
      {/* 
        TODO see if we can get the context to wrap around articles 
        so they can modify the canvas 
      */}
      <Blob
        x={window.innerHeight * 0.5}
        y={window.innerHeight * 0.5}
        radius={window.innerHeight * 0.1}
        lr={window.innerHeight * 0.5}
        color={names[theme.backgroundSecondary]}
      />
    </ScribbleCanvas>
  )
}

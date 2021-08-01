import React, { useRef, useState } from 'react'
import { Canvas as ScribbleCanvas, Canvas2d } from 'react-scribble'
import { Blob } from './generative'

const { Clear } = Canvas2d

export const Canvas = () => {
  const canvasMeta = useRef()
  const [hasMounted, setHasMounted] = useState(false)
  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

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
      />
    </ScribbleCanvas>
  )
}

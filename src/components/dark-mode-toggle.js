/* eslint-disable max-len */
import React from 'react'
import { useSetScheme, useTheme } from '../hooks/useTheme'
import { names } from '../styles/colors'
import { Box } from './box'

export const DarkModeToggle = () => {
  const theme = useTheme()
  const setScheme = useSetScheme()
  const isDarkMode = theme.scheme === 'dark'
  return (
    <Box
      onClick={() => {
        setScheme(isDarkMode ? 'light' : 'dark')
      }}
      Component="button"
      css={{
        position: 'relative',
        background: 'transparent',
        cursor: 'pointer',
        border: 0,
        use: {
          fill: isDarkMode ? names.periwinkleGray : names.calico,
        },
        ':focus use, :hover use': {
          fill: `${isDarkMode ? names.pictonBlue : names.rawSienna}`,
          transition: 'fill 500ms ease-out',
        },
      }}
      aria-label={`Turn on ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      <Box
        Component="svg"
        width="32px"
        height="32px"
        viewBox="0 0 257 257"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <Box
            Component="path"
            d="M127.5,256 C197.916306,256 256.589844,213.424118 256.589844,143.007812 C256.589844,106.52518 236.943861,66.8849656 212.382813,43.6445312 C189.537789,22.0278537 161.433673,1 127.5,1 C93.5909859,1 69.1212769,22.0557064 46.28125,43.6445312 C21.6911066,66.8875993 0,91.9927085 0,128.5 C0,198.916306 57.0836944,256 127.5,256 Z"
            id="path-1"
            css={{
              transform: `rotate(${isDarkMode ? '0deg' : '0.5turn'})`,
              transformOrigin: 'center',
              transition: 'transform 1s cubic-bezier(0, 0, 0.02, 1.48)',
            }}
          />
        </defs>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <mask id="mask-3" fill={names.white}>
            <use xlinkHref="#path-1"></use>
          </mask>
          <Box Component="use" xlinkHref="#path-1" mask="url(#mask-3)" />
          <Box
            css={{
              transform: `translateX(${isDarkMode ? '-50px' : '-200px'})`,
              opacity: isDarkMode ? 1 : 0,
              transition: isDarkMode
                ? 'transform 500ms cubic-bezier(0, 0, 0.02, 1.48), opacity 0ms linear'
                : 'transform 0ms linear 40ms, opacity 40ms linear',
            }}
            Component="path"
            d="M108.32463,257 C168.150672,257 218,220.768759 218,160.845864 C218,129.799859 201.308676,96.0668139 180.441488,76.2896599 C161.032243,57.8942912 137.154847,40 108.32463,40 C79.5153644,40 58.7257786,57.9179933 39.3207788,76.2896599 C18.4288714,96.0690551 0,117.433011 0,148.5 C0,208.422895 48.498589,257 108.32463,257 Z"
            fill={names.vulcan}
            mask="url(#mask-3)"
          />
        </g>
      </Box>
    </Box>
  )
}

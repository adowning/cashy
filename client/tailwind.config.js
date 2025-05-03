/* eslint-env node */

import plugin from 'tailwindcss/plugin'

export const content = ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,css}']
export const darkMode = 'class'
export const theme = {
  asideScrollbars: {
    light: 'light',
    gray: 'gray',
  },
  extend: {
    zIndex: {
      '-1': '-1',
    },
    flexGrow: {
      5: '5',
    },
    // maxHeight: {
    //   'screen-menu': 'calc(100vh - 3.5rem)',
    //   'modal': 'calc(100vh - 160px)'
    // },
    transitionProperty: {
      position: 'right, left, top, bottom, margin, padding',
      textColor: 'color',
    },
    keyframes: {
      'fade-out': {
        from: { opacity: 1 },
        to: { opacity: 0 },
      },
      'fade-in': {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
      aurora: {
        '0%': {
          backgroundPosition: '0% 50%',
          transform: 'rotate(-5deg) scale(0.9)',
        },
        '25%': {
          backgroundPosition: '50% 100%',
          transform: 'rotate(5deg) scale(1.1)',
        },
        '50%': {
          backgroundPosition: '100% 50%',
          transform: 'rotate(-3deg) scale(0.95)',
        },
        '75%': {
          backgroundPosition: '50% 0%',
          transform: 'rotate(3deg) scale(1.05)',
        },
        '100%': {
          backgroundPosition: '0% 50%',
          transform: 'rotate(-5deg) scale(0.9)',
        },
      },
    },
    animation: {
      'fade-out': 'fade-out 250ms ease-in-out',
      'fade-in': 'fade-in 250ms ease-in-out',
      aurora: 'aurora 8s ease-in-out infinite alternate',
    },
  },
}
export const plugins = [
  require('@tailwindcss/forms'),
  plugin(({ matchUtilities, theme }) => {
    matchUtilities(
      {
        'aside-scrollbars': (value) => {
          const track = value === 'light' ? '100' : '900'
          const thumb = value === 'light' ? '300' : '600'
          const color = value === 'light' ? 'gray' : value

          return {
            scrollbarWidth: 'thin',
            scrollbarColor: `${theme(`colors.${color}.${thumb}`)} ${theme(
              `colors.${color}.${track}`,
            )}`,
            '&::-webkit-scrollbar': {
              width: '8px',
              height: '8px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: theme(`colors.${color}.${track}`),
            },
            '&::-webkit-scrollbar-thumb': {
              borderRadius: '0.25rem',
              backgroundColor: theme(`colors.${color}.${thumb}`),
            },
          }
        },
      },
      { values: theme('asideScrollbars') },
    )
  }),
]

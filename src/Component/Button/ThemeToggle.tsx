import React from 'react'

import * as Handlers from '~/Handlers'
import { Theme, isDark } from '~/Data'

type Props = { theme: Theme } & Omit<
  JSX.IntrinsicElements['button'],
  'onClick' | 'aria-label' | 'title'
>

const classNames = {
  elements: {
    moonOrSun: 'c-theme-toggle-button__moon-or-sun',
    moonMask: 'c-theme-toggle-button__moon-mask',
  },
}

export function component({ theme, ...props }: Props) {
  const { onToggleTheme } = Handlers.ask()
  // const [colorMode, setColorMode] = useColorMode()
  // const isDark = colorMode === `dark`
  //
  // function toggleColorMode(event) {
  //   event.preventDefault()
  //   // setColorMode(isDark ? `light` : `dark`)
  // }
  //
  const title = isDark(theme) ? 'Activate light mode' : 'Activate dark mode'

  return (
    <button
      {...props}
      onClick={onToggleTheme}
      data-a11y="false"
      aria-label={title}
      title={title}
    >
      <div className={classNames.elements.moonOrSun} />
      <div className={classNames.elements.moonMask} />
    </button>
  )
}

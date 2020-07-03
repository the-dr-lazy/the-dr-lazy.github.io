import * as t from 'io-ts'

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export const themeC = t.keyof({
  [Theme.Light]: null,
  [Theme.Dark]: null,
})

export function isDark(theme: Theme): theme is Theme.Dark {
  return theme === Theme.Dark
}

export function isLight(theme: Theme): theme is Theme.Light {
  return theme === Theme.Light
}

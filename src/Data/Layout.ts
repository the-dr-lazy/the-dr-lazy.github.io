import * as t from 'io-ts'

export enum Layout {
  Tiles = 'tiles',
  Rows = 'rows',
}

export const layoutC = t.keyof({
  [Layout.Tiles]: null,
  [Layout.Rows]: null,
})

export function isTiles(layout: Layout): layout is Layout.Tiles {
  return layout === Layout.Tiles
}

export function isRows(layout: Layout): layout is Layout.Rows {
  return layout === Layout.Rows
}

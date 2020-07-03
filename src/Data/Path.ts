export function joinPath(...paths: string[]) {
  return paths.join('/').replace(/\/{2,}/g, '/')
}

export function getPagePath(basePath: string, n: number) {
  return n === 1 ? basePath : joinPath(basePath, 'page', n.toString())
}

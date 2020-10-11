// Load static fonts
require('typeface-merriweather')
// require('source-map-support').install()
// require('ts-node').register({
//   compilerOptions: {
//     module: 'commonjs',
//     target: 'es2017',
//   },
// })

export { component as wrapRootElement } from './src/Main'
export const onInitialClientRender = require('./gatsby/browser/onInitialClientRender').default
export const onRouteUpdate = require('./gatsby/browser/onRouteUpdate').default
// export const shouldUpdateScroll = require('./gatsby/browser/shouldUpdateScroll')
//   .default

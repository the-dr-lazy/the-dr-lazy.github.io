// Although we are using TypeScript >= 3.8 due to an issue
// in ts-loader#1070 we are not able to transpile it through webpack.
// For more information see
// https://github.com/TypeStrong/ts-loader/issues/1070

import * as Hero from './Hero'
import * as List from './List'
import * as Paginator from './Paginator'

export { Hero, List, Paginator }

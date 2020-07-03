import { combineReducers } from 'redux'

import { combineEpics } from '~/Data'

import * as Layout from './Articles/Layout'

export * from './Articles/index'

//
// Data Types
//

//
// Action Creators
//

//
// Reducers
//

export const reducer = combineReducers({
  layout: Layout.reducer,
})

export type State = ReturnType<typeof reducer>

//
// Selectors
//

//
// Epics
//

export const epic = combineEpics({ layout: Layout.epic })

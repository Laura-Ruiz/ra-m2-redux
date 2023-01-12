import { configureStore } from '@reduxjs/toolkit'
import housesReducer from "./houses.slice"
import selectOptionReducer from "./selectOption.slice"
import paginationReducer from "./pagination.slice"
// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
  reducer: {
    houses: housesReducer,
    select: selectOptionReducer,
    pagination: paginationReducer
  },
})
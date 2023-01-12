import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  type: '',
  city: '',
}

const selectSlice = createSlice({
  name: 'select',
  initialState,
  reducers: {
    updateType(state, action) {
      state.type = action.payload
    },
    updateCity(state, action) {
      state.city = action.payload
    },
  },
})

export const { updateType, updateCity } = selectSlice.actions

export default selectSlice.reducer

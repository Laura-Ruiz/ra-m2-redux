import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  type: '',
  city: '',
}

// metelo en houses.slice.js
// No vas a poder reutilizarlo con otro tipo, por ejemplo si el directorio luego tiene oficinas, no podrías usar
// la misma paginación porque interferia una con otra
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

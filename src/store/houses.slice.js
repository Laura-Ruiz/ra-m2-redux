import {
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit'
import { urls } from '../constants'

const initialState = {
  reqStatus: 'initial',
  isError: false,
  isSuccess: false,
  isLoading: false,
  hasData: false,
  houses: {
    byId: {},
    allIds: [],
    byCities: {},
    byTypes: {},
  }
}

export const getHouses = createAsyncThunk(
  'houses/getHouses',
  async (currentPage, thunkApi) => {
    const limit = 9 * currentPage
    const url = `${urls.houses}?page=${currentPage}&_limit=${limit}`
    try {
      const response = await fetch(url)
      const data = await response.json()
      return data
    } catch (err) {
      return thunkApi.rejectWithValue(err.message)
    }
  },
)

const housesSlice = createSlice({
  name: 'houses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHouses.pending, (state) => {
      state.reqStatus = 'loading'
      state.isLoading = true
      state.isError = false
      state.isSuccess = false
      state.hasData = false
    })

    builder.addCase(getHouses.fulfilled, (state, action) => {
      state.reqStatus = 'success'
      state.isLoading = false
      state.isError = false
      state.isSuccess = true
      state.hasData = true

      action.payload.forEach((house) => {
        state.houses.byId[house.id] = house
        if (!state.houses.allIds.includes(house.id)) {
          state.houses.allIds.push(house.id)
        }

        if (!state.houses.byTypes[house.type]) {
          state.houses.byTypes[house.type] = []
        } else if (!state.houses.byTypes[house.type].includes(house.id)) {
          state.houses.byTypes[house.type].push(house.id)
        }

        if (!state.houses.byCities[house.city]) {
          state.houses.byCities[house.city] = []
        } else if (!state.houses.byCities[house.city].includes(house.id)) {
          state.houses.byCities[house.city].push(house.id)
        }
      })
    })
    builder.addCase(getHouses.rejected, (state) => {
      state.isLoading = false
      state.isError = true
      state.isSuccess = false
      state.hasData = false      
      state.reqStatus = 'failed'
    })
  },
})

export default housesSlice.reducer

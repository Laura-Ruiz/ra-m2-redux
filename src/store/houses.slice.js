import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { urls } from '../constants'

const initialState = {
  reqStatus: 'initial',
  houses: {
    byId:{},
    allIds: [],
    byCities: {},
    byTypes: {}
  },
}

export const getHouses = createAsyncThunk(
  'houses/getHouses',
  async (currentPage) => {
  const url = `${urls.houses}?page=${currentPage}&_limit=${9*currentPage}`
  const response = await fetch(url)
  const data = await response.json()
   return data
} 
)

const housesSlice = createSlice({
  name: 'houses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHouses.pending, (state) => {
      state.reqStatus = "loading"
    })
    builder.addCase(getHouses.fulfilled, (state, action) => {
      state.reqStatus = "success"
      action.payload.forEach((house) => {
        state.houses.byId[house.id] = house
        if(!state.houses.allIds.includes(house.id)){
          state.houses.allIds.push(house.id)
        }
        if(!state.houses.byTypes[house.type]){
          state.houses.byTypes[house.type] = []
        } else if(!state.houses.byTypes[house.type].includes(house.id)) {
          state.houses.byTypes[house.type].push(house.id)
        }
    
        if(!state.houses.byCities[house.city]){
          state.houses.byCities[house.city] = []
          
        }else if(!state.houses.byCities[house.city].includes(house.id)){
          state.houses.byCities[house.city].push(house.id)
        }
      });
    })
    builder.addCase(getHouses.rejected, (state) => {
      state.reqStatus = "failed"
    })
  },
})
 
export default housesSlice.reducer

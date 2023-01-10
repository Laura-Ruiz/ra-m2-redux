import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import { Body } from '../components/layout'
import { getHouses } from '../store/houses.slice'
import { Text } from '../components/atoms'

function Data() {
  const dispatch = useDispatch()
  const houses = useSelector((state)=> state.houses.houses)
  const {allIds, byId} = houses

  useEffect(() => {
   dispatch(getHouses())
  }, [dispatch])
  
  return <Body>
    {allIds.map(id => <Text key={id}>{byId[id].title}</Text>)}
  </Body>
}

export default Data

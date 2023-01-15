import React, { useEffect} from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { getHouses, setCurrentPage } from '../../store/houses.slice'
import { Button } from '../atoms'
import { HouseCard } from '../molecules'
import { FlexBox, Grid } from '../../styles'
import { filterByType, filterByCity } from '../../helpers/filters'

const HousesStyled = styled(FlexBox)``

function Houses() {
  const {type, city} = useSelector((state) => state.houses.selectOption)

  const houses = useSelector((state) => state.houses.houses)
  const { byId } = houses

  const { isError, isLoading, isSuccess } = useSelector((state) => state.houses)

  const {currentPage} = useSelector((state) => state.houses.pagination)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getHouses(currentPage))
  }, [dispatch, currentPage])

  const filterHouses = () => {
    const resultByType = filterByType((Object.values(byId)), type)
    const resultByCity = filterByCity(resultByType, city)

    return resultByCity
  }

  return (
    <HousesStyled>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error</div>}
      {isSuccess && (
        <Grid gridGap="32px">
          {filterHouses().map((element) => (
              <HouseCard
                key={`house-${element.id}`}
                title={element.title}
                price={`${element.price}€`}
                img={element.image}
                link=""
              />
            ))}
        </Grid>
      )}
      <FlexBox align="center">
        <Button style={{ marginTop: '2rem' }} onClick={() => {dispatch(setCurrentPage(currentPage + 1))}}>
          Load more
        </Button>
      </FlexBox>
    </HousesStyled>
  )
}

export default styled(Houses)``

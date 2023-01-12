import React, { useEffect} from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { getHouses } from '../../store/houses.slice'
import { Button } from '../atoms'
import { HouseCard } from '../molecules'
import { FlexBox, Grid } from '../../styles'
import { setCurrentPage } from '../../store/pagination.slice'

const HousesStyled = styled(FlexBox)``

function Houses() {
  const selected = useSelector((state) => state.select)

  const houses = useSelector((state) => state.houses.houses)
  const { byId } = houses

  const initialStateHouses = useSelector((state) => state.houses)
  const { isError, isLoading, isSuccess } = initialStateHouses

  const page = useSelector((state) => state.pagination)
  const {currentPage} = page

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getHouses(currentPage))
  }, [dispatch, currentPage])

  return (
    <HousesStyled>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error</div>}
      {isSuccess && (
        <Grid gridGap="32px">
          {Object.values(byId)
            .filter(
              (product) =>
                (!selected.type || product.type === selected.type) &&
                (!selected.city || product.city === selected.city),
            )
            .map((element) => (
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

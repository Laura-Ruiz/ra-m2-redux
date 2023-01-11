import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { getHouses } from '../../store/houses.slice'
import { Button } from '../atoms'
import { HouseCard } from '../molecules'
import { FlexBox, Grid } from '../../styles'

const HousesStyled = styled(FlexBox)``

function Houses({ selectedValue }) {
  // El selected value debería de venir de Redux, así evitas pasar props entre componentes.
  // Es una de las principales ventajas que tiene.
  const { type, ciudad } = selectedValue

  const houses = useSelector((state) => state.houses.houses)
  const { allIds, byId, byCities, byTypes } = houses
  const reqStatus = useSelector((state) => state.houses.reqStatus)

  const [page, setPage] = useState(1)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getHouses(page))
  }, [dispatch, page])

  const [selected, setSelected] = useState()

  useEffect(() => {
    // Este bloque me parece muy díficil de seguir y leer.
    // No escala bien si aumenta la cantidad de filtros
    // Refactoriza subiendo más lógica a redux
    if (type === null && ciudad !== null) {
      setSelected(byCities[ciudad])
    } else if (type !== null && ciudad === null) {
      setSelected(byTypes[type])
    } else if (type !== null && ciudad !== null) {
      // Especialmente aquí, si tienes 5 filtros se pierde el hilo.
      const result = byTypes[type].filter((element) =>
        byCities[ciudad].includes(element),
      )
      setSelected(result)
    } else {
      setSelected(allIds)
    }
  }, [allIds, byCities, byTypes, ciudad, type])

  return (
    <HousesStyled>
      {reqStatus === 'loading' && <div>Loading...</div>}
      {reqStatus === 'failed' && <div>Error</div>}
      {reqStatus === 'success' && (
        <Grid gridGap="32px">
          {selected &&
            // Antes del map, filtra en función de los valores seleccionados
            selected.map((id) => (
              <HouseCard
                key={id}
                title={byId[id].title}
                price={`${byId[id].price}€`}
                img={byId[id].image}
                link=""
              />
            ))}
        </Grid>
      )}
      <FlexBox align="center">
        <Button style={{ marginTop: '2rem' }} onClick={() => setPage(page + 1)}>
          Load more
        </Button>
      </FlexBox>
    </HousesStyled>
  )
}

Houses.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  selectedValue: PropTypes.object,
  ciudad: PropTypes.string,
}
export default styled(Houses)``

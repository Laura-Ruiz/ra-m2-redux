import React, {useState} from 'react'
import styled from 'styled-components'
import { Body } from '../components/layout'
import { Houses } from '../components/organisms'
import { Container, dimensions, FlexBox } from '../styles'

const HomeStyled = styled(Container)`
  margin-top: ${dimensions.spacing.xxl};
  margin-bottom: 5rem;
`

const MapPlaceholder = styled(FlexBox)`
  background-color: #ccc;
  border-radius: ${dimensions.borderRadius.base};
  margin-left: ${dimensions.spacing.xxl};
`


function Home() {
  const [selectedValue, setSelectedValue] = useState({
    type: null, 
    ciudad: null
  })

const handleChange = ({ target: { name, value } }) => {
  setSelectedValue(prevFormData => ({
        ...prevFormData,
        [name]:value
    }))

}
  return (
    <Body onChange={handleChange} selectedValue={selectedValue}>
      <HomeStyled>
        <FlexBox direction="row">
          <Houses selectedValue = {selectedValue} />
          <MapPlaceholder grow="1" shrink="0" justify="center" align="center">
            Mapa
          </MapPlaceholder>
        </FlexBox>
      </HomeStyled>
    </Body>
  )
}

export default Home

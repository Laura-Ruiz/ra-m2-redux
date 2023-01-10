import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useSelector } from "react-redux"
import { colors, Container, dimensions, FlexBox } from '../../styles'
import { Button, Icon } from '../atoms'
import { SelectGroup } from '../molecules'

const SubHeaderStyled = styled(FlexBox)`
  padding-top: ${dimensions.spacing.xl};
  padding-bottom: ${dimensions.spacing.xl};
  background-color: ${colors.clearBlueBg};
  border-top: 1px solid ${colors.border.clearBlueBg};
  border-bottom: 1px solid ${colors.border.clearBlueBg};
`

const FormStyled = styled(FlexBox).attrs({ as: 'form' })`
  ${SelectGroup} {
    &:first-of-type {
      padding: 0.5rem 1rem;
      border-radius: 4px;
      margin-right: 1rem;
    }
  }

  ${Button} {
    background-color: ${colors.blue};
  }
`


function SubHeader({onChange, ...props}) {

 const houses = useSelector((state)=> state.houses.houses)
 const {byTypes, byCities} = houses


const valuesByTypes = Object.entries(byTypes).map(item => ({value:item[0], text:item[0]}))
const valuesByCities = Object.entries(byCities).map(item => ({value:item[0], text:item[0]}))

  return (
    <SubHeaderStyled {...props}>
      <Container>
        <FormStyled direction="row" align="center">
          <SelectGroup
            id="type"
            label="Tipo"
            defaultText="Piso, chalet o garaje..."
            hideLabel
            options= {valuesByTypes}
            onChange = {onChange}
          />

          <SelectGroup
            id="ciudad"
            label="Ciudad"
            defaultText="Madrid, Barcelona o Zaragoza..."
            hideLabel
            options= {valuesByCities}
            onChange = {onChange}
          />

          <Button>
            <Icon icon="search" />
          </Button>
        </FormStyled>
      </Container>
    </SubHeaderStyled>
  )
}

SubHeader.propTypes = {
  onChange: PropTypes.func
}
export default styled(SubHeader)``

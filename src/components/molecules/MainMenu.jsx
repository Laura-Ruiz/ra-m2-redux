import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { main } from '../../constants'
import { colors } from '../../styles'

const MainMenuStyled = styled.ul`
list-style: none;
column-gap: 1rem;
margin: 0;
 padding: 0;
a {
  color: ${colors.font.base};
  text-decoration:none
}
}`

const StyledLink = styled(NavLink)`
  margin-left: 1rem;
  &:first-child {
    margin-left: 0;
  }
  &.active {
    font-weight: 600;
  }
`;

function MainMenu() {
  return (
    <MainMenuStyled>
      {Object.values(main).map(({ path, label }) => (
        <StyledLink key={path} to={path}>{label}</StyledLink>
      ))}
    </MainMenuStyled>
  )
}

export default styled(MainMenu)``

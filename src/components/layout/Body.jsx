import PropTypes from 'prop-types'
import Header from './Header'
import SubHeader from './SubHeader'
import { FlexBox } from '../../styles'

function Body({ children, onChange, selectedValue }) {
  return (
    <FlexBox>
      <Header />
      <SubHeader onChange={onChange} selectedValue={selectedValue} />
      {children}
    </FlexBox>
  )
}

Body.propTypes = {
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  selectedValue: PropTypes.object,
}

export default Body

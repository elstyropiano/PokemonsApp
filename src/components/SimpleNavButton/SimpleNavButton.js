import Button from '@mui/material/Button'
import { S } from './SimpleNavButton.styled'
import { useContext } from 'react'
import Context from '../../Context'
const SimpleNavButton = ({ text }) => (
  <li>
    <S.Link to={`/${text.toLowerCase()}`}>
      <Button variant="outlined" color="info" size="large">
        {text}
      </Button>
    </S.Link>
  </li>
)

export default SimpleNavButton

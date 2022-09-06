import Button from '@mui/material/Button'
import { S } from './SimpleNavButton.styled'

const SimpleNavButton = ({ text }) => (
  <li>
    <S.Link to={`/${text.toLowerCase()}`}>
      <Button variant="contained">{text}</Button>
    </S.Link>
  </li>
)

export default SimpleNavButton

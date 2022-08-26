import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const S = {
  Link: styled(Link)`
    text-decoration: none;
  `,
}
const SimpleNavButton = ({ text }) => {
  return (
    <li>
      <S.Link to={`/${text.toLowerCase()}`}>
        <Button variant='contained'>{text}</Button>
      </S.Link>
    </li>
  )
}

export default SimpleNavButton

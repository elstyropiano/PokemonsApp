import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const S = {
  Link: styled(Link)`
    text-decoration: none;
    width: 80%;
    margin: 20px 0;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Button: styled(Button)`
    width: 100%;
    &:hover {
      transform: scale(1.1);
    }
  `,
}
const BackHomeButton = ({ arena }) => {
  return (
    <S.Link to='/'>
      <S.Button
        variant={arena ? 'contained' : 'outlined'}
        color='error'
      >
        Strona główna
      </S.Button>
    </S.Link>
  )
}

export default BackHomeButton

import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'

export const S = {
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

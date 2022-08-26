import { Routes, Route, Link } from 'react-router-dom'
import { style } from '@mui/system'
import styled from 'styled-components'
import SimpleNavButton from './SimpleNavButton'
const buttonsText = ['Ulubione', 'Arena', 'Logowanie', 'Rejestracja']
const S = {
  Wrapper: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    width: 100%;
    background-color: black;
    color: white;
  `,
  Ul: styled.ul`
    display: flex;
    list-style-type: none;
  `,
}
const NavBar = () => {
  return (
    <S.Wrapper>
      <h1>Pokedex</h1>
      <S.Ul>
        {buttonsText.map((text) => (
          <SimpleNavButton key={text} text={text} />
        ))}
        <Routes>
          <Route
            path='/login'
            element={<SimpleNavButton text={'Edycja'} />}
          />
          <Route
            path='/login'
            element={<SimpleNavButton text={'Wyloguj'} />}
          />
        </Routes>
      </S.Ul>
    </S.Wrapper>
  )
}

export default NavBar

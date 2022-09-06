import { Routes, Route } from 'react-router-dom'
import SimpleNavButton from '../SimpleNavButton/SimpleNavButton'
import { S } from './NavBar.styled'

const buttonsText = ['Ulubione', 'Arena', 'Logowanie', 'Rejestracja']

const NavBar = () => {
  return (
    <S.Wrapper>
      <h1>Pokedex</h1>
      <S.Ul>
        {buttonsText.map(text => (
          <SimpleNavButton key={text} text={text} />
        ))}
        <Routes>
          <Route path="/login" element={<SimpleNavButton text={'Edycja'} />} />
          <Route path="/login" element={<SimpleNavButton text={'Wyloguj'} />} />
        </Routes>
      </S.Ul>
    </S.Wrapper>
  )
}

export default NavBar

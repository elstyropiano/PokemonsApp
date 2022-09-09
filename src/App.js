import { Routes, Route } from 'react-router-dom'
import NavBar from './components/navBar/NavBar'
import Home from './pages/home/Home'
import FavouritesPokemons from './pages/favouritesPokemons/FavouritesPokemons'
import Details from './pages/details/Details'
import styled from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import Arena from './pages/arena/Arena'
import Register from './pages/register/Register'
import LoginForm from './pages/loginForm/LoginForm'
import Edit from './pages/edit/Edit'
import { useContext } from 'react'
import Context from './Context'
const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
  `,
}

const App = () => {
  const { loggedUser } = useContext(Context)
  console.log(loggedUser, 'logged user')
  return (
    <BrowserRouter>
      <S.Wrapper>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="ulubione" element={<FavouritesPokemons />} />
          <Route path="arena" element={<Arena />} />
          <Route path="pokemon/:id" element={<Details />} />
          <Route path="rejestracja" element={<Register />} />
          {/* <Route
            path="*"
            element={<div>Aby przejsc pod ten adres musisz sie zalogowac </div>}
          /> */}
          <Route path="/logowanie" element={<LoginForm />} />
          {loggedUser ? (
            <Route path="/edycja" element={<Edit />} />
          ) : (
            <Route path="*" element={<div>Brak szukanego adresu</div>} />
          )}
        </Routes>
      </S.Wrapper>
    </BrowserRouter>
  )
}

export default App

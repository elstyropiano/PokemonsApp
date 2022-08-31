import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Favourite from './pages/Favourite'
import Details from './pages/Details'
import styled from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import Arena from './pages/arena/Arena'

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
  `,
}

const App = () => {
  return (
    <BrowserRouter>
      <S.Wrapper>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="ulubione" element={<Favourite />} />
          <Route path="arena" element={<Arena />} />
          <Route path="pokemon/:id" element={<Details />} />
          <Route path="*" element={<div>not found</div>} />
          <Route path="/login" element={<div>not found</div>} />
        </Routes>
      </S.Wrapper>
    </BrowserRouter>
  )
}

export default App

import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import SimpleNavButton from '../simpleNavButton/SimpleNavButton'
import { S } from './NavBar.styled'
import Context from '../../Context'
import { useContext } from 'react'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import LogoutIcon from '@mui/icons-material/Logout'
const buttonsText = ['Ulubione', 'Arena', 'Logowanie', 'Rejestracja']

const NavBar = () => {
  const navigate = useNavigate()
  const { loggedUser, setLoggedUser } = useContext(Context)
  const handleButton = () => {
    localStorage.removeItem('logged')
    setLoggedUser(null)
    navigate('/')
  }
  return (
    <S.Wrapper>
      <h1>Pokedex</h1>
      {loggedUser && <span>Zalogowano jako: {loggedUser.name}</span>}
      <S.Ul>
        {buttonsText.map(text => {
          if ((text === 'Logowanie' || text === 'Rejestracja') && loggedUser) {
            return
          }
          return <SimpleNavButton key={text} text={text} />
        })}
        {loggedUser && (
          <>
            <SimpleNavButton text={'Edycja'} />
            <Link to="/">
              <Button
                onClick={handleButton}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                size="large"
                variant="outlined"
              >
                <LogoutIcon
                  sx={{
                    margin: '0 5px',
                  }}
                />
                Wyloguj
              </Button>
            </Link>
          </>
        )}
      </S.Ul>
    </S.Wrapper>
  )
}

export default NavBar

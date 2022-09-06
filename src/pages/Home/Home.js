import TextField from '@mui/material/TextField'
import PokemonList from '../../components/PokemonList/PokemonList'
import Context from '../../Context'
import { useState, useContext } from 'react'
import Pagination from '../../components/Pagination/Pagination'
import { S } from '../../pages/Home/Home.styled'
const login = {
  userName: 'Grzegorz',
  password: '1asdar',
}
// window.localStorage.setItem(`user${1}`, JSON.stringify(login))
console.log(localStorage)
const local = JSON.parse(window.localStorage.getItem('user1'))
// window.localStorage.clear()
// const user = JSON.parse(window.localStorage.getItem('user1'))

const Home = () => {
  const { pokemonsArrayFromApi, setFilteredPokemons } = useContext(Context)
  const [value, setValue] = useState([])
  const [warning, setWarning] = useState(false)

  const handleInput = e => {
    const inputValue = e.target.value
    setValue(inputValue)
    const filteredPokemonsArr = pokemonsArrayFromApi?.filter(({ name }) =>
      name.includes(inputValue)
    )
    const noPokemonsWarning = filteredPokemonsArr.length === 0 ? true : false
    setWarning(noPokemonsWarning)
    setFilteredPokemons(filteredPokemonsArr)
  }

  return (
    <S.Wrapper>
      <TextField
        onChange={handleInput}
        value={value}
        label="Search "
        InputProps={{
          type: 'search',
        }}
      />
      <Pagination />
      {warning && <h1> Brak wyników wyszukiwania </h1>}
      <PokemonList />
    </S.Wrapper>
  )
}

export default Home

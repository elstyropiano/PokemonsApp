import TextField from '@mui/material/TextField'
import styled from 'styled-components'
import PokemonList from '../components/PokemonList'
import Context from '../Context'
import { useState, useContext, useEffect } from 'react'
import Pagination from '../components/Pagination'

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
}

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
  const { pokemonsArr, setFilteredArr } = useContext(Context)
  const [value, setValue] = useState([])
  const [warning, setWarning] = useState(false)

  const handleInput = e => {
    const inputValue = e.target.value
    setValue(inputValue)
    const filteredPokemonsArr = pokemonsArr?.filter(({ name }) =>
      name.includes(inputValue)
    )
    const noPokemonsWarning = filteredPokemonsArr.length === 0 ? true : false
    setWarning(noPokemonsWarning)
    setFilteredArr(filteredPokemonsArr)
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

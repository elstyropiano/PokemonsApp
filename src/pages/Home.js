import TextField from '@mui/material/TextField'
import styled from 'styled-components'
import PokemonList from '../components/PokemonList'
import Context from '../Context'
import { useState, useContext, useEffect } from 'react'
import Pagination from '../components/Pagination'

const limit = 15

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
  const { setValue, value, pokemonsArr, setFilteredArr, setPokemonsArr, page } =
    useContext(Context)
  const [data, setData] = useState([])
  const [url, setUrl] = useState(null)
  const [warning, setWarning] = useState(false)

  useEffect(() => {
    const offset = page === 1 ? 0 : (page - 1) * limit
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    setUrl(url)
  }, [page])

  useEffect(() => {
    if (url) {
      ;(async () => {
        const response = await fetch(url)
        const rowData = await response.json()
        setData(rowData)
        setPokemonsArr(rowData?.results)
        setWarning(false)
        setValue('')
      })()
    }
  }, [url])

  const handleInput = e => {
    const inputValue = e.target.value
    setValue(inputValue)
    const filteredPokemonsArr = pokemonsArr?.filter(({ name }) =>
      name.includes(value)
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

import TextField from '@mui/material/TextField'
import styled from 'styled-components'
import PokemonList from '../components/PokemonList'
import { useContext } from 'react'
import Context from '../Context'
import { useState } from 'react'
const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
}
const Home = () => {
  const { value, pokemonsArr, setFilteredArr, filteredArr } =
    useContext(Context)
  const [warning, setWarning] = useState(false)
  return (
    <S.Wrapper>
      <TextField
        onChange={(e) => {
          const value = e.target.value
          const arr = pokemonsArr?.filter(({ name }) =>
            name.includes(value)
          )

          if (arr.length === 0) {
            setWarning(true)
          } else setWarning(false)

          setFilteredArr(arr)
        }}
        value={value}
        label='Search '
        InputProps={{
          type: 'search',
        }}
      />
      {warning && <h1> Brak wyników wyszukiwania </h1>}
      <PokemonList />
    </S.Wrapper>
  )
}

export default Home

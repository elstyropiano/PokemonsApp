import styled from 'styled-components'
import useFetch from '../hooks/useFetch'
import SimplePokemonCard from './SimplePokemonCard'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import Context from '../Context'
const baseURL = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=15'

const PokemonList = () => {
  const { setLink, setPokemonsArr, filteredArr } = useContext(Context)
  const { data } = useFetch(baseURL)
  setPokemonsArr(data?.results)

  const S = {
    Wrapper: styled.div`
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
    `,
  }

  return (
    <S.Wrapper>
      {filteredArr?.map(({ name, url }) => {
        return (
          <Link
            onClick={() => {
              setLink(url)
            }}
            to={`/pokemon/${name}`}
            key={name}
          >
            <SimplePokemonCard list url={url} />
          </Link>
        )
      })}
    </S.Wrapper>
  )
}

export default PokemonList

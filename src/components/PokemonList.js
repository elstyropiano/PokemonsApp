import styled from 'styled-components'
import SimplePokemonCard from './simplePokemonCard/SimplePokemonCard'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import Context from '../Context'

const PokemonList = () => {
  const { setLink, filteredArr } = useContext(Context)

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

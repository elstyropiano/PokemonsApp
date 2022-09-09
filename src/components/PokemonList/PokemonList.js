import SimplePokemonCard from '../simplePokemonCard/SimplePokemonCard'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import Context from '../../Context'
import { S } from './PokemonList.styled'
const PokemonList = () => {
  const { setLink, filteredPokemons } = useContext(Context)

  return (
    <S.Wrapper>
      {filteredPokemons?.map(({ name, url }) => {
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

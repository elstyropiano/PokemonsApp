import { useContext } from 'react'
import { Link } from 'react-router-dom'
import Context from '../../Context'
import { S } from './FavouritesPokemons.styled'
import SimplePokemonCard from '../../components/simplePokemonCard/SimplePokemonCard'
import emptyPokeball from '../../images/emptyPokeball.png'
import BackHomeButton from '../../components/backHomeButton/BackHomeButton'

const FavouritesPokemons = () => {
  const { setLink, favouritesPokemons } = useContext(Context)

  return (
    <S.Wrapper empty={favouritesPokemons.length === 0}>
      {favouritesPokemons?.length === 0 ? (
        <>
          <S.Img src={emptyPokeball} alt="empty_pokeball" />
          <h1>POKEBALL JEST PUSTY</h1>
        </>
      ) : (
        favouritesPokemons?.map(({ name, url }) => (
          <Link key={name} onClick={() => setLink(url)} to={`/pokemon/${name}`}>
            <SimplePokemonCard list key={name} url={url} />
          </Link>
        ))
      )}
      <BackHomeButton />
    </S.Wrapper>
  )
}

export default FavouritesPokemons

import BackHomeButton from '../../components/backHomeButton/BackHomeButton'
import { useContext } from 'react'
import Context from '../../Context'
import PokemonDetails from '../../components/pokemonDetails/PokemonDetails'
import { S } from './Details.styled'

const Details = () => {
  const { link } = useContext(Context)
  return (
    <S.Wrapper>
      <PokemonDetails url={link} />
      <BackHomeButton />
    </S.Wrapper>
  )
}

export default Details

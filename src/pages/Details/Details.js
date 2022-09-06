import BackHomeButton from '../../components/BackHomeButton/BackHomeButton'
import { useContext } from 'react'
import Context from '../../Context'
import PokemonDetails from '../../components/PokemonDetails/PokemonDetails'
import { S } from '../../pages/Details/Details.styled'

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

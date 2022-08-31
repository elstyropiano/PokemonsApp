import BackHomeButton from '../components/BackHomeButton'
import { useContext } from 'react'
import Context from '../Context'
import styled from 'styled-components'
import PokemonDetails from '../components/PokemonDetails'

const S = {
  Wrapper: styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 100px;
    width: 100%;
  `,
}
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

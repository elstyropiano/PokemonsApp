import BackHomeButton from '../components/BackHomeButton'
import { useContext } from 'react'
import Context from '../Context'
import styled from 'styled-components'
import SimplePokemonCard from '../components/SimplePokemonCard'

const S = {
  Wrapper: styled.div`
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    display: flex;
    margin-top: 100px;
  `,
  SimplePokemonCardNew: styled(SimplePokemonCard)`
    background-color: red;
  `,
}
const Details = () => {
  const { link } = useContext(Context)

  return (
    <S.Wrapper>
      <SimplePokemonCard details url={link} />
      <BackHomeButton />
    </S.Wrapper>
  )
}

export default Details

import { useContext } from 'react'
import { Link } from 'react-router-dom'
import Context from '../Context'
import styled from 'styled-components'
import SimplePokemonCard from '../components/SimplePokemonCard'
import emptyPokeball from '../images/emptyPokeball.png'
import BackHomeButton from '../components/BackHomeButton'
const S = {
  Wrapper: styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: ${({ empty }) => (empty ? 'column' : 'row')};
    justify-content: center;
  `,
  Img: styled.img`
    height: 400px;
    margin-top: 100px;
  `,
}
const Favourite = () => {
  const { favourite, setLink } = useContext(Context)

  return (
    <S.Wrapper empty={favourite.length === 0}>
      {favourite.length === 0 ? (
        <>
          <S.Img src={emptyPokeball} alt='empty_pokeball' />
          <h1>POKEBALL JEST PUSTY</h1>
        </>
      ) : (
        favourite?.map(({ name, url }) => (
          <Link
            key={name}
            onClick={setLink(url)}
            to={`/pokemon/${name}`}
          >
            <SimplePokemonCard list key={name} url={url} />
          </Link>
        ))
      )}
      <BackHomeButton />
    </S.Wrapper>
  )
}

export default Favourite

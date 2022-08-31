import { useContext } from 'react'
import { Link } from 'react-router-dom'
import Context from '../Context'
import styled from 'styled-components'
import SimplePokemonCard from '../components/simplePokemonCard/SimplePokemonCard'
import emptyPokeball from '../images/emptyPokeball.png'
import BackHomeButton from '../components/BackHomeButton'
import useFetch from '../hooks/useFetch'
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
const url = 'http://localhost:3000/favourite'
const Favourite = () => {
  const { setLink, statsFromDb } = useContext(Context)
  const { data, error, loading } = useFetch(url)

  return (
    data && (
      <S.Wrapper empty={data?.length === 0}>
        {data?.length === 0 ? (
          <>
            <S.Img src={emptyPokeball} alt="empty_pokeball" />
            <h1>POKEBALL JEST PUSTY</h1>
          </>
        ) : (
          data?.map(({ name, url }) => (
            <Link key={name} onClick={setLink(url)} to={`/pokemon/${name}`}>
              <SimplePokemonCard list key={name} url={url} />
            </Link>
          ))
        )}
        <BackHomeButton />
      </S.Wrapper>
    )
  )
}

export default Favourite

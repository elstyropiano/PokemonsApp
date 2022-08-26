import styled from 'styled-components'
import useFetch from '../hooks/useFetch'
import { useParams } from 'react-router-dom'
import Context from '../Context'
import Description from './Description'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useState, useContext } from 'react'
import StadiumIcon from '@mui/icons-material/Stadium'

const S = {
  DescripionWrapper: styled.div`
    display: flex;
    width: 100%;
    height: 50%;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-top: 10px;
  `,
  DoubleDecripionWrapper: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  `,
  SimpleDecripionWrapper: styled.div`
    display: flex;
    justify-content: center;
    flex: 1;
  `,
  ImgWrapper: styled.div`
    height: 50%;
    width: 100%;
    justify-content: center;
    align-items: center;
    display: flex;
    padding: 10px;
    box-sizing: border-box;
    flex-direction: column;
  `,
  Span: styled.span`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #848383;
  `,
  SpanPropsName: styled.div`
    font-weight: 700;
    font-size: 16px;
    color: black;
  `,
  Img: styled.img`
    height: ${(props) => (props.details ? '180%' : '100%')};
    width: ${(props) => (props.details ? '60%' : '80%')};
  `,

  MainWrapper: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 400px;
    margin: ${({ arena }) => (arena ? '0 ' : '20px')};
    -webkit-box-shadow: 8px 8px 24px 0px rgba(155, 155, 159, 1);
    -moz-box-shadow: 8px 8px 24px 0px rgba(155, 155, 159, 1);
    box-shadow: 8px 8px 24px 0px rgba(155, 155, 159, 1);
    width: ${({ details }) => (details ? '80%' : '310px')};
    position: relative;
    border-radius: 10px;
    background-color: ${({ details }) =>
      details ? 'white' : 'lightgray'};
    &:hover {
      background-color: inherit;
      transform: ${({ list }) => (list ? 'scale(1.1)' : 'none')};
      transition: ease-in-out 0.2s;
    }
  `,
  PokemonWrapper: styled.div`
    display: flex;
    flex-direction: ${({ details }) => (details ? 'row' : 'column')};
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
  `,
  StadiumIcon: styled(StadiumIcon)`
    color: ${({ arena }) => (arena ? 'green' : 'inherit')};
    position: absolute;
    bottom: 0;
    left: 0;
    cursor: pointer;
  `,
  FavoriteIcon: styled(FavoriteIcon)`
    color: ${({ fav }) => (fav ? 'red' : 'inherit')};
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
  `,
  ArenaMember: styled.h1`
    left: 5px;
    bottom: 33px;
    position: absolute;
    color: ${({ warning }) => (warning ? 'red' : 'inherit')};
  `,
  FullArenaInfo: styled.span`
    position: absolute;
    bottom: 0;
    left: 72px;
    color: red;
  `,
}
const SimplePokemonCard = ({ url, details, arena, list }) => {
  const [clickedHeart, setClickedHeart] = useState(false)
  const { id } = useParams()
  const { favourite, setFavourite, arenaMember, setArenaMember } =
    useContext(Context)
  const { data, error, loading } = useFetch(url)
  const [fullArena, setFullArena] = useState(false)
  const checkIsInFav = favourite.some(
    ({ name }) => name === data?.name
  )
  const checkIsInArena = arenaMember.some(
    (element) => element.data.name === data?.name
  )

  const handleIconFavourite = () => {
    if (checkIsInFav) {
      const newArr = favourite.filter(
        ({ name }) => name !== data?.name
      )
      setFavourite(newArr)
      return
    }

    setFavourite([...favourite, { name: data?.name, url }])
    setClickedHeart(!clickedHeart)
  }
  const handleArenaIcon = () => {
    if (checkIsInArena) {
      const newArr = arenaMember.filter(
        ({ name }) => name !== data?.name
      )

      setArenaMember(newArr)
      return
    }
    if (arenaMember.length >= 2) {
      setFullArena(true)

      return
    }

    setArenaMember([...arenaMember, { name: data?.name, data, url }])
  }

  return (
    <S.MainWrapper list={list} details={details} arena={arena}>
      {loading ? (
        <p>...loading</p>
      ) : (
        <>
          {id && (
            <>
              <S.FavoriteIcon
                fav={checkIsInFav}
                onClick={handleIconFavourite}
                sx={{ fontSize: '60px' }}
              />
              <S.StadiumIcon
                sx={{ fontSize: '60px' }}
                onClick={handleArenaIcon}
                arena={checkIsInArena}
              />
              <S.ArenaMember
                warning={arenaMember.length === 2}
              >{`${arenaMember.length}/2`}</S.ArenaMember>
              {fullArena && (
                <S.FullArenaInfo>Arena jest pełna</S.FullArenaInfo>
              )}
            </>
          )}
          <S.PokemonWrapper details={details}>
            <S.ImgWrapper>
              <S.Img
                details={details}
                src={`${data?.sprites.other.dream_world.front_default}`}
                alt={data?.name}
              />
            </S.ImgWrapper>
            <Description data={data} details={details} />
          </S.PokemonWrapper>
        </>
      )}
    </S.MainWrapper>
  )
}

export default SimplePokemonCard

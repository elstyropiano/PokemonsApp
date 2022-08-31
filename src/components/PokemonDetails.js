import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import Context from '../Context'
import StadiumIcon from '@mui/icons-material/Stadium'
import FavoriteIcon from '@mui/icons-material/Favorite'
import useFetch from '../hooks/useFetch'
import Description from '../components/Description'
import { useParams } from 'react-router-dom'

const S = {
  Wrapper: styled.div`
    height: 400px;
    width: 80%;
    -webkit-box-shadow: 8px 8px 24px 0px rgba(155, 155, 159, 1);
    -moz-box-shadow: 8px 8px 24px 0px rgba(155, 155, 159, 1);
    box-shadow: 8px 8px 24px 0px rgba(155, 155, 159, 1);
    border-radius: 10px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
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
  Img: styled.img`
    height: 180%;
    width: 80%;
  `,
  ArenaMember: styled.h1`
    left: 5px;
    bottom: 33px;
    position: absolute;
    color: ${({ warning }) => (warning ? 'red' : 'inherit')};
  `,
  StadiumIcon: styled(StadiumIcon)`
    color: ${({ inarena }) => (inarena ? 'green' : 'inherit')};
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
  FullArenaInfo: styled.span`
    position: absolute;
    bottom: 8px;
    left: 72px;
    color: red;
    font-weight: 600;
    font-size: 20px;
  `,
}
const PokemonDetails = ({ url }) => {
  const { id } = useParams()
  const { data, error, loading } = useFetch(url)
  const [fullArena, setFullArena] = useState(false)
  const { arenaMember, setArenaMember, statsFromDb } = useContext(Context)
  const [checkIsInFav, setCheckIsInFav] = useState(null)
  const [checkIsInArena, setCheckIsInArena] = useState(null)
  const [favourite, setFavourite] = useState(null)
  const [index, setIndex] = useState(null)
  const [experience, setExperience] = useState(null)
  const [stats, setStats] = useState(null)

  useEffect(() => {
    ;(async () => {
      const response = await fetch('http://localhost:3000/favourite')
      const rowData = await response.json()
      setFavourite(rowData)
    })()
    ;(async () => {
      const response = await fetch('http://localhost:3000/arena')
      const rowData = await response.json()
      setArenaMember(rowData)
    })()
  }, [])

  useEffect(() => {
    if (favourite) {
      const checkPokemonIsInArr = favourite?.some(({ name }) => name === id)
      setCheckIsInFav(checkPokemonIsInArr)
    }
  }, [favourite])

  useEffect(() => {
    if (arenaMember) {
      const checkIsInArena = arenaMember?.some(({ name }) => name === id)
      setCheckIsInArena(checkIsInArena)
    }
  }, [arenaMember])

  useEffect(() => {
    index && deleteFromServer(favourite)
  }, [index])

  useEffect(() => {
    if (data) {
      const isThere = statsFromDb?.some(({ name }) => name === id) /// dane te aktualizuja  sie tylko raz bo experience jest nie jest zmienny
      isThere
        ? statsFromDb.map(({ name }, index) => {
            if (name === id) {
              const exp = statsFromDb[index].experience
              setExperience(exp)
            }
          })
        : setExperience(data?.base_experience)
    }
  }, [data])

  const postDataOnServer = async (name, endpoint) => {
    const { height, weight, stats } = data

    const speed = stats[5].base_stat
    const dataToSend =
      endpoint === 'arena'
        ? {
            name,
            experience,
            height,
            weight,
            speed,
            url,
          }
        : {
            name,
            url,
          }

    await fetch(`http://localhost:3000/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend),
    })
    endpoint === 'arena' ? fetchArena() : fetchFavourite()
  }

  const deleteFromServer = async (endpoint, array, index) => {
    const id = array?.[index].id
    await fetch(`http://localhost:3000/${endpoint}/${id}`, {
      method: 'DELETE',
    })
    endpoint === 'arena' ? fetchArena() : fetchFavourite()
  }

  const fetchFavourite = async () => {
    const response = await fetch('http://localhost:3000/favourite')
    const rowData = await response.json()
    setFavourite(rowData)
    const checkPokemonIsInArr = rowData?.some(({ name }) => name === data?.name)
    setCheckIsInFav(checkPokemonIsInArr)
  }
  const fetchArena = async () => {
    const response = await fetch('http://localhost:3000/arena')
    const rowData = await response.json()
    setArenaMember(rowData)
    const checkPokemonIsInArr = rowData?.some(({ name }) => name === id)
    setCheckIsInArena(checkPokemonIsInArr)
  }

  const handleArenaIcon = () => {
    if (checkIsInArena) {
      arenaMember?.map(({ name }, index) => {
        if (name === id) deleteFromServer('arena', arenaMember, index)
      })
    } else {
      if (arenaMember.length === 2) {
        setFullArena(true)
        return
      }
      postDataOnServer(id, 'arena')
    }
  }
  const checkPokemonIsInArr = array => array?.some(({ name }) => name === id)

  const handleFavouriteIcon = () => {
    const isThere = checkPokemonIsInArr(favourite)
    isThere
      ? favourite?.map(({ name }, index) => {
          if (name === id) {
            deleteFromServer('favourite', favourite, index)
          }
        })
      : postDataOnServer(id, 'favourite')
  }

  return (
    data && (
      <S.Wrapper>
        <S.ImgWrapper>
          <S.Img
            src={`${data?.sprites.other.dream_world.front_default}`}
            alt={data?.name}
          />
        </S.ImgWrapper>
        <Description data={data} />

        <S.FavoriteIcon
          fav={checkIsInFav}
          onClick={handleFavouriteIcon}
          sx={{ fontSize: '60px' }}
        />
        <S.StadiumIcon
          sx={{ fontSize: '60px' }}
          onClick={handleArenaIcon}
          inarena={checkIsInArena}
        />

        <S.ArenaMember warning={arenaMember.length === 2}>
          {`${arenaMember.length}/2`}
        </S.ArenaMember>
        {fullArena && <S.FullArenaInfo>Arena jest pełna</S.FullArenaInfo>}
      </S.Wrapper>
    )
  )
}

export default PokemonDetails

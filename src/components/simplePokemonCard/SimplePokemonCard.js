import useFetch from '../../hooks/useFetch'
import Context from '../../Context'
import Description from '../description/Description'
import { useContext, useEffect, useState } from 'react'
import { S } from './SimplePokemonCard.styled'
import CircularProgress from '@mui/material/CircularProgress'
import FightStats from '../fightStats/FightStats'
import axios from 'axios'

const SimplePokemonCard = ({ url, arena, list }) => {
  const [wins, setWins] = useState(null)
  const [loses, setLoses] = useState(null)
  const [isInJsonServer, setIsInJsonServer] = useState(null)
  const [name, setName] = useState(null)
  const { data, error, loading } = useFetch(url)
  const {
    arenaMembers,
    setArenaMembers,
    statsFromJsonServer,
    showDeleteSuccesOnConsole,
    showErrorMessageOnConsole,
  } = useContext(Context)

  const checkPokemonIsInArr = array =>
    array?.some(({ name }) => name === data?.name)

  useEffect(() => {
    if (data) {
      setName(data.name)
    }
  }, [data])

  useEffect(() => {
    if (statsFromJsonServer) {
      const isThere = checkPokemonIsInArr(statsFromJsonServer)
      setIsInJsonServer(isThere)
      if (isThere)
        statsFromJsonServer?.map(({ name, wins, loses }) => {
          if (name === data?.name) {
            setWins(wins)
            setLoses(loses)
          }
        })
    }
  }, [name])

  const deleteArenaMember = () =>
    arenaMembers.map(({ name }, index) => {
      if (name === data?.name) {
        const id = arenaMembers[index].id
        ;(async () =>
          axios
            .delete(`http://localhost:3000/arenaMembers/${id}`)
            .then(response => {
              showDeleteSuccesOnConsole()
              getArenaMembers()
            })
            .catch(error => showErrorMessageOnConsole(error)))()
      }
    })

  const getArenaMembers = async () =>
    await axios
      .get('http://localhost:3000/arenaMembers')
      .then(response => {
        setArenaMembers(response.data)
      })
      .catch(error => showErrorMessageOnConsole(error))

  return (
    <S.MainWrapper list={list} arena={arena}>
      {error && <div>Error:{error}</div>}
      {loading && (
        <>
          <CircularProgress />
          <p>...LOADING</p>
        </>
      )}
      {data && (
        <>
          {isInJsonServer && <FightStats wins={wins} loses={loses} />}
          {arena && (
            <S.ClearIcon
              fontSize="large"
              color="info"
              onClick={deleteArenaMember}
            />
          )}
          <S.PokemonWrapper>
            <S.ImgWrapper>
              <S.Img
                src={`${data?.sprites.other.dream_world.front_default}`}
                alt={data?.name}
              />
            </S.ImgWrapper>
            <Description data={data} />
          </S.PokemonWrapper>
        </>
      )}
    </S.MainWrapper>
  )
}

export default SimplePokemonCard

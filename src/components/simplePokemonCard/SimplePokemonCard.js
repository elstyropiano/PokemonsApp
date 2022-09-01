import useFetch from '../../hooks/useFetch'
import Context from '../../Context'
import Description from '../Description'
import { useContext, useEffect, useState } from 'react'
import { S } from './SimplePokemonCard.style'
import CircularProgress from '@mui/material/CircularProgress'
import FightStats from '../FightStats'
const SimplePokemonCard = ({ url, arena, list }) => {
  const { arenaMember, setArenaMember, statsFromDb } = useContext(Context)
  const [isInArray, setIsInArray] = useState(null)
  const [id, setId] = useState(null)
  const [totallyWins, setTotallyWins] = useState(null)
  const [totallyLoses, setTotallyLoses] = useState(null)
  const [IsInStatsFromDb, setIsInStatsFromDb] = useState(null)
  const { data, error, loading } = useFetch(url)
  console.log(statsFromDb, 'statsFromDB')

  useEffect(() => {
    if (statsFromDb) {
      const isThere = statsFromDb?.some(({ name }) => name === data?.name)
      setIsInStatsFromDb(isThere)

      if (isThere)
        statsFromDb?.map(({ name, wins, loses }) => {
          if (name === data?.name) {
            setTotallyWins(wins)
            setTotallyLoses(loses)
          }
        })
    }
  }, [data])

  // useEffect(() => {
  //   ;(async () => {
  //     const response = await fetch('http://localhost:3000/arena')
  //     const rowData = await response.json()
  //     setArenaMember(rowData)
  //   })()
  // }, [])
  // useEffect(() => {
  //   ;(async () => {
  //     const response = await fetch('http://localhost:3000/arena')
  //     const rowData = await response.json()
  //     setArenaMember(rowData)
  //   })()
  // }, [])

  // useEffect(() => {

  //     const isThere = arenaMember?.some(({ name }) => name === data?.name)
  //     setIsInArray(isThere)
  //   }
  // }, [arenaMember])
  const checkId = () => {
    arenaMember?.map(({ name }, index) => {
      if (name === data?.name) {
        setId(arenaMember[index].id)
      }
    })
  }
  useEffect(() => {
    if (id) {
      ;(async () => {
        await fetch(`http://localhost:3000/arena/${id}`, {
          method: 'DELETE',
        })
        fetchArena()
      })()
    }
  }, [id])
  // const checkIsInArena = arenaMember?.some({ name } === data?.name)
  // const index = () => arenaMember.map(({ name }) => name !== data?.name)
  const fetchArena = async () => {
    const response = await fetch('http://localhost:3000/arena')
    const rowData = await response.json()
    setArenaMember(rowData)
  }
  // const deleteFromServer = async () => {
  //   // const id = arenaMember[index].id

  //   console.log(id, 'i w areni')
  //   await fetch(`http://localhost:3000/arena/${id}`, {
  //     method: 'DELETE',
  //   })
  //   ;(async () => {
  //     const response = await fetch('http://localhost:3000/arena')
  //     const rowData = await response.json()
  //     setArenaMember(rowData)
  //   })()
  // }

  console.log(IsInStatsFromDb, 'IsInStatsFromDb')
  if (error) {
    return (
      <S.MainWrapper list={list} arena={arena}>
        {error && <div>Error: {error}</div>}
      </S.MainWrapper>
    )
  }
  if (loading) {
    return (
      <S.MainWrapper list={list} arena={arena}>
        <CircularProgress />
        <p>...LOADING</p>
      </S.MainWrapper>
    )
  }
  if (data) {
    return (
      <S.MainWrapper list={list} arena={arena}>
        <>
          {IsInStatsFromDb && (
            <FightStats totallyWins={totallyWins} totallyLoses={totallyLoses} />
          )}
          {arena && (
            <S.ClearIcon fontSize="large" color="info" onClick={checkId} />
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
      </S.MainWrapper>
    )
  }
  //     <>
  //       <S.MainWrapper list={list} arena={arena}>
  //         {error && <div>Error: {error}</div>}
  //         {loading && (
  //           <>
  //             <CircularProgress />
  //             <p>...LOADING</p>
  //           </>
  //         )}
  //         {data && (
  //           <>
  //             {arena && (
  //               <S.ClearIcon
  //                 fontSize="large"
  //                 color="info"
  //                 onClick={deleteFromArena}
  //               />
  //             )}
  //             <S.PokemonWrapper>
  //               <S.ImgWrapper>
  //                 <S.Img
  //                   src={`${data?.sprites.other.dream_world.front_default}`}
  //                   alt={data?.name}
  //                 />
  //               </S.ImgWrapper>
  //               <Description data={data} />
  //             </S.PokemonWrapper>
  //           </>
  //         )}
  //       </S.MainWrapper>
  //     </>
  //   )
  // }
}
export default SimplePokemonCard

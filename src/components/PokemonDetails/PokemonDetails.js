import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import axios from 'axios'
import Context from '../../Context'
import Description from '../description/Description'
import CircularProgress from '@mui/material/CircularProgress'
import { S } from './PokemonDetails.styled'

const PokemonDetails = ({ url }) => {
  const { id } = useParams()
  const { data, error, loading } = useFetch(url)
  const [fullArenaWarning, setFullArenaWarning] = useState(false)
  const [pokemonIsInFavourite, setPokemonIsInFavourite] = useState(null)
  const [pokemonIsInArena, setPokemonIsInArena] = useState(null)
  const [dataToArena, setDataToArena] = useState(null)
  const [dataToFavourites, setDataToFavourites] = useState(null)
  const [idFavouritesFromJsonServer, setIdFavouritesFromJsonServer] =
    useState(null)
  const [idArenaMemberFromJsonServer, setIdArenaMemberFromJsonServer] =
    useState(null)
  const {
    arenaMembers,
    setArenaMembers,
    favouritesPokemons,
    setFavouritesPokemons,
    showDeleteSuccesOnConsole,
    showErrorMessageOnConsole,
    statsFromJsonServer,
    loggedUser,
    setLoggedUser,
  } = useContext(Context)

  const checkPokemonIsInArr = array => array?.some(({ name }) => name === id)

  useEffect(() => {
    if (favouritesPokemons) {
      const dataToSendToFavourites = { name: id, url }
      const isThere = checkPokemonIsInArr(favouritesPokemons)
      setPokemonIsInFavourite(isThere)
      isThere
        ? favouritesPokemons.map(({ name }, index) => {
            if (name === id) {
              const id = favouritesPokemons[index].id
              console.log(id, 'favouritesPokemons id w useEffect')
              setIdFavouritesFromJsonServer(id)
            }
          })
        : setDataToFavourites(dataToSendToFavourites)
    }
  }, [favouritesPokemons])

  useEffect(() => {
    if (data) {
      const { height, weight, stats, base_experience } = data
      const speed = stats[5].base_stat
      const isThere = checkPokemonIsInArr(arenaMembers)
      setPokemonIsInArena(isThere)
      const dataToArena = isThere
        ? arenaMembers.map(({ name, wins, loses, experience }, index) => {
            if (name === id) {
              const id = arenaMembers[index].id
              setIdArenaMemberFromJsonServer(id)
              return {
                name: id,
                experience,
                height,
                weight,
                speed,
                wins,
                loses,
                url,
              }
            }
          })
        : {
            name: id,
            experience: base_experience,
            height,
            weight,
            speed,
            wins: 0,
            loses: 0,
            url,
          }
      setDataToArena(dataToArena)
    }
  }, [arenaMembers, data])

  const handleIcon = endpoint => {
    if (endpoint === 'favouritesPokemons')
      pokemonIsInFavourite
        ? deleteFromServer(endpoint, idFavouritesFromJsonServer)
        : postDataOnServer(endpoint, dataToFavourites)
    else {
      if (pokemonIsInArena)
        deleteFromServer(endpoint, idArenaMemberFromJsonServer)
      else {
        arenaMembers.length === 2
          ? setFullArenaWarning(true)
          : postDataOnServer(endpoint, dataToArena)
      }
    }
  }

  const deleteFromServer = async (endpoint, id) => {
    await axios
      .delete(`http://localhost:3000/${endpoint}/${id}`)
      .then(response => {
        endpoint === 'arenaMembers'
          ? getArenaMembers()
          : getFavouritesPokemons()
        showDeleteSuccesOnConsole()
      })
      .catch(error => console.error('There was error: ', error))
  }

  const postDataOnServer = async (endpoint, data) =>
    await axios
      .post(`http://localhost:3000/${endpoint}`, data)
      .then(response =>
        endpoint === 'arenaMembers'
          ? getArenaMembers()
          : getFavouritesPokemons()
      )
      .catch(error => showErrorMessageOnConsole(error))

  const getFavouritesPokemons = async () =>
    await axios
      .get('http://localhost:3000/favouritesPokemons')
      .then(response => setFavouritesPokemons(response.data))
      .catch(error => showErrorMessageOnConsole(error))

  const getArenaMembers = async () =>
    await axios
      .get('http://localhost:3000/arenaMembers')
      .then(response => {
        setArenaMembers(response.data)
      })
      .catch(error => showErrorMessageOnConsole(error))

  return (
    <S.Wrapper>
      {error && <h1>Error:{error}</h1>}
      {loading && (
        <>
          <CircularProgress />
          <p>...LOADING</p>
        </>
      )}
      {data && (
        <>
          <S.ImgWrapper>
            <S.Img
              src={`${data?.sprites.other.dream_world.front_default}`}
              alt={data?.name}
            />
          </S.ImgWrapper>
          <Description data={data} />

          <S.FavoriteIcon
            fav={pokemonIsInFavourite}
            onClick={() => handleIcon('favouritesPokemons')}
            sx={{ fontSize: '60px' }}
          />
          <S.StadiumIcon
            sx={{ fontSize: '60px' }}
            onClick={() => handleIcon('arenaMembers')}
            inarena={pokemonIsInArena}
          />

          <S.ArenaMember warning={arenaMembers?.length === 2}>
            {`${arenaMembers?.length}/2`}
          </S.ArenaMember>
          {fullArenaWarning && (
            <S.FullArenaInfo>Arena jest pełna</S.FullArenaInfo>
          )}
        </>
      )}
    </S.Wrapper>
  )
}

export default PokemonDetails
// useEffect(() => {
//   if (data) {
//     // const isInArena = checkPokemonIsInArr(statsFromJsonServer)
//     // const isInFavourties = checkPokemonIsInArr(favouritesPokemons)

//     const dataToArena = pokemonIsInArena
//       ? arenaMembers.map(({ name, wins, loses, experience }, index) => {
//           if (name === id) {
//             const id = arenaMembers[index].id
//             setIdArenaMemberFromJsonServer(id)
//             return {
//               name: id,
//               experience,
//               height,
//               weight,
//               speed,
//               wins,
//               loses,
//               url,
//             }
//           }
//         })
//       : {
//           name: id,
//           experience: base_experience,
//           height,
//           weight,
//           speed,
//           wins: 0,
//           loses: 0,
//           url,
//         }

//     // {setExperience(data?.base_experience)}

//     setDataToArena(dataToArena)

//     // setDataToFavourites(dataToSendToFavourites)
//     // console.log(pokemonIsInFavourite, 'pokemonIsInFavourite')
//     // pokemonIsInFavourite
//     //   ? favouritesPokemons.map(({ name }, index) => {
//     //       if (name === id) {
//     //         const id = favouritesPokemons[index].id
//     //         console.log(id, 'favouritesPokemons id w useEffect')
//     //         setIdFavouritesFromJsonServer(id)
//     //       }
//     //     })
//     //   : setDataToFavourites(dataToSendToFavourites)

//     // postDataOnServer('favouritesPokemons', dataToSendToFavourites)
//   }
// }, [])

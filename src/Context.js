import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

const Context = createContext()

export function ContextProvider({ children }) {
  const [loggedUser, setLoggedUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [clickedPokemonData, setClickedPokemonData] = useState(null)
  const [link, setLink] = useState(null)
  const [value, setValue] = useState('')
  const [arenaMembers, setArenaMembers] = useState([])
  const [incrisedStats, setIncrisedStats] = useState([])
  const [statsFromJsonServer, setStatsFromJsonServer] = useState(null)
  const [page, setPage] = useState(1)
  const [pokemonsArrayFromApi, setPokemonsArrayFromApi] = useState(null)
  const [filteredPokemons, setFilteredPokemons] = useState(null)
  const [favouritesPokemons, setFavouritesPokemons] = useState(null)
  const [usersList, setUsersList] = useState(null)
  const showDeleteSuccesOnConsole = () => console.log('Delete succes')
  const showErrorMessageOnConsole = error => console.log('Error:', error)

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('logged'))
    setLoggedUser(loggedUser)
    ;(async () =>
      await axios
        .get(`http://localhost:3000/stats`)
        .then(response => setStatsFromJsonServer(response.data))
        .catch(error => console.error('There was error : ', error)))()
    ;(async () =>
      await axios
        .get(`http://localhost:3000/arenaMembers`)
        .then(response => setArenaMembers(response.data))
        .catch(error => console.error('There was error : ', error)))()
    ;(async () =>
      await axios
        .get(`http://localhost:3000/favouritesPokemons`)
        .then(response => setFavouritesPokemons(response.data))
        .catch(error => console.error('There was error : ', error)))()
    ;(async () =>
      await axios
        .get(`http://localhost:3000/users`)
        .then(response => setUsersList(response.data))
        .catch(error => console.error('There was error : ', error)))()

    const logged = JSON.parse(localStorage.getItem('logged'))
    setLoggedUser(logged)
  }, [])

  useEffect(() => {
    const offset = page === 1 ? 0 : (page - 1) * 15
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=15`
    ;(async () =>
      await axios
        .get(url)
        .then(response => {
          setPokemonsArrayFromApi(response.data.results)
          setFilteredPokemons(response.data.results)
        })
        .catch(error => console.error('There was error : ', error)))()
  }, [page])

  // useEffect(() => {
  //   console.log(loggedUser, 'loggedUser w context')
  //   if (loggedUser) {
  //     console.log(loggedUser, 'loggedUser')
  //     ;(async () =>
  //       await axios
  //         .get(`http://localhost:3000/users`)
  //         .then(response => setData(response))
  //         .catch(error => console.error('There was error : ', error)))()
  //   }
  // }, [loggedUser])

  const setData = response => {
    setUsersList(response)
    console.log(response)
    const data = response.data
    if (loggedUser) {
      data.map(({ name, data }) => {
        if (name === loggedUser.name) {
          setFavouritesPokemons(data.favouritesPokemons)
          setArenaMembers(data.arenaMembers)
          setStatsFromJsonServer(data.stats)
        }
      })
    }
  }
  // const getArenaMembers = async () => {
  //   await axios
  //     .get('http://localhost:3000/arenaMembers')
  //     .then(response => setArenaMembers(response.data))
  //     .catch(error => console.error('There was error : ', error))
  // }
  // const getStatsFromJsonServer = async () => {
  //   await axios
  //     .get('http://localhost:3000/arenaMembers')
  //     .then(response => setStatsFromJsonServer(response.data))
  //     .catch(error => console.error('There was error : ', error))
  // }

  return (
    <Context.Provider
      value={{
        showErrorMessageOnConsole,
        showDeleteSuccesOnConsole,
        favouritesPokemons,
        setFavouritesPokemons,
        clickedPokemonData,
        setClickedPokemonData,
        link,
        setLink,
        setPokemonsArrayFromApi,
        pokemonsArrayFromApi,
        filteredPokemons,
        setFilteredPokemons,
        page,
        setPage,
        loading,
        setLoading,
        error,
        setError,
        arenaMembers,
        setArenaMembers,
        incrisedStats,
        setIncrisedStats,
        value,
        setValue,
        setStatsFromJsonServer,
        statsFromJsonServer,
        loggedUser,
        setLoggedUser,
        usersList,
        setUsersList,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Context
// ;(async () =>
//   await axios
//     .get(`http://localhost:3000/${user}`)
//     .then(response => {
//       console.log(response)
//       setArenaMembers(response.data.arenaMembers)
//     })
//     .catch(error => console.error('There was error : ', error)))()
// ;(async () =>
//   await axios
//     .get(`http://localhost:3000/${user}`)
//     .then(response => setStatsFromJsonServer(response.data.stats))
//     .catch(error => console.error('There was error : ', error)))()

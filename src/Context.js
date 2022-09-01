import { createContext, useEffect, useState } from 'react'

const Context = createContext()

export function ContextProvider({ children }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [clickedPokemonData, setClickedPokemonData] = useState(null)
  const [link, setLink] = useState(null)
  // const [favourite, setFavourite] = useState(null)
  const [value, setValue] = useState('')
  // const [filteredArr, setFilteredArr] = useState([])
  const [pokemonsData, setPokemonsData] = useState(null)
  const [arenaMember, setArenaMember] = useState([])
  const [incrisedStats, setIncrisedStats] = useState([])
  const [statsFromDb, setStatsFromDb] = useState(null)
  const [firstStart, setFirstStart] = useState(false)
  const [page, setPage] = useState(1)
  const [pokemonsArr, setPokemonsArr] = useState(null)
  const [filteredArr, setFilteredArr] = useState(null)

  useEffect(() => {
    ;(async () => {
      const response = await fetch('http://localhost:3000/arena')
      const rowData = await response.json()
      setArenaMember(rowData)
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      const response = await fetch('http://localhost:3000/stats')
      const data = await response.json()
      setStatsFromDb(data)
    })()
  }, [arenaMember])

  useEffect(() => {
    const offset = page === 1 ? 0 : (page - 1) * 15
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=15`

    ;(async () => {
      const response = await fetch(url)
      const rowData = await response.json()
      setPokemonsArr(rowData.results)
      setFilteredArr(rowData.results)
    })()

    // setWarning(false)
    // setValue('')

    // setUrl(url)
  }, [page])

  return (
    <Context.Provider
      value={{
        item: 1,
        clickedPokemonData,
        setClickedPokemonData,
        link,
        setLink,
        // favourite,
        // setFavourite,
        pokemonsArr,
        setPokemonsArr,
        filteredArr,
        setFilteredArr,
        page,
        setPage,
        loading,
        setLoading,
        error,
        setError,
        arenaMember,
        setArenaMember,
        incrisedStats,
        setIncrisedStats,
        statsFromDb,
        setStatsFromDb,
        firstStart,
        setFirstStart,
        value,
        setValue,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Context

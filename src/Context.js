import { createContext, useEffect, useState } from 'react'

const Context = createContext()

export function ContextProvider({ children }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [clickedPokemonData, setClickedPokemonData] = useState(null)
  const [link, setLink] = useState(null)
  // const [favourite, setFavourite] = useState(null)
  const [value, setValue] = useState('')
  const [filteredArr, setFilteredArr] = useState([])
  const [pokemonsArr, setPokemonsArr] = useState([])
  const [arenaMember, setArenaMember] = useState([])
  const [incrisedStats, setIncrisedStats] = useState([])
  const [statsFromDb, setStatsFromDb] = useState(null)
  const [firstStart, setFirstStart] = useState(false)
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchFromDb()
    const filtered = pokemonsArr?.filter(({ name }) => name.includes(value))
    setFilteredArr(filtered)
  }, [pokemonsArr])

  const fetchFromDb = () => {
    ;(async () => {
      const response = await fetch('http://localhost:3000/stats')
      const data = await response.json()
      setStatsFromDb(data)
    })()
  }
  // useEffect(() => {
  //   ;(async () => {
  //     const response = await fetch('http://localhost:3000/arena')
  //     const data = await response.json()
  //     setArenaMember(data)
  //   })()
  // }, [])

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

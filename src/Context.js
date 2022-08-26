import { createContext, useEffect, useState } from 'react'

const Context = createContext()

export function ContextProvider({ children }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [clickedPokemonData, setClickedPokemonData] = useState(null)
  const [link, setLink] = useState(null)
  const [favourite, setFavourite] = useState([])
  const [value, setValue] = useState('')
  const [filteredArr, setFilteredArr] = useState([])
  const [pokemonsArr, setPokemonsArr] = useState([])
  const [arenaMember, setArenaMember] = useState([])
  const [incrisedStats, setIncrisedStats] = useState([])
  const [stats, setStats] = useState(null)
  const [firstStart, setFirstStart] = useState(false)
  const [pokemonToUpdate, setPokemonToUpdate] = useState(null)
  useEffect(() => {
    const filtered = pokemonsArr?.filter(({ name }) =>
      name.includes(value)
    )
    setFilteredArr(filtered)
  }, [pokemonsArr])

  const fetchFromDb = () => {
    ;(async () => {
      const response = await fetch('http://localhost:3000/stats')
      const data = await response.json()
      setStats(data)
    })()
  }

  useEffect(() => {
    // fetchFromDb()
    pokemonToUpdate && console.log(pokemonToUpdate, 'pokemonToUpdate')
    const isThere = stats?.some(
      ({ name }) => name === pokemonToUpdate.name
    )

    if (isThere) {
      stats?.map(({ name }, index) => {
        if (name === pokemonToUpdate.name) {
          console.log(stats[index].id, 'jezeli jest tam ')
          const newExp = pokemonToUpdate.experience
          putDataOnServer(name, index, newExp)
        }
      })
      return
    }

    postDataOnServer(pokemonToUpdate)
  }, [pokemonToUpdate])

  const postDataOnServer = async (pokemonToUpdate) => {
    console.log('poscik')
    await fetch(`http://localhost:3000/stats/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pokemonToUpdate),
    }).then((res) => {
      fetchFromDb()
    })
  }
  const putDataOnServer = async (name, index, newExp) => {
    // console.log(name, index, newExp, 'dance w put data')
    // console.log(stats[index].id, 'stats w put data')
    const id = stats[index].id
    await fetch(`http://localhost:3000/stats/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, experience: newExp }),
    }).then((res) => {
      fetchFromDb()
    })
  }

  return (
    <Context.Provider
      value={{
        item: 1,
        clickedPokemonData,
        setClickedPokemonData,
        link,
        setLink,
        favourite,
        setFavourite,
        pokemonsArr,
        setPokemonsArr,
        filteredArr,
        setFilteredArr,
        data,
        setData,
        loading,
        setLoading,
        error,
        setError,
        arenaMember,
        setArenaMember,
        incrisedStats,
        setIncrisedStats,
        stats,
        setStats,
        firstStart,
        setFirstStart,
        setPokemonToUpdate,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Context

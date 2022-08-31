import { useContext, useEffect, useState } from 'react'
import Context from '../../Context'
import SimplePokemonCard from '../../components/simplePokemonCard/SimplePokemonCard'
import pokeball from '../../images/pokeball.png'
import BackHomeButton from '../../components/BackHomeButton'
import sword from '../../images/swords.png'
import { S } from './style'

const Arena = () => {
  const { arenaMember, setArenaMember, statsFromDb, setStatsFromDb } =
    useContext(Context)
  const [winner, setWinner] = useState(null)
  const [loser, setLoser] = useState(null)

  useEffect(() => {
    ;(async () => {
      const response = await fetch('http://localhost:3000/arena')
      const rowData = await response.json()
      setArenaMember(rowData)
    })()
  }, [])

  useEffect(() => {
    if (winner) {
      winner?.map((pokemon, index) => {
        if (winner?.length === 2) {
          console.log(pokemon, index, 'pokemony do updatu')
          changeWinnerStatsFromDb(5, index)
          return
        }
        // changeWinnerStatsFromDb(10, index)
      })

      const alertMessage =
        winner?.length === 2
          ? `Remis. ${winner[0].name.toUpperCase()} i ${winner[1].name.toUpperCase()} otrzymują po 5 Exp`
          : `Zwyciężył ${winner[0].name.toUpperCase()}. Otrzymuje on +10 Exp.`

      alert(alertMessage)
    }
  }, [winner])

  // useEffect(() => {
  //   loser && changeLoserstatsFromDb()
  // }, [loser])

  const deleteFromServer = async index => {
    await fetch(`http://localhost:3000/arena/${index}`, {
      method: 'DELETE',
    })
  }
  const handleButton = () => {
    // const pokemonPowerArr = arenaMember.map(pokemon =>
    //   countPokemonPower(pokemon)
    // )

    const pokemonOne = 1
    const pokemonTwo = 1
    if (pokemonOne === pokemonTwo) {
      setWinner([arenaMember[0], arenaMember[1]])
    }
    // } else if (pokemonOne > pokemonTwo) {
    //   setWinner([arenaMember[0]])
    //   setLoser(arenaMember[1])
    // } else {
    //   setWinner([arenaMember[1]])
    //   setLoser(arenaMember[0])
    // }
    const indexOne = arenaMember[0].id
    const indexTwo = arenaMember[1].id

    deleteFromServer(indexOne)
    deleteFromServer(indexTwo)
    setArenaMember([])
  }
  // const fetchArenaMember = () => {
  //   ;(async () => {
  //     const response = await fetch('http://localhost:3000/arena')
  //     const data = await response.json()
  //     console.log(data, 'dataw  fetch arena member ')
  //     setArenaMember(data)
  //   })()
  // }
  //  useEffect(are)
  const countPokemonPower = pokemon => {
    const { experience, height, weight, speed } = pokemon
    const pokemonPower = experience * weight * height * speed
    return pokemonPower
  }
  const postDataOnServer = async data => {
    console.log(data, 'data w post')

    // console.log(name, experience, wins, loses)
    await fetch(`http://localhost:3000/stats/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data }),
    })
  }
  // useEffect(() => {
  //   console.log(arenaMember, 'arena member w use effect')
  // }, [arenaMember])
  // const fetchFromDb = () => {
  //   ;(async () => {
  //     const response = await fetch('http://localhost:3000/arena')
  //     const data = await response.json()
  //     setArenaMember(data)
  //   })()
  // }
  // const putDataOnServer = async (name, experience, wins, loses, index) => {
  //   const id = statsFromDb[index].id
  //   await fetch(`http://localhost:3000/stats/${id}`, {
  //     method: 'PUT',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ name, experience, wins, loses }),
  //   })
  // }

  const checkPokemonIsinDb = status =>
    statsFromDb?.some(({ name }) => name === status.name)

  const changeWinnerStatsFromDb = (amountOfExp, indexOfWinner) => {
    console.log(indexOfWinner)
    const isThere = checkPokemonIsinDb(winner[indexOfWinner])

    if (isThere) {
      statsFromDb?.map(({ name, experience, wins, loses }, index) => {
        if (name === winner[indexOfWinner].name) {
          console.log('tu sie wykona')
          const newExperience = experience + amountOfExp
          const newWins = wins + 1
          // putDataOnServer(name, newExperience, newWins, loses, index)
        }
      })
    } else {
      console.log('nie ma w array', indexOfWinner)
      console.log(winner, 'winner')
      const data = {
        name: winner[indexOfWinner].name,
        experience: winner[indexOfWinner].experience + amountOfExp,
        wins: 1,
        loses: 0,
      }
      // const name = winner[indexOfWinner].name
      // const experience = winner[indexOfWinner].experience + amountOfExp
      // const wins = 1
      // const loses = 0

      fetch(`http://localhost:3000/stats/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data }),
      })

      // postDataOnServer(data)
    }
  }

  // const changeLoserstatsFromDb = () => {
  //   const isThere = checkPokemonIsinDb(loser)

  //   if (isThere) {
  //     statsFromDb?.map(({ name, experience, wins, loses }, index) => {
  //       if (name === loser.name) {
  //         const newLoses = loses + 1
  //         putDataOnServer(name, experience, wins, newLoses, index)
  //       }
  //     })
  //   } else {
  //     const name = loser.name
  //     const experience = loser.data.base_experience
  //     const wins = 0
  //     const loses = 1
  //     postDataOnServer(name, experience, wins, loses)
  //   }
  // }

  return (
    <S.Wrapper octagon="../images/octagon.jpg">
      <S.PlaceholderWrapper>
        <S.Placeholder>
          {arenaMember[0] ? (
            <SimplePokemonCard arena url={arenaMember[0].url} />
          ) : (
            <img src={pokeball} alt="pokeball" />
          )}
        </S.Placeholder>
        <S.Button disabled={arenaMember.length !== 2} onClick={handleButton}>
          <S.Img src={sword} />
          <h1>Walcz</h1>
        </S.Button>
        <S.Placeholder>
          {arenaMember[1] ? (
            <SimplePokemonCard arena url={arenaMember[1].url} />
          ) : (
            <img src={pokeball} alt="pokeball" />
          )}
        </S.Placeholder>
      </S.PlaceholderWrapper>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <BackHomeButton arena />
      </div>
    </S.Wrapper>
  )
}

export default Arena

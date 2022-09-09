import { useContext, useEffect, useState } from 'react'
import Context from '../../Context'
import SimplePokemonCard from '../../components/simplePokemonCard/SimplePokemonCard'
import pokeball from '../../images/pokeball.png'
import BackHomeButton from '../../components/backHomeButton/BackHomeButton'
import sword from '../../images/swords.png'
import { S } from './Arena.styled'
import axios from 'axios'

const Arena = () => {
  const {
    statsFromJsonServer,
    arenaMembers,
    setArenaMembers,
    setStatsFromJsonServer,
  } = useContext(Context)

  const [draw, setDraw] = useState(false)
  const [numDelete, setNumDelete] = useState(0)

  const checkPokemonIsInArr = winner =>
    statsFromJsonServer?.some(({ name }) => name === winner.name)

  const countPokemonPower = pokemon => {
    const { experience, height, weight, speed } = pokemon
    const pokemonPower = experience * weight * height * speed
    return pokemonPower
  }

  const alertMessage = winner => {
    console.log(winner, 'winner')
    const alertMessage = `Zwyciężył ${winner.toUpperCase()}. Otrzymuje on +10 Exp.`

    alert(alertMessage)
  }

  const getStatsFromJsonServer = async () =>
    await axios
      .get('http://localhost:3000/stats')
      .then(response => setStatsFromJsonServer(response.data))
      .catch(error => console.log(error))

  useEffect(() => {
    if (numDelete === 2) {
      setArenaMembers([])
      getStatsFromJsonServer()
    }
  }, [numDelete])

  const checkPokemonIsInJsonServer = (
    data,
    status,
    experienceToAdd,
    idToDelete
  ) => {
    const isThere = checkPokemonIsInArr(data)

    if (isThere)
      statsFromJsonServer?.map(({ name, experience, wins, loses, id }) => {
        if (name === data.name) {
          if (status === 'winner') {
            const newWinnerData = {
              name,
              experience: experience + experienceToAdd,
              wins: wins + 1,
              loses,
            }
            if (draw) {
              return
            }
            putDataOnServer(newWinnerData, id)
            deleteFromServer(idToDelete)
          } else {
            const newLoserData = {
              name,
              experience,
              wins,
              loses: loses + 1,
            }
            putDataOnServer(newLoserData, id)
            deleteFromServer(idToDelete)
          }
        }
      })
    else {
      if (status === 'winner') {
        const newWinnerData = {
          name: data?.name,
          experience: data?.experience + experienceToAdd,
          wins: 1,
          loses: 0,
        }
        if (draw) {
          return
        }
        postDataOnServer(newWinnerData)
        deleteFromServer(idToDelete)
      } else {
        const newLoserData = {
          name: data?.name,
          experience: data?.experience,
          wins: 0,
          loses: 1,
        }
        postDataOnServer(newLoserData)
        deleteFromServer(idToDelete)
      }
    }
  }

  const deleteFromServer = async idToDelete =>
    await axios
      .delete(`http://localhost:3000/arenaMembers/${idToDelete}`)
      .then(response => setNumDelete(prev => prev + 1))
      .catch(error => console.error('There was error: ', error))

  const putDataOnServer = async (data, id) =>
    await axios
      .put(`http://localhost:3000/stats/${id}`, { ...data })
      .then(response => console.log(response, 'data was update'))
      .catch(error => console.log(error))

  const postDataOnServer = async data =>
    await axios
      .post('http://localhost:3000/stats', { ...data })
      .then(response => console.log(response, 'data was send'))
      .catch(error => console.log(error))

  const handleButton = () => {
    const pokemonPowerArr = arenaMembers.map(pokemon =>
      countPokemonPower(pokemon)
    )
    const pokemonOne = pokemonPowerArr[0]
    const pokemonTwo = pokemonPowerArr[1]

    if (pokemonOne === pokemonTwo) {
      setDraw(true)
      arenaMembers.map((arenaMember, index) => {
        checkPokemonIsInJsonServer(arenaMembers[index], 'winner', 5, true)
      })
    } else if (pokemonOne > pokemonTwo) {
      const winnerIdToDelete = arenaMembers[0].id
      const loserIdToDelete = arenaMembers[1].id
      const winner = arenaMembers[0].name
      alertMessage(winner)

      checkPokemonIsInJsonServer(
        arenaMembers[0],
        'winner',
        10,
        winnerIdToDelete
      )
      checkPokemonIsInJsonServer(arenaMembers[1], 'loser', 0, loserIdToDelete)
    } else {
      const winnerIdToDelete = arenaMembers[1].id
      const loserIdToDelete = arenaMembers[0].id
      const winner = arenaMembers[1].name
      alertMessage(winner)

      checkPokemonIsInJsonServer(
        arenaMembers[1],
        'winner',
        10,
        winnerIdToDelete
      )
      checkPokemonIsInJsonServer(arenaMembers[0], 'loser', 0, loserIdToDelete)
    }
  }

  return (
    <S.Wrapper octagon="../images/octagon.jpg">
      {/* {num === 2 && (
        <div style={{ backgroundColor: 'red' }}>
          <h1></h1>
          <button
            onClick={() => {
              // setNum(0)
              const indexOne = arenaMembers[0].id
              const indexTwo = arenaMembers[1].id
              deleteFromServer(indexOne)
              deleteFromServer(indexTwo)
              setArenaMembers([])
            }}
          >
            asdasdasd
          </button>
        </div>
      )} */}
      <S.PlaceholderWrapper>
        <S.Placeholder>
          {arenaMembers[0] ? (
            <SimplePokemonCard arena url={arenaMembers[0].url} />
          ) : (
            <img src={pokeball} alt="pokeball" />
          )}
        </S.Placeholder>

        <S.Button disabled={arenaMembers.length !== 2} onClick={handleButton}>
          <S.Img src={sword} />
          <h1>Walcz</h1>
        </S.Button>
        <S.Placeholder>
          {arenaMembers[1] ? (
            <SimplePokemonCard arena url={arenaMembers[1].url} />
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

// useEffect(() => {
//   ;(async () => {
//     const response = await fetch('http://localhost:3000/arena')
//     const rowData = await response.json()
//     setArenaMember(rowData)
//   })()
// }, [])
// useEffect(() => {
//   loser && changeLoserStatsFromDb()
// }, [loser])

// const deleteFromServer = async index => {
//   await axios
//     .delete(`http://localhost:3000/arena/${index}`)
//     .then(response => console.log(response))
//     .catch(error => console.log('to byl error', error))
// }

// useEffect(() => {
//   if (winner) {
//     console.log(winner, 'winner w useeffect')
//     checkPokemonIsInJsonServer(winner)
//     alertMessage()
//   }
// }, [winner])
// const findWinnerInStatsInJsonServer = pokemon => {
//   console.log(pokemon, 'pokemons')
//   statsFromJsonServer.map(({ name, experience, loses, wins }) => {
//     console.log(statsFromJsonServer, 'statsFromJsonServer')
//     console.log(statsFromJsonServer.length, 'length')
//     if (name === pokemon.name) {
//       const data = {
//         name,
//         experience: experience + 10,
//         wins,
//         loses,
//       }
//       setWinnerData(data)
//     }
//   })
// }
const handleButton = () => {
  //   console.log(arenaMembers, 'statsFromJsonServer po kliknieciu w button')
  //   const pokemonPowerArr = arenaMembers.map(pokemon =>
  //     countPokemonPower(pokemon)
  //   )
  //   const pokemonOne = pokemonPowerArr[0]
  //   const pokemonTwo = pokemonPowerArr[1]
  //   if (pokemonOne === pokemonTwo) setWinner([arenaMembers[0], arenaMembers[1]])
  //   else if (pokemonOne > pokemonTwo) {
  //     setWinner([arenaMembers[0]])
  //     setLoser(arenaMembers[1])
  //   } else {
  //     setWinner([arenaMembers[1]])
  //     setLoser(arenaMembers[0])
  //   }
}
const changeWinnerStatsFromDb = (amountOfExp, indexOfWinner) => {
  // checkPokemonIsInJsonServer(winner[indexOfWinner])
  // const checkPokemonIsInDb=
  // if (isThere) {
  //   statsFromJsonServer?.map(({ name, experience, wins, loses }, index) => {
  //     if (name === winner[indexOfWinner].name) {
  //       console.log('tu sie wykona')
  //       const newExperience = experience + amountOfExp
  //       const newWins = wins + 1
  //       putDataOnServer(name, newExperience, newWins, loses, index)
  //     }
  //   })
  // } else {
  //   const data = {
  //     name: winner[indexOfWinner].name,
  //     experience: winner[indexOfWinner].experience + amountOfExp,
  //     wins: 1,
  //     loses: 0,
  //   }
  //   postDataOnServer(data)
  // }
}

// const changeLoserStatsFromDb = () => {
//   console.log(loser, 'loser')
//   const isThere = checkPokemonIsInJsonServer(loser)

//   if (isThere) {
//     statsFromJsonServer?.map(({ name, experience, wins, loses }, index) => {
//       if (name === loser.name) {
//         const newLoses = loses + 1
//         putDataOnServer(name, experience, wins, newLoses, index)
//       }
//     })
//   } else {
//     const data = {
//       name: loser.name,
//       experience: loser.experience,
//       wins: 0,
//       loses: 1,
//     }

//     postDataOnServer(data)
//   }
// }
// console.log(isThere, 'isThere')
// console.log(statsFromJsonServer, 'statsFromJsonServer')
// if (isThere)
//   statsFromJsonServer.forEach(({ name, experience, wins, lose, id }) => {
//     const idInArenaMembers = winner.id
//     if (name === winner.name) {
//       const exp = winner.length === 2 ? 5 : 10
//       const data = { name, experience: experience + exp, wins, lose }
//       putDataOnServer(data, id, idInArenaMembers)
//       return
//     }
//   })
// else {
//   // console.log(winner, 'winner w else')
//   // data = { name: , experience: 142, wins: 0, loses: 1 }
// }

// const [loser, setLoser] = useState(null)

// const alertMessage = () => {
//   const alertMessage =
//     winner?.length === 2
//       ? `Remis. ${winner[0].name.toUpperCase()} i ${winner[1].name.toUpperCase()} otrzymują po 5 Exp`
//       : `Zwyciężył ${winner[0].name.toUpperCase()}. Otrzymuje on +10 Exp.`

//   alert(alertMessage)
// }
// useEffect(() => {
//   if (deleteNum === 2) {
//     console.log(deleteNum, 'delete num w useeffect')
//     getStatsFromJsonServer()
//     setArenaMembers([])
//   }
// }, [deleteNum])

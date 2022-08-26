import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import Context from '../Context'
import SimplePokemonCard from '../components/SimplePokemonCard'
import pokeball from '../images/pokeball.png'
import BackHomeButton from '../components/BackHomeButton'
import stadion from '../images/pokemonStadion.png'
import sword from '../images/swords.png'

const S = {
  Wrapper: styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-image: url(${stadion});
    background-repeat: round;
    position: relative;
  `,
  Placeholder: styled.div`
    height: 400px;
    width: 310px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    background-color: lightgrey;
    -webkit-box-shadow: 8px 8px 24px 0px rgba(155, 155, 159, 1);
    -moz-box-shadow: 8px 8px 24px 0px rgba(155, 155, 159, 1);
    box-shadow: 8px 8px 24px 0px rgba(155, 155, 159, 1);
  `,
  Img: styled.img`
    max-block-size: -webkit-fill-available;
  `,
  PlaceholderWrapper: styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-evenly;
  `,
  Button: styled.button`
    padding: 10px;
    height: 150px;
    border-radius: 5px;
    background-color: #c62828;
    border: none;
    cursor: pointer;
    &:hover {
      animation: shake 0.5s;
      animation-iteration-count: infinite;
      @keyframes shake {
        0% {
          transform: translate(1px, 1px) rotate(0deg);
        }
        10% {
          transform: translate(-1px, -2px) rotate(-1deg);
        }
        20% {
          transform: translate(-3px, 0px) rotate(1deg);
        }
        30% {
          transform: translate(3px, 2px) rotate(0deg);
        }
        40% {
          transform: translate(1px, -1px) rotate(1deg);
        }
        50% {
          transform: translate(-1px, 2px) rotate(-1deg);
        }
        60% {
          transform: translate(-3px, 1px) rotate(0deg);
        }
        70% {
          transform: translate(3px, 1px) rotate(-1deg);
        }
        80% {
          transform: translate(-1px, -1px) rotate(1deg);
        }
        90% {
          transform: translate(1px, 2px) rotate(0deg);
        }
        100% {
          transform: translate(1px, -2px) rotate(-1deg);
        }
      }
    }
  `,
}
const Arena = () => {
  const { arenaMember, setArenaMember, stats, setPokemonToUpdate } =
    useContext(Context)
  const [rightExp, setRightExp] = useState(null)
  const [winner, setWinner] = useState(null)
  const handleButton = () => {
    const powerArr = arenaMember.map((pokemon) =>
      winnerPattern(pokemon)
    )
    const pokemonOne = powerArr[0]
    const pokemonTwo = powerArr[1]
    const winnerPokemon =
      pokemonOne > pokemonTwo ? arenaMember[0] : arenaMember[1]
    setWinner(winnerPokemon)
    setArenaMember([])
    alert(`Wygrał ${winnerPokemon.name} + 10 Exp`)
  }

  const increaseWinnerExp = () => {
    if (stats?.length === 0) {
      setPokemonToUpdate({
        name: winner.name,
        experience: winner.data.base_experience + 10,
      })
      return
    }
    const isThere = stats?.some(
      ({ name, experience }, index) => name === winner.name
    )
    if (isThere) {
      stats?.map(({ name, experience }, index) => {
        if (name === winner.name) {
          setRightExp(experience + 10)
        }
      })
    } else
      stats?.map(({ name }, index) => {
        const experience =
          name === winner?.name
            ? stats[index]?.experience + 10
            : winner?.data.base_experience + 10
        setRightExp(experience)
      })
  }
  useEffect(() => {
    if (winner) {
      increaseWinnerExp()
    }
  }, [winner])

  useEffect(() => {
    winner &&
      rightExp &&
      setPokemonToUpdate({
        name: winner?.name,
        experience: rightExp,
      })
  }, [rightExp])
  const winnerPattern = (pokemon) => {
    const { base_experience, height, weight, stats } = pokemon.data
    const speed = stats[5].base_stat
    const pokemonPower = base_experience * weight * height * speed
    return pokemonPower
  }
  const fetch = () => console.log('fetchowanie')

  return (
    <S.Wrapper octagon='../images/octagon.jpg'>
      <S.PlaceholderWrapper>
        <S.Placeholder>
          {arenaMember[0] ? (
            <SimplePokemonCard arena url={arenaMember[0].url} />
          ) : (
            <img src={pokeball} alt='pokeball' />
          )}
        </S.Placeholder>
        <S.Button
          disabled={arenaMember.length !== 2}
          onClick={handleButton}
        >
          <S.Img src={sword} />
          <h1>Walcz</h1>
        </S.Button>
        <S.Placeholder>
          {arenaMember[1] ? (
            <SimplePokemonCard arena url={arenaMember[1].url} />
          ) : (
            <img src={pokeball} alt='pokeball' />
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
// const postDataOnServerFunc = (stats) => {
//   console.log(stats)
//   if (stats.length === 0) {
//     return
//   }
//   // ;(async () => {
//   //   await fetch('http://localhost:3000/stats/', {
//   //     method: 'DELETE',
//   //   }).then(() => {

//   ;(async () => {
//     fetch('http://localhost:3000/stats', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(stats),
//     }).then(() => {
//       console.log('new blog added')
//     })
//   })()
// }

// useEffect(() => {
//   if (stats.length === 0) {
//     console.log('return bo pusto')
//     return
//   }
//   postDataOnServerFunc(stats)
//   console.log(stats, 'stats w useeffect')
// }, [stats])
//pomysł //dodac ranking najsilniejszych pokemonow obliczyc ich moc wiec funckje do obliczania mocy pokemona musze zrobic do oddzielnego komponentu
// pozniej wygenerowac ta liste w oddzielnym przycisku
//pozbyc sie shakingu z disabled buttona
// useEffect(() => {
//   console.log(stats, 'wyslij tu dane na serwer')
//   // console.log(incrisedStats)
//   if (stats === []) {
//     console.log(stats, 'puysta')
//     return
//   }
//   postDataOnServerFunc(stats)
// }, [stats])
// const increaseWinnerExp = (winner) => {
// const is = stats?.some(({ name }) => name === winner.name)
// console.log(stats, 'stats w winner exp')
// if (false) {
// console.log('jest w statsach')
// stats?.forEach(({ name }, index) => {
//   if (name === winner.name) {
//     const newArr = [...stats]
//     newArr[index].experience = newArr[index].experience + 10
//     setStats(newArr)
//   }
// })
//   } else {
//     console.log('niue ma  w statsach')
//     setStats({
//       name: winner.name,
//       experience: winner.data.base_experience + 10,
//     })
//   }
// }
// console.log(winner)

// if (stats.length === 0) {
//   setRightExp(winner?.data.base_experience + 10)
//   console.log(
//     winner?.data.base_experience,
//     'winner?.data.base_experience'
//   )
//   return
// } else
//   stats?.map(({ name }, index) => {
//     if (name === winner.name) {
//       console.log(
//         stats[index].experience,
//         'winner.base_experience'
//       )
//     }

//     const experience =
//       name === winner?.name
//         ? stats[index]?.experience + 10
//         : winner?.data.base_experience + 10
//     setRightExp(experience)
//   })
// // console.log(winner)
// setPokemonToUpdate({
//   name: winner.name,
//   experience: rightExp,
// })

import styled from 'styled-components'
import { useContext, useEffect, useState } from 'react'
import Context from '../Context'
import FightStats from './FightStats'
const S = {
  DescripionWrapper: styled.div`
    display: flex;
    width: 100%;
    height: 50%;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-top: 10px;
  `,
  DoubleDecripionWrapper: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  `,
  SimpleDecripionWrapper: styled.div`
    display: flex;
    justify-content: center;
    flex: 1;
  `,
  ImgWrapper: styled.div`
    height: 50%;
    width: 100%;
    justify-content: center;
    align-items: center;
    display: flex;
    padding: 10px;
    box-sizing: border-box;
  `,
  Span: styled.span`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #848383;
  `,
  SpanPropsName: styled.div`
    font-weight: 700;
    font-size: 16px;
    color: black;
  `,
  H1: styled.h1`
    padding: 0;
    margin: 0;
    font-size: ${({ details }) => (details ? '40px' : '30px')};
  `,

  StatisticWrapper: styled.div`
    display: flex;
    flex: 1;
    width: 100%;
    margin-top: 7px;
  `,
}
const Description = ({ data, details }) => {
  const { statsFromDb } = useContext(Context)
  const [isInstatsFromDb, setIsInstatsFromDb] = useState(false)
  const [totallyWins, setTotallyWins] = useState(null)
  const [totallyLoses, setTotallyLoses] = useState(null)
  const [exp, setExp] = useState(null)

  const firstLetterUppercase = () => {
    const newName = `${data?.name
      ?.substring(0, 1)
      .toUpperCase()}${data?.name.substring(1, data?.name.length)}`
    return newName
  }
  useEffect(() => {
    setExp(data?.base_experience)
    if (statsFromDb) {
      const isThere = statsFromDb?.some(({ name }) => name === data?.name)
      setIsInstatsFromDb(isThere)

      isThere
        ? statsFromDb?.map(({ name, experience, wins, loses }) => {
            if (name === data?.name) {
              setExp(experience)
              setTotallyWins(wins)
              setTotallyLoses(loses)
            }
          })
        : setExp(data?.base_experience)
    }
  }, [statsFromDb])

  return (
    <S.DescripionWrapper>
      {isInstatsFromDb && (
        <FightStats totallyWins={totallyWins} totallyLoses={totallyLoses} />
      )}
      <S.H1 details={details}>{firstLetterUppercase()}</S.H1>
      <S.StatisticWrapper>
        <S.DoubleDecripionWrapper>
          <S.Span>
            {data?.height}
            <S.SpanPropsName> Height</S.SpanPropsName>
          </S.Span>
          <S.Span>
            {data?.weight}
            <S.SpanPropsName>Weight</S.SpanPropsName>
          </S.Span>
        </S.DoubleDecripionWrapper>
        <S.DoubleDecripionWrapper>
          <S.Span>
            {exp}
            <S.SpanPropsName>Base experience</S.SpanPropsName>
          </S.Span>
          <S.Span>
            {data?.abilities[0]?.ability.name}
            <S.SpanPropsName>Ability</S.SpanPropsName>
          </S.Span>
        </S.DoubleDecripionWrapper>
      </S.StatisticWrapper>
    </S.DescripionWrapper>
  )
}

export default Description

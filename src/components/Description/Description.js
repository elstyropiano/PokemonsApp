import { useContext, useEffect, useState } from 'react'
import Context from '../../Context'
import { S } from './Description.styled'

const Description = ({ data, details }) => {
  const { statsFromJsonServer } = useContext(Context)
  const [experience, setExperience] = useState(null)
  const [name, setName] = useState(null)
  const checkPokemonIsInArr = array =>
    array?.some(({ name }) => name === data.name)

  useEffect(() => {
    const newName = `${data?.name
      ?.substring(0, 1)
      .toUpperCase()}${data?.name.substring(1, data?.name.length)}`
    setName(newName)
  }, [])

  useEffect(() => {
    const isThere = checkPokemonIsInArr(statsFromJsonServer)
    isThere
      ? statsFromJsonServer.map(({ name, experience }) => {
          if (name === data.name) setExperience(experience)
        })
      : setExperience(data.base_experience)
  }, [statsFromJsonServer])

  return (
    <S.DescripionWrapper>
      <S.H1 details={details}>{name}</S.H1>
      <S.StatisticWrapper>
        <S.DoubleDecripionWrapper>
          <S.Span>
            {data.height}
            <S.SpanPropsName> Height</S.SpanPropsName>
          </S.Span>
          <S.Span>
            {data.weight}
            <S.SpanPropsName>Weight</S.SpanPropsName>
          </S.Span>
        </S.DoubleDecripionWrapper>
        <S.DoubleDecripionWrapper>
          <S.Span>
            {experience}
            <S.SpanPropsName>Base experience</S.SpanPropsName>
          </S.Span>
          <S.Span>
            {data.abilities[0].ability.name}
            <S.SpanPropsName>Ability</S.SpanPropsName>
          </S.Span>
        </S.DoubleDecripionWrapper>
      </S.StatisticWrapper>
    </S.DescripionWrapper>
  )
}

export default Description

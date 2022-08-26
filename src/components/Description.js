import styled from 'styled-components'
import { useContext, useEffect } from 'react'
import Context from '../Context'
import { useState } from 'react'
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
}
const Description = ({ data, details }) => {
  const { stats } = useContext(Context)
  const [exp, setExp] = useState(null)
  const firstLetterUppercase = () => {
    const newName = `${data?.name
      ?.substring(0, 1)
      .toUpperCase()}${data?.name.substring(1, data?.name.length)}`
    return newName
  }
  useEffect(() => {
    const isThere = stats?.some(
      ({ name, experience }, index) => name === data.name
    )
    console.log(isThere)
    if (isThere) {
      stats?.map(({ name, experience }) => {
        if (name === data?.name) setExp(experience)
      })
      return
    }
    setExp(data.base_experience)

    // setRightExp()
  }, [])

  return (
    <S.DescripionWrapper>
      <S.H1 details={details}>{firstLetterUppercase()}</S.H1>
      <div
        style={{
          display: 'flex',
          flex: '1',
          width: '100%',
          marginTop: '7px',
        }}
      >
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
      </div>
    </S.DescripionWrapper>
  )
}

export default Description

// // useEffect(() => {

// if (stats?.length === 0) {
//   setRightExp(data.base_experience)
//   return
// }
// console.log('wykona sie tu')
// stats?.forEach(({ name, experience }) => {
//   const newExperience =
//     name === data?.name ? experience : data?.base_experience
//   if (data.name === 'charmeleon') {
//     console.log(newExperience, 'charmeleon')
//   }
//   setRightExp(newExperience)
// })

// // }, [])

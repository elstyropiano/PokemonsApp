import useFetch from '../../hooks/useFetch'
import { useEffect, useState } from 'react'
import { S } from './EditPokemonListElement.styled'
const EditPokemonListElement = ({ url, index }) => {
  const [data, loading, error] = useFetch(url)
  useEffect(() => {
    console.log(data)
  }, [data])
  return <S.Wrapper>{index}name</S.Wrapper>
}

export default EditPokemonListElement

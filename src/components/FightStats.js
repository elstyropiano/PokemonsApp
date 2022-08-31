import styled from '@emotion/styled'
import React from 'react'

const S = {
  Wrapper: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    background-color: red;
    padding: 10px;
    border-top-left-radius: 10px;
    border-bottom-right-radius: 10px;
    color: white;
    font-size: 12px;
    justify-content: center;
    align-items: flex-start;
    font-weight: 500;
  `,
  ShortcutSpan: styled.span`
    margin-right: 10px;
    width: 10px;
  `,
  Span: styled.span`
    display: flex;
  `,
}
const Fightstats = ({ totallyWins, totallyLoses }) => {
  return (
    <S.Wrapper>
      <div style={{ display: 'flex' }}>
        <S.ShortcutSpan>W:</S.ShortcutSpan>
        <S.Span>{`${totallyWins}`}</S.Span>
      </div>
      <div style={{ display: 'flex' }}>
        <S.ShortcutSpan>L:</S.ShortcutSpan>
        <S.Span>{`${totallyLoses}`}</S.Span>
      </div>
    </S.Wrapper>
  )
}

export default Fightstats

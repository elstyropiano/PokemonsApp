import styled from 'styled-components'

export const S = {
  Wrapper: styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: ${({ empty }) => (empty ? 'column' : 'row')};
    justify-content: center;
    margin-top: 100px;
  `,
  Img: styled.img`
    height: 400px;
    margin-top: 100px;
  `,
}

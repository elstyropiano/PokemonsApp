import styled from 'styled-components'

export const S = {
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

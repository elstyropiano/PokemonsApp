import styled from 'styled-components'
import StadiumIcon from '@mui/icons-material/Stadium'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ClearIcon from '@mui/icons-material/Clear'
export const S = {
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
    flex-direction: column;
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
  Img: styled.img`
    height: ${props => (props.details ? '180%' : '100%')};
    width: ${props => (props.details ? '60%' : '71%')};
  `,

  MainWrapper: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 400px;
    margin: ${({ arena }) => (arena ? '0 ' : '20px')};
    -webkit-box-shadow: 8px 8px 24px 0px rgba(155, 155, 159, 1);
    -moz-box-shadow: 8px 8px 24px 0px rgba(155, 155, 159, 1);
    box-shadow: 8px 8px 24px 0px rgba(155, 155, 159, 1);
    width: ${({ details }) => (details ? '80%' : '310px')};
    position: relative;
    border-radius: 10px;
    background-color: ${({ details }) => (details ? 'white' : 'lightgray')};
    &:hover {
      background-color: inherit;
      transform: ${({ list }) => (list ? 'scale(1.1)' : 'none')};
      transition: ease-in-out 0.2s;
    }
  `,
  PokemonWrapper: styled.div`
    display: flex;
    flex-direction: ${({ details }) => (details ? 'row' : 'column')};
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
  `,
  StadiumIcon: styled(StadiumIcon)`
    color: ${({ inarena }) => (inarena ? 'green' : 'inherit')};
    position: absolute;
    bottom: 0;
    left: 0;
    cursor: pointer;
  `,
  FavoriteIcon: styled(FavoriteIcon)`
    color: ${({ fav }) => (fav ? 'red' : 'inherit')};
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
  `,
  ArenaMember: styled.h1`
    left: 5px;
    bottom: 33px;
    position: absolute;
    color: ${({ warning }) => (warning ? 'red' : 'inherit')};
  `,
  FullArenaInfo: styled.span`
    position: absolute;
    bottom: 0;
    left: 72px;
    color: red;
  `,
  ClearIcon: styled(ClearIcon)`
    position: absolute;
    top: 0;
    right: 0;
    background-color: black;
    border-radius: 5px;
    &:hover {
      cursor: pointer;
      color: red;
    }
  `,
}

import styled from 'styled-components'
import StadiumIcon from '@mui/icons-material/Stadium'
import FavoriteIcon from '@mui/icons-material/Favorite'

export const S = {
  Wrapper: styled.div`
    height: 400px;
    width: 80%;
    -webkit-box-shadow: 8px 8px 24px 0px rgba(155, 155, 159, 1);
    -moz-box-shadow: 8px 8px 24px 0px rgba(155, 155, 159, 1);
    box-shadow: 8px 8px 24px 0px rgba(155, 155, 159, 1);
    border-radius: 10px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
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
  Img: styled.img`
    height: 180%;
    width: 80%;
  `,
  ArenaMember: styled.h1`
    left: 5px;
    bottom: 33px;
    position: absolute;
    color: ${({ warning }) => (warning ? 'red' : 'inherit')};
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
  FullArenaInfo: styled.span`
    position: absolute;
    bottom: 8px;
    left: 72px;
    color: red;
    font-weight: 600;
    font-size: 20px;
  `,
}

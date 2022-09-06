import styled from "styled-components";
import stadion from "../../images/pokemonStadion.png";
export const S = {
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
      animation: ${({ disabled }) => (disabled ? "none" : "shake 0.5s")};
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
};

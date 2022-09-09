import styled from 'styled-components'

export const S = {
  MainWrapper: styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(30, 29, 28, 0.1);
  `,
  FormWrapper: styled.div`
    display: flex;
    flex-direction: column;

    justify-content: center;
    border-radius: 10px;
    padding: 50px 20px;
    background-color: rgba(3, 79, 28, 0.1);
    width: 500px;
  `,
  ValidationErrorMessage: styled.span`
    color: #d32f2f;
  `,
}

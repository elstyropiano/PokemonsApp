import { S } from './BackHomeButton.styled'

const BackHomeButton = ({ arena }) => (
  <S.Link to="/">
    <S.Button variant={arena ? 'contained' : 'outlined'} color="error">
      Strona główna
    </S.Button>
  </S.Link>
)

export default BackHomeButton

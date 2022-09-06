import { S } from './FightStats.styled'

const Fightstats = ({ wins, loses }) => (
  <S.Wrapper>
    <S.Div>
      <S.ShortcutSpan>W:</S.ShortcutSpan>
      <S.Span>{`${wins}`}</S.Span>
    </S.Div>
    <S.Div>
      <S.ShortcutSpan>L:</S.ShortcutSpan>
      <S.Span>{`${loses}`}</S.Span>
    </S.Div>
  </S.Wrapper>
)

export default Fightstats

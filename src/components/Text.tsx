import styled from 'styled-components'

interface TextProps {
  children: React.ReactNode & React.ReactNode[]
}

const StyledText = styled.p`
  margin-block: 0;
  margin-block: 32px;
  color: #000000e5;
  font-family: ${props => props.theme.font.fontFamily};
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
`

export const Text: React.FC<TextProps> = ({ children }) => {
  return <StyledText>{children}</StyledText>
}

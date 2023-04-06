import styled from 'styled-components'

interface BlockquteProps {
  children: React.ReactNode & React.ReactNode[]
}

const StyledBlockquote = styled.blockquote`
  margin-inline: 0;
  margin-block: 0;
  margin-block: 32px;
  padding-left: 12px;
  border-left: 4px solid #c8c8c8;
`

export const Blockquote: React.FC<BlockquteProps> = ({ children }) => {
  return <StyledBlockquote>{children}</StyledBlockquote>
}

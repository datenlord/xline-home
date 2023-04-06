import styled from 'styled-components'

interface FontProps {
  type?: 'italic' | 'bold'
  children: React.ReactNode & React.ReactNode[]
}

const Bold = styled.strong`
  font-weight: ${props => props.theme.font.fontWeightBold};
`

export const Font: React.FC<FontProps> = ({ children, type = 'italic' }) => {
  switch (type) {
    case 'italic':
      return <em>{children}</em>
    case 'bold':
      return <Bold>{children}</Bold>
    default:
      return <em>{children}</em>
  }
}

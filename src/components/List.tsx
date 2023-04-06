import styled from 'styled-components'

interface ListProps {
  depth: number
  ordered: boolean
  className: string | undefined
  children: React.ReactNode & React.ReactNode[]
}

interface StyledListProps {
  ordered: boolean
}

interface ListItemProps {
  children: React.ReactNode & React.ReactNode[]
}

const StyledList = styled.ul<StyledListProps>`
  margin-block: 0;
  margin-block: 32px;
  padding-inline-start: ${props => props.theme.scale.scale03};
  list-style-type: ${props => (props.ordered ? 'decimal' : 'disc')};
`

const StyledListItem = styled.li`
  margin-block: 8px;
  font-weight: 400px;
  font-size: 18px;
  line-height: 28px;
`

export const List: React.FC<ListProps> = ({ ordered, children }) => {
  switch (ordered) {
    case false:
      return <StyledList ordered={ordered}>{children}</StyledList>
    case true:
      return (
        <StyledList as="ol" ordered={ordered}>
          {children}
        </StyledList>
      )
    default:
      return <StyledList ordered={ordered}>{children}</StyledList>
  }
}

export const ListItem: React.FC<ListItemProps> = ({ children }) => {
  return <StyledListItem>{children}</StyledListItem>
}

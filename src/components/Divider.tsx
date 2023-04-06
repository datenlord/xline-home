import styled from 'styled-components'

const StyledDivider = styled.div`
  height: 1px;
  margin-bottom: ${props => props.theme.scale.scale04};
  background: ${props => props.theme.color.neutral.gray08};
`

export const Divider = () => {
  return <StyledDivider />
}

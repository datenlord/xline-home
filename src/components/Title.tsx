import styled from 'styled-components'

interface TitleProps {
  level: number
  children: React.ReactNode & React.ReactNode[]
}

const StyledTitle = styled.h1`
  margin-block: 0;
  color: #000000e5;
  font-family: ${props => props.theme.font.fontFamily};
  font-weight: 700;
`

const Title1 = styled(StyledTitle)`
  margin-block: 48px;
  font-size: 48px;
  line-height: 56px;
`

const Title2 = styled(StyledTitle)`
  margin-block: 48px;
  font-size: 36px;
  line-height: 44px;
`

const Title3 = styled(StyledTitle)`
  margin-block: 40px;
  font-size: 28px;
  line-height: 36px;
`

const Title4 = styled(StyledTitle)`
  margin-block: 32px;
  font-size: 24px;
  line-height: 32px;
`

const Title5 = styled(StyledTitle)`
  margin-block: 32px;
  font-size: 20px;
  line-height: 28px;
`

const Title6 = styled(StyledTitle)`
  margin-block: 24px;
  font-size: 16px;
  line-height: 24px;
`

export const Title: React.FC<TitleProps> = ({ level, children }) => {
  const id = String(children).split(' ').join('-')

  switch (level) {
    case 1:
      return <Title1 id={id}>{children}</Title1>
    case 2:
      return (
        <Title2 id={id} as="h2">
          {children}
        </Title2>
      )
    case 3:
      return (
        <Title3 id={id} as="h3">
          {children}
        </Title3>
      )
    case 4:
      return (
        <Title4 id={id} as="h4">
          {children}
        </Title4>
      )
    case 5:
      return (
        <Title5 id={id} as="h5">
          {children}
        </Title5>
      )
    case 6:
      return (
        <Title6 id={id} as="h6">
          {children}
        </Title6>
      )
    default:
      return <Title1 id={id}>{children}</Title1>
  }
}

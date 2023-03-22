import styled from 'styled-components'

const FooterWrapper = styled.footer`
  background-image: url(src/assets/footer-background.svg);
  background-size: cover;
`

const FooterContainer = styled.div`
  max-width: 1440px;
  margin-inline: auto;
  padding-inline: 128px;
  padding-block: 64px;
`

const LinkClassContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
`

const LinkClass = styled.div`
  color: white;
  width: 200px;
`

const LinkClassTitle = styled.h2`
  padding-bottom: 32px;
  margin-bottom: 32px;
  font-weight: 500;
  font-size: 28px;
  line-height: 33.89px;
  text-transform: capitalize;
  border-bottom: 1px solid white;
`

const LinkList = styled.ul``

const LinkListItem = styled.li`
  margin-bottom: 28px;
  font-weight: 400;
  font-size: 22px;
  line-height: 1.5;
  text-transform: capitalize;
`

const FooterBottom = styled.div`
  display: flex;
  align-items: center;
`

const Logo = styled.img`
  height: 48px;
`

const Placeholder = styled.div`
  flex: 1;
`

const BottomLinkContainer = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  margin-left: 32px;
  color: white;
  cursor: pointer;
`

const BottomLinkIcon = styled.img`
  height: 100%;
  margin-right: 16px;
`

const BottomLinkText = styled.p`
  font-weight: 600;
  font-size: 24px;
  line-height: 40.83px;
`

export const Footer: React.FC = () => {
  return (
    <>
      <FooterWrapper>
        <FooterContainer>
          <LinkClassContainer>
            <LinkClass>
              <LinkClassTitle>docs</LinkClassTitle>
              <LinkList>
                <LinkListItem>what's new</LinkListItem>
                <LinkListItem>get start</LinkListItem>
                <LinkListItem>deploy</LinkListItem>
                <LinkListItem>develop</LinkListItem>
                <LinkListItem>reference</LinkListItem>
              </LinkList>
            </LinkClass>
            <LinkClass>
              <LinkClassTitle>deep dive</LinkClassTitle>
              <LinkList>
                <LinkListItem>consensus algorithm</LinkListItem>
                <LinkListItem>kv engine</LinkListItem>
                <LinkListItem>rpc</LinkListItem>
                <LinkListItem>testing</LinkListItem>
              </LinkList>
            </LinkClass>
            <LinkClass>
              <LinkClassTitle>community</LinkClassTitle>
              <LinkList>
                <LinkListItem>contribute</LinkListItem>
                <LinkListItem>chat</LinkListItem>
              </LinkList>
            </LinkClass>
            <LinkClass>
              <LinkClassTitle>blog</LinkClassTitle>
              <LinkList>
                <LinkListItem>blog</LinkListItem>
              </LinkList>
            </LinkClass>
          </LinkClassContainer>
          <FooterBottom>
            <Logo src="src/assets/logo.svg" alt="Xline" />
            <Placeholder />
            <BottomLinkContainer
              as="a"
              href="https://github.com/datenlord/xline"
            >
              <BottomLinkIcon src="src/assets/github-icon.svg" alt="icon" />
              <BottomLinkText>GitHub</BottomLinkText>
            </BottomLinkContainer>
            <BottomLinkContainer
              as="a"
              href="https://app.gitter.im/#/room/#datenlord_Xline:gitter.im"
            >
              <BottomLinkIcon src="src/assets/gitter-icon.svg" alt="icon" />
              <BottomLinkText>Gitter</BottomLinkText>
            </BottomLinkContainer>
          </FooterBottom>
        </FooterContainer>
      </FooterWrapper>
    </>
  )
}

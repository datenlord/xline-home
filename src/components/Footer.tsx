import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { docsConfig, deepDiveConfig } from '@/doc.config'

import backgroundUrl from '@/assets/footer-background.svg'
import logoUrl from '@/assets/logo.svg'
import githubIconUrl from '@/assets/github-icon.svg'
import gitterIconUrl from '@/assets/gitter-icon.svg'
import DiscordIconUrl from '@/assets/discord-icon.svg'
import CNCFLogoUrl from '@/assets/cncf-logo.png'
import CNCFLogoTextUrl from '@/assets/cncf-logo-text.png'

const FooterWrapper = styled.footer`
  background-image: url(${backgroundUrl});
  background-size: cover;
`
const FooterContainer = styled.div`
  max-width: 1440px;
  margin-inline: auto;
  padding-inline: 128px;
  padding-block: 64px;
  @media screen and (max-width: 1024px) {
    padding-inline: 96px;
    padding-block: 48px;
  }
  @media screen and (max-width: 768px) {
    padding-inline: 64px;
    padding-block: 32px;
  }
`
const LinkClassContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`
const LinkClass = styled.div`
  margin-inline: 32px;
  margin-bottom: 48px;
  color: white;
  width: 200px;
  @media screen and (max-width: 1024px) {
    margin-inline: 24px;
    margin-bottom: 36px;
  }
  @media screen and (max-width: 768px) {
    margin-inline: 16px;
    margin-bottom: 24px;
  }
`
const LinkClassTitle = styled.h2`
  padding-bottom: 32px;
  margin-bottom: 32px;
  font-weight: 500;
  font-size: 28px;
  text-transform: capitalize;
  border-bottom: 1px solid white;
  cursor: default;
  @media screen and (max-width: 1024px) {
    font-size: 21px;
    padding-bottom: 24px;
    margin-bottom: 24px;
  }
  @media screen and (max-width: 768px) {
    font-size: 14px;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }
`
const LinkList = styled.ul``
const LinkListItem = styled.li`
  margin-bottom: 28px;
  font-weight: 400;
  font-size: 22px;
  text-transform: capitalize;
  cursor: pointer;
  @media screen and (max-width: 1024px) {
    margin-bottom: 21px;
    font-size: 16.5px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 14px;
    font-size: 11px;
  }
`
const FooterBottom = styled.div`
  padding-bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* flex-wrap: wrap; */
  @media screen and (max-width: 1024px) {
    padding-bottom: 36px;
  }
  @media screen and (max-width: 768px) {
    padding-bottom: 24px;
  }
`
const Logo = styled.img`
  height: 48px;
  margin-bottom: 8px;
  cursor: pointer;
  @media screen and (max-width: 1024px) {
    height: 34px;
  }
  @media screen and (max-width: 768px) {
    height: 22px;
  }
  /* @media screen and (max-width: 512px) {
    display: none;
  } */
  @media screen and (max-width: 320px) {
    height: 18px;
  }
`
const Placeholder = styled.div`
  flex: 1;
  /* @media screen and (max-width: 512px) {
    display: none;
  } */
`
const BottomLinkContainer = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  margin-left: 32px;
  margin-bottom: 8px;
  color: white;
  cursor: pointer;
  @media screen and (max-width: 1024px) {
    height: 24px;
    margin-left: 24px;
  }
  @media screen and (max-width: 768px) {
    height: 16px;
    margin-left: 16px;
  }
`
const BottomLinkIcon = styled.img`
  height: 100%;
  margin-right: 16px;
  @media screen and (max-width: 1024px) {
    margin-right: 12px;
  }
  @media screen and (max-width: 768px) {
    margin-right: 8px;
  }
`
const BottomLinkText = styled.p`
  font-weight: 600;
  font-size: 24px;
  line-height: 1;
  @media screen and (max-width: 1024px) {
    font-size: 18px;
  }
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`
const CopyRightContainer = styled.div`
  margin-left: -4%;
  width: 108%;
  padding-top: 32px;

  color: #fff;
  border-top: 1px solid #fff;
`
const CopyRightText = styled.div`
  padding-bottom: 16px;
  text-align: center;
  font-weight: 600;
  font-size: 18px;
  line-height: 1;
  &:last-child {
    padding-bottom: 0;
  }
  @media screen and (max-width: 1024px) {
    padding-bottom: 12px;
    font-size: 13.5px;
  }
  @media screen and (max-width: 768px) {
    padding-bottom: 8px;
    font-size: 9px;
  }
`
const CNCFLinkLogo = styled(BottomLinkContainer)`
  cursor: default;
`
const CNCFLogo = styled.img`
  height: 100%;
`
const CNCFLogoText = styled.img`
  height: 100%;
`

export const Footer: React.FC = () => {
  const navigate = useNavigate()

  return (
    <>
      <FooterWrapper>
        <FooterContainer>
          <LinkClassContainer>
            <LinkClass>
              <LinkClassTitle>docs</LinkClassTitle>
              <LinkList>
                {docsConfig.map(({ title, url }) => (
                  <LinkListItem
                    key={title}
                    onClick={() => {
                      navigate(url)
                      window.scrollTo(0, 0)
                    }}
                  >
                    {title}
                  </LinkListItem>
                ))}
              </LinkList>
            </LinkClass>
            <LinkClass>
              <LinkClassTitle>deep dive</LinkClassTitle>
              <LinkList>
                {deepDiveConfig.map(({ title, url }) => (
                  <LinkListItem
                    key={title}
                    onClick={() => {
                      navigate(url)
                      window.scrollTo(0, 0)
                    }}
                  >
                    {title}
                  </LinkListItem>
                ))}
              </LinkList>
            </LinkClass>
            <LinkClass>
              <LinkClassTitle>community</LinkClassTitle>
              <LinkList>
                <LinkListItem
                  onClick={() => {
                    navigate('/contribute')
                    window.scrollTo(0, 0)
                  }}
                >
                  contribute
                </LinkListItem>
                <LinkListItem
                  onClick={() =>
                    (window.location.href = 'https://discord.gg/XyFXGpSfvb')
                  }
                >
                  chat
                </LinkListItem>
                <LinkListItem
                  onClick={() => {
                    navigate('/GSoC')
                    window.scrollTo(0, 0)
                  }}
                >
                  2024 GSoC
                </LinkListItem>
                <LinkListItem
                  onClick={() => {
                    navigate('/meeting')
                    window.scrollTo(0, 0)
                  }}
                >
                  Community Meeting
                </LinkListItem>
              </LinkList>
            </LinkClass>
            <LinkClass>
              <LinkClassTitle>resources</LinkClassTitle>
              <LinkList>
                <LinkListItem
                  onClick={() => {
                    navigate('/blog')
                    window.scrollTo(0, 0)
                  }}
                >
                  blog
                </LinkListItem>
                <LinkListItem
                  onClick={() => {
                    navigate('/video')
                    window.scrollTo(0, 0)
                  }}
                >
                  video
                </LinkListItem>
              </LinkList>
            </LinkClass>
          </LinkClassContainer>
          <FooterBottom>
            <Logo
              src={logoUrl}
              alt="Xline"
              onClick={() => {
                window.scrollTo(0, 0)
                navigate('/')
              }}
            />
            {/* <Placeholder /> */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <CNCFLinkLogo>
                <CNCFLogo src={CNCFLogoUrl} />
                <CNCFLogoText src={CNCFLogoTextUrl} />
              </CNCFLinkLogo>
              <BottomLinkContainer
                as="a"
                href="https://github.com/datenlord/xline"
              >
                <BottomLinkIcon src={githubIconUrl} alt="icon" />
                <BottomLinkText>GitHub</BottomLinkText>
              </BottomLinkContainer>
              <BottomLinkContainer as="a" href="https://discord.gg/XyFXGpSfvb">
                <BottomLinkIcon src={DiscordIconUrl} alt="icon" />
                <BottomLinkText>Discord</BottomLinkText>
              </BottomLinkContainer>
            </div>
          </FooterBottom>
          <CopyRightContainer>
            <CopyRightText>
              We are a Cloud Native Computing Foundation sandbox project.
            </CopyRightText>
            <CopyRightText>Xline for The Linux Foundation®</CopyRightText>
          </CopyRightContainer>
        </FooterContainer>
      </FooterWrapper>
    </>
  )
}

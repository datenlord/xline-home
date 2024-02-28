import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { PCNav } from './PCNav'
import type { NavItem } from './PCNav'
import { MobNav } from './MobNav'

import logoUrl from '@/assets/logo.svg'
import githubIconUrl from '@/assets/github-icon.svg'

const items: NavItem[] = [
  {
    key: 'docs',
    label: 'Docs',
    children: [
      {
        key: "what's-new",
        label: "What's new",
        url: "/docs/What's-New",
      },
      {
        key: 'get-started',
        label: 'Get started',
        url: '/docs/Get-Started',
      },
      {
        key: 'deploy',
        label: 'Deploy',
        url: '/docs/Deploy',
      },
      {
        key: 'develop',
        label: 'Develop',
        url: '/docs/Develop',
      },
      {
        key: 'reference',
        label: 'reference',
        url: '/docs/Xline-Architecture-Details',
      },
    ],
  },
  {
    key: 'deep-dive',
    label: 'Deep dive',
    children: [
      {
        key: 'consensus',
        label: 'Consensus',
        url: '/deep-dive/Consensus',
      },
      {
        key: 'kv-engine',
        label: 'KV engine',
        url: '/deep-dive/Key-value-Engine',
      },
      {
        key: 'rpc',
        label: 'RPC',
        url: '/deep-dive/Remote-Procedure-Calls-(RPC)',
      },
      {
        key: 'test',
        label: 'Test',
        url: '/deep-dive/Testing',
      },
    ],
  },
  {
    key: 'community',
    label: 'Community',
    children: [
      {
        key: 'contribute',
        label: 'Contribute',
        url: '/contribute',
      },
      {
        key: 'chat',
        label: 'Chat',
        url: 'https://discord.gg/XyFXGpSfvb',
      },
      {
        key: 'GSoC 2024',
        label: 'GSoC 2024',
        url: '/GSoC',
      },
    ],
  },
  {
    key: 'resources',
    label: 'Resources',
    children: [
      {
        key: 'blog',
        label: 'Blog',
        url: '/blog',
      },
      {
        key: 'video',
        label: 'Video',
        url: '/video',
      },
    ],
  },
]

const HeaderWrapper = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  height: 86px;
  width: 100%;
  background-color: hsla(236, 60%, 10%, 0.4);
  color: ${props => props.theme.color.white};
  @media screen and (max-width: 1024px) {
    height: 69px;
  }
  @media screen and (max-width: 768px) {
    height: 53px;
  }
`
const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: inherit;
  width: 100%;
  max-width: 1440px;
  margin-inline: auto;
  padding-left: 105px;
  padding-right: 101px;
  @media screen and (max-width: 1024px) {
    padding-inline: 64px;
  }
  @media screen and (max-width: 768px) {
    padding-inline: 20px;
  }
`
const Logo = styled.img`
  width: 111px;
  height: 32px;
  margin-right: calc(68px - 20px);
  @media screen and (max-width: 1024px) {
    width: 86px;
    height: 22px;
    margin-right: 24px;
  }
  @media screen and (max-width: 768px) {
    width: 64px;
    height: 18px;
    margin-right: 0;
  }
`
const Placeholder = styled.div`
  flex: 1;
  min-width: ${props => props.theme.scale.md};
  @media screen and (max-width: 1024px) {
    min-width: 16px;
  }
`
const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 131px;
  height: 48px;
  /* padding: 8px 16px; */
  color: ${props => props.theme.color.white};
  background: linear-gradient(
    90deg,
    hsla(270, 50%, 60%, 1),
    hsla(257, 97%, 73%, 1) 50%,
    hsla(266, 87%, 75%, 1)
  );
  border: none;
  border-radius: 50vh;
  cursor: pointer;
  @media screen and (max-width: 1024px) {
    width: 106px;
    height: 36px;
  }
  @media screen and (max-width: 768px) {
    width: 84px;
    height: 24px;
  }
`
const Icon = styled.img`
  width: 24.94px;
  height: 24.94px;
  margin-right: 8px;
  @media screen and (max-width: 1024px) {
    width: 18px;
    margin-right: 7px;
  }
  @media screen and (max-width: 768px) {
    width: 15px;
    margin-right: 6px;
  }
`
const Text = styled.p`
  font-size: 18px;
  line-height: 1;
  text-transform: capitalize;
  transform: translateY(5%);
  @media screen and (max-width: 1024px) {
    font-size: 15px;
  }
  @media screen and (max-width: 768px) {
    font-size: 11px;
  }
`

export const Header: React.FC = () => {
  const navigate = useNavigate()

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <Logo src={logoUrl} alt="Xline" onClick={() => navigate('/')} />
        <PCNav items={items} />
        <Placeholder />
        <Button as="a" href="https://github.com/datenlord/xline">
          <Icon src={githubIconUrl} alt="icon" />
          <Text>github</Text>
        </Button>
        <MobNav items={items} />
      </HeaderContainer>
    </HeaderWrapper>
  )
}

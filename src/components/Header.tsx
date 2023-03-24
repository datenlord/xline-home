import { useState } from 'react'
import styled from 'styled-components'
import logoUrl from '@/assets/logo.svg'
import githubIconUrl from '@/assets/github-icon.svg'

type MenuItemProps = {
  active: boolean
}

type SubMenuProps = {
  active: boolean
}

const HeaderWrapper = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  height: 86px;
  width: 100%;
  background-color: hsla(236, 60%, 10%, 0.4);
  color: ${props => props.theme.color.white};
`

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  height: inherit;
  width: 100%;
  max-width: 1440px;
  margin-inline: auto;
  padding-inline: ${props => props.theme.scale.lg};
`

const Logo = styled.img`
  height: 32px;
  margin-right: ${props => props.theme.scale.sm};
`

const Menu = styled.ul`
  display: flex;
  height: 100%;
`

const MenuItem = styled.li<MenuItemProps>`
  position: relative;
  display: flex;
  align-items: center;
  padding-inline: ${props => props.theme.scale.md};
  font-size: 18px;
  line-height: 1.2;
  text-transform: capitalize;
  white-space: nowrap;
  border-bottom: ${props =>
    props.active ? '4px solid hsla(234, 60%, 66%, 1)' : 'none'};
  transition: all 0.05s;
  cursor: pointer;
`

const SubMenu = styled.div<SubMenuProps>`
  position: absolute;
  top: 86px;
  left: 0;
  display: ${props => (props.active ? 'block' : 'none')};
  padding: 16px 20px;
  background: hsl(231, 14%, 18%);
  border-radius: 8px;
  transition: all 0s ease 0.1s;
  width: 200px;
`

const SubMenuItem = styled.p`
  padding-block: 8px;
  color: hsl(0, 0%, 88%);
  font-weight: 400;
  font-size: 14px;
  &:hover {
    color: hsl(234, 60%, 66%);
  }
`

const Placeholder = styled.div`
  flex: 1;
  min-width: ${props => props.theme.scale.md};
`

const Button = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 8px 16px;
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
`

const Icon = styled.img`
  height: 100%;
  margin-right: 8px;
`

const Text = styled.p`
  font-size: 16px;
  line-height: 1.2;
  text-transform: capitalize;
  transform: translateY(5%);
`

export const Header: React.FC = () => {
  const [isDocsActive, setIsDocsActive] = useState<boolean>(false)
  const [isDeepDiveActive, setIsDeepDiveActive] = useState<boolean>(false)
  const [isCommunityActive, setIsCommunityActive] = useState<boolean>(false)
  const [isBlogActive, setIsBlogActive] = useState<boolean>(false)

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <Logo src={logoUrl} alt="Xline" />
        <Menu>
          <MenuItem
            active={isDocsActive}
            onMouseOver={() => setIsDocsActive(true)}
            onMouseLeave={() => setIsDocsActive(false)}
          >
            docs
            <SubMenu active={isDocsActive}>
              <SubMenuItem>What's New</SubMenuItem>
              <SubMenuItem>Get Started</SubMenuItem>
              <SubMenuItem>Deploy</SubMenuItem>
              <SubMenuItem>Develop</SubMenuItem>
              <SubMenuItem>Reference</SubMenuItem>
            </SubMenu>
          </MenuItem>
          <MenuItem
            active={isDeepDiveActive}
            onMouseOver={() => setIsDeepDiveActive(true)}
            onMouseLeave={() => setIsDeepDiveActive(false)}
          >
            deep dive
            <SubMenu active={isDeepDiveActive}>
              <SubMenuItem>Consensus</SubMenuItem>
              <SubMenuItem>KV Engine</SubMenuItem>
              <SubMenuItem>RPC</SubMenuItem>
              <SubMenuItem>Test</SubMenuItem>
            </SubMenu>
          </MenuItem>
          <MenuItem
            active={isCommunityActive}
            onMouseOver={() => setIsCommunityActive(true)}
            onMouseLeave={() => setIsCommunityActive(false)}
          >
            community
            <SubMenu active={isCommunityActive}>
              <SubMenuItem>Contribute</SubMenuItem>
              <SubMenuItem>Chat</SubMenuItem>
            </SubMenu>
          </MenuItem>
          <MenuItem
            active={isBlogActive}
            onMouseOver={() => setIsBlogActive(true)}
            onMouseLeave={() => setIsBlogActive(false)}
          >
            blog
          </MenuItem>
        </Menu>
        <Placeholder />
        <Button as="a" href="https://github.com/datenlord/xline">
          <Icon src={githubIconUrl} alt="icon" />
          <Text>github</Text>
        </Button>
      </HeaderContainer>
    </HeaderWrapper>
  )
}

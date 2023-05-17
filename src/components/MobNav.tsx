import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { NavigateFunction } from 'react-router-dom'
import styled from 'styled-components'

import NavButtonIcon from '@/assets/home-menu-icon.svg'
import DropIconUrl from '@/assets/dropIcon.svg'
import DropIconActiveUrl from '@/assets/dropIconActive.svg'

export interface NavItem {
  key: React.Key
  label: string
  url?: string
  children?: NavItem[]
}

const NavButton = styled.img`
  display: none;
  margin-left: 12px;
  @media screen and (max-width: 768px) {
    display: block;
  }
`
const StyledNav = styled.ul<{ isDropDown: boolean }>`
  display: ${props => (props.isDropDown ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  top: 53px;
  left: 0;
  width: 100%;
  @media screen and (min-width: 768px) {
    display: none;
  }
`
const StyledNavItemTemplate = styled.li`
  display: flex;
  align-items: center;
  height: 42px;
  padding-inline: 20px;
`
const StyledNavItem = styled(StyledNavItemTemplate)<{ isDropdown: boolean }>`
  background: #111429;
  color: ${props => (props.isDropdown ? '#7680DD' : '#E0E0E0')};
  font-weight: 500;
  font-size: 16px;
  line-height: 1;
`
const StyledNavItemText = styled.p`
  /* min-width: 100px; */
`
const StyledSubNav = styled.ul<{ isDropdown: boolean }>`
  display: ${props => (props.isDropdown ? 'block' : 'none')};
  height: ${props => (props.isDropdown ? 'min-content' : '0px')};
  transition: all 1s;
`
const MobMenuItemTemplate = styled.li`
  display: flex;
  align-items: center;
  height: 42px;
  padding-inline: 20px;
`
const StyledSubNavItem = styled(MobMenuItemTemplate)`
  background: #242840;
  color: #e0e0e0;
`
const DropIcon = styled.img`
  margin-left: 12px;
  height: 12px;
  width: 12px;
`

const handleClick = (
  navigate: NavigateFunction,
  url?: string,
  dropdown?: boolean,
  setDropdown?: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  if (!url) {
    setDropdown && setDropdown(!dropdown)
  } else if (url.startsWith('http') || url.startsWith('https')) {
    window.location.href = url
  } else {
    navigate(url)
  }
}

const SubNavItem: React.FC<{
  label: string
  url?: string
}> = ({ label, url }) => {
  const navigate = useNavigate()
  return (
    <StyledSubNavItem onClick={() => handleClick(navigate, url)}>
      {label}
    </StyledSubNavItem>
  )
}

const SubNav: React.FC<{ isDropdown: boolean; subNavItems?: NavItem[] }> = ({
  isDropdown,
  subNavItems,
}) => {
  return (
    <StyledSubNav isDropdown={isDropdown}>
      {subNavItems?.map(({ key, label, url }) => (
        <SubNavItem key={key} label={label} url={url} />
      ))}
    </StyledSubNav>
  )
}

const NavItem: React.FC<{
  label: string
  url?: string
  subNavItems?: NavItem[]
}> = ({ label, url, subNavItems }) => {
  const navigate = useNavigate()
  const [dropdown, setDropdown] = useState<boolean>(false)
  return (
    <>
      <StyledNavItem
        isDropdown={dropdown}
        onClick={() => handleClick(navigate, url, dropdown, setDropdown)}
      >
        <StyledNavItemText>{label}</StyledNavItemText>
        {subNavItems?.length !== 0 && (
          <>
            {dropdown ? (
              <DropIcon src={DropIconActiveUrl} />
            ) : (
              <DropIcon src={DropIconUrl} />
            )}
          </>
        )}
      </StyledNavItem>
      <SubNav isDropdown={dropdown} subNavItems={subNavItems} />
    </>
  )
}

const Nav: React.FC<{ items: NavItem[] }> = ({ items }) => {
  return (
    <>
      <NavButton src={NavButtonIcon}></NavButton>
      <StyledNav isDropDown>
        {(items || []).map(({ key, label, url, children }) => (
          <NavItem key={key} label={label} url={url} subNavItems={children} />
        ))}
      </StyledNav>
    </>
  )
}

export { Nav as MobNav }

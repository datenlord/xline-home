import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { NavigateFunction } from 'react-router-dom'
import styled from 'styled-components'

export interface NavItem {
  key: React.Key
  label: string
  url?: string
  children?: NavItem[]
}

const StyledNav = styled.ul`
  display: flex;
  height: 100%;
  @media screen and (max-width: 768px) {
    display: none;
  }
`
const StyledNavItem = styled.li<{ isDropdown: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  padding-inline: 20px;
  color: #ffffff;
  font-size: 18px;
  line-height: 1;
  text-transform: capitalize;
  white-space: nowrap;
  border-bottom: ${props =>
    props.isDropdown ? '4px solid hsla(234, 60%, 66%, 1)' : 'none'};
  transition: all 0.05s;
  cursor: pointer;
  @media screen and (max-width: 1024px) {
    font-size: 16px;
    font-weight: 300;
    padding-inline: 16px;
  }
`
const StyledSubNav = styled.ul<{ isDropdown: boolean }>`
  position: absolute;
  top: 86px;
  left: 0;
  display: ${props => (props.isDropdown ? 'block' : 'none')};
  padding: 16px 20px;
  background: hsl(231, 14%, 18%);
  border-radius: 8px;
  transition: all 0s ease 0.1s;
  width: 200px;
`
const StyledSubNavItem = styled.li`
  display: block;
  padding-block: 8px;
  color: hsl(0, 0%, 88%);
  font-weight: 400;
  font-size: 14px;
  &:hover {
    color: hsl(234, 60%, 66%);
  }
`

const jumpPage = (navigate: NavigateFunction, url?: string) => {
  if (!url) {
    return
  }
  if (url.startsWith('http') || url.startsWith('https')) {
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
    <StyledSubNavItem onClick={() => jumpPage(navigate, url)}>
      {label}
    </StyledSubNavItem>
  )
}

const SubNav: React.FC<{ subNavItems?: NavItem[]; isDropdown: boolean }> = ({
  subNavItems,
  isDropdown,
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
  subNavItems?: NavItem[]
  url?: string
}> = ({ label, subNavItems, url }) => {
  const navigate = useNavigate()
  const [dropdown, setDropdown] = useState<boolean>(false)
  return (
    <StyledNavItem
      isDropdown={dropdown}
      onMouseOver={() => setDropdown(true)}
      onMouseOut={() => setDropdown(false)}
      onClick={() => jumpPage(navigate, url)}
    >
      {label}
      {subNavItems && (
        <SubNav subNavItems={subNavItems} isDropdown={dropdown} />
      )}
    </StyledNavItem>
  )
}

const Nav: React.FC<{ items: NavItem[] }> = ({ items }) => {
  return (
    <StyledNav>
      {items.map(({ key, label, url, children }) => (
        <NavItem key={key} label={label} url={url} subNavItems={children} />
      ))}
    </StyledNav>
  )
}

export { Nav as PCNav }

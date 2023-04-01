import styled from 'styled-components'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import dropdownCloseUrl from '@/assets/dropdown-close.svg'
import dropdownActiveUrl from '@/assets/dropdown-active.svg'

interface MenuProps {
  item: {
    title: string
    url: string
    children: {
      type: string
      title: string
      url: string
      id?: string
    }[]
  }[]
}

interface MenuItemProps {
  items: {
    title: string
    url: string
    children: {
      type: string
      title: string
      url: string
      id?: string
    }[]
  }
}

interface SubMenuProps {
  items: {
    type: string
    title: string
    url: string
    id?: string
  }[]
  isActive: boolean
}

interface SubMenuItemProps {
  isActive: boolean
}

const Dot = styled.div`
  height: 10px;
  width: 10px;
  margin-inline: 8px;
  border-radius: 50%;
  background: ${props => props.theme.color.neutral.gray05};
`

const StyleMenuItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.theme.scale.scale03};
`

const StyleSubMenuItem = styled(StyleMenuItem)<SubMenuItemProps>`
  display: ${props => (props.isActive ? 'flex' : 'none')};
  padding-left: 14px;
`

const MenuItemIconContainer = styled.div`
  display: inline-block;
  padding-inline: 8px;
  height: 100%;
`

const MenuItemIcon = styled.img`
  width: 12px;
  height: 12px;
`

const MenuItemContent = styled.p`
  color: ${props => props.theme.color.neutral.gray10};
  font-weight: ${props => props.theme.font.fontWeightBold};
  font-size: 16px;
  line-height: 18px;
  cursor: pointer;
`

const SubMenuItemContent = styled(MenuItemContent)`
  font-weight: ${props => props.theme.font.fontWeightRegular};
  cursor: pointer;
`

export const Menu: React.FC<MenuProps> = ({ item }) => (
  <ul>
    {item.map(item => {
      return <MenuItem items={item} key={item.title} />
    })}
  </ul>
)

const MenuItem: React.FC<MenuItemProps> = ({ items }) => {
  const [dropdown, setDropdown] = useState(false)

  return (
    <>
      <StyleMenuItem>
        <MenuItemIconContainer onClick={() => setDropdown(!dropdown)}>
          {!dropdown ? (
            <MenuItemIcon src={dropdownCloseUrl} />
          ) : (
            <MenuItemIcon src={dropdownActiveUrl} />
          )}
        </MenuItemIconContainer>
        <MenuItemContent>{items.title}</MenuItemContent>
      </StyleMenuItem>
      <ul>
        <SubMenu items={items.children} isActive={dropdown} />
      </ul>
    </>
  )
}

const SubMenu: React.FC<SubMenuProps> = ({ items, isActive }) => {
  const navigate = useNavigate()

  return (
    <>
      {items.map(item => {
        return (
          <StyleSubMenuItem key={item.id} isActive={isActive}>
            <Dot />
            <SubMenuItemContent
              onClick={() => {
                navigate(item.url)
                setTimeout(() => {
                  const el = document.getElementById(item.id || '')
                  console.log(el)
                  el?.scrollIntoView({ behavior: 'smooth' })
                }, 100)
              }}
            >
              {item.title}
            </SubMenuItemContent>
          </StyleSubMenuItem>
        )
      })}
    </>
  )
}

import React, { FC, useState, useContext, FunctionComponentElement } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem'
import Icon from '../Icon'
import Transition from '../Transition'



export interface SubMenuProps {
  /** #### 点击 SubMenu.Item 的索引  */
  index?: string;
  /** #### 下拉菜单选项的文字  */
  title: string;
  /** #### 下拉菜单选型的扩展类名  */
  className?: string;
}

export const SubMenu: FC<SubMenuProps> = (props) => {
  const { index, title, children, className } = props

  const context = useContext(MenuContext)
  
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>
  const isOpened = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false
  const [ menuOpen, setOpen ] = useState(isOpened);

  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index,
    'is-opened': menuOpen,
    'is-vertical': context.mode === 'vertical'
  })



  // mode="vertical"时， 点击事件 （下拉菜单）
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!menuOpen);
  }
  const clickEvents = context.mode === 'vertical' ? { onClick: handleClick } : {}

  
  // mode="horizontal"时， 防抖 （下拉菜单）
  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    // 1.清除定时器
    clearTimeout(timer);
    e.preventDefault();
    // 2.开启本次定时器
    timer = setTimeout(() => {
      setOpen(toggle);
    }, 300)
  }
  const hoverEvents = context.mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
    onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) }
  } : {}

  

  // todo 渲染 SubMenu 下拉菜单中 children
  const renderChildren = () => {
    const subMenuClasses = classNames('viking-submenu', { 'menu-opened': menuOpen })
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      if (childElement.type.displayName === 'MenuItem') {
        return React.cloneElement(childElement, { index: `${index}-${i}` }) // todo 设置 SubMenu 下的 index
      } else {
        console.error("Warning: SubMenu has a child which is not a MenuItem component")
      }
    })
    return (
      <Transition in={menuOpen} timeout={300} animation="zoom-in-top">
        <ul className={subMenuClasses}>{childrenComponent}</ul>
      </Transition>
    )
  }

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title"  {...clickEvents}>
        {title} <Icon icon="angle-down" className="arrow-icon"/>
      </div>
      {renderChildren()}
    </li>
  )
}
SubMenu.displayName = 'SubMenu';
export default SubMenu

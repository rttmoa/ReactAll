import classNames from 'classnames';
import React, { useState } from 'react';



export interface UseTabsItemProps {
  label: any
  className?: string
  isActive?: boolean
  disabled?: boolean
}
export const UseTabsItems: React.FC<UseTabsItemProps> = (props) => {

  const { className, isActive, label, children } = props;
  const cs = classNames('tabs-content', className, {'tabs-content-active': isActive})
  return <div key={label} className={cs}>{children}</div>
};
UseTabsItems.defaultProps = { disabled: false, isActive: false }
UseTabsItems.displayName = 'TabsItem';


type UseTabStyle = "underline" | "outline";
export interface UseTabProps {
  defaultIndex?: number
  styleType?: UseTabStyle
  onSelect?: (selectedIndex: number) => void
  className?: string
}
export const UseTabs: React.FC<UseTabProps> = (props) => {

  const { defaultIndex, styleType, onSelect, className, children } = props;

  const [activeIndex, setActiveIndex] = useState(defaultIndex)

  const cs = classNames('tabs-nav', className, {
    'tabs-underline': styleType === 'underline',
    'tabs-outline': styleType === 'outline'
  })
  // console.log(children); // (4) [{…}, {…}, {…}, {…}]

  // todo 导航区域
  const ChildrenCom = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<UseTabsItemProps>
      const isLabelDisabled = childElement.props.disabled ? childElement.props.disabled : false;
      const tableLabelClasses = classNames('tabs-label', className, {
        'tabs-label-active': activeIndex === index,
        'tabs-label-disabled': childElement.props.disabled
      })
      const handleChildClick = () => {
        if(isLabelDisabled) return
        setActiveIndex(index)
        if(typeof onSelect === 'function') onSelect(index)
      }
      return (
        <li key={index} className={tableLabelClasses} onClick={handleChildClick}>
          {childElement.props.label}
        </li>
      )
    })
  }
  // todo 内容区域
  const ContentChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<UseTabsItemProps>
      const { displayName } = childElement.type;
      console.log(displayName);
      if (displayName === 'TabsItem') {
        return React.cloneElement(childElement, { isActive: activeIndex === index })
      } else {
        console.error("Warning: Tabs has a child which is not a TabsItem component")
      }
    })
  }
  return (
    <div>
      <nav className={cs}>
        <ul className='tabs-ul'>
          {ChildrenCom()}
        </ul>
      </nav>
      {ContentChildren()}
    </div>
  );
};
UseTabs.defaultProps = { defaultIndex: 0, styleType: 'underline' }

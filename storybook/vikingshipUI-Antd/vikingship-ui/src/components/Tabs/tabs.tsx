import React, {useState} from 'react'
import classNames from 'classnames'
import { TabsItemProps } from './tabsItem'


type TabStyle = "underline" | "outline";

export interface TabProps {
  /** 当前激活 tab 面板的 index，默认为 0 */
  defaultIndex?: number;
  /** Tabs的样式，两种可选，默认为 underline */
  styleType?: TabStyle;
  /** 点击 Tab 触发的回调函数 */
  onSelect?: (selectedIndex: number) => void;
  /** 可以扩展的 className */
  className?: string;
}
/**
 * ### 选项卡切换组件。 提供平级的区域将大块内容进行收纳和展现，保持界面整洁。
 * #### defaultIndex? | styleType? | onSelect()? | className?
 */  
// TODO: CODE: React.Children & React.cloneElement
export const Tabs: React.FC<TabProps> = (props) => {

  const { className, styleType, children, onSelect, defaultIndex } = props;

  const classes = classNames('tabs-nav', className, {
    'tabs-underline': styleType === 'underline',
    'tabs-outline': styleType === 'outline'
  });

  const [activeIndex, setActiveIndex] = useState(defaultIndex); // 控制显示哪个 Children Content


  // todo 导航区域
  const childrenComponent = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<TabsItemProps>;
      const isLabelDisabled = childElement.props.disabled ? childElement.props.disabled : false;
      const tabsLabelClasses = classNames('tabs-label', {
        'tabs-label-active': activeIndex === index,
        'tabs-label-disabled': childElement.props.disabled
      });
      const handleChildClick = () => {
        if(isLabelDisabled) return
        setActiveIndex(index)
        if(typeof onSelect === "function") onSelect(index)
      } 
      return (
        <li key={index} className={tabsLabelClasses} onClick={handleChildClick}>
          {childElement.props.label}
        </li>
      )
    })
  }
  // todo 内容区域
  const renderContentChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<TabsItemProps>
      const { displayName } = childElement.type;
      // console.log(childElement)
      if (displayName === 'TabsItem') {
        return React.cloneElement(childElement, { isActive: activeIndex === index })
      } else {
        console.error("Warning: Tabs has a child which is not a TabsItem component")
      }
    })
  }

  return (
    <div>
      <nav className={classes}>
        <ul className="tabs-ul">
          {childrenComponent()}
        </ul>
      </nav>
      {renderContentChildren()}
    </div>
  )
}

Tabs.defaultProps = {
  defaultIndex: 0,
  styleType: 'underline'
}

export default Tabs

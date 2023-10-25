import React from 'react'
import classNames from 'classnames'


export interface TabsItemProps {
  /** Tab选项上面的文字 */
  label: any;
  /** 可以扩展的 className */
  className?: string;
  /** Tab选项是否被激活 */
  isActive?: boolean;
  /** Tab选项是否被禁用 */
  disabled?: boolean;
}

// React.Children 遍历 TabsItem
export const TabsItem: React.FC<TabsItemProps> = (props) => {
  const { className, isActive, label, children } = props

  const classes = classNames('tabs-content', className, {
    'tabs-content-active': isActive,
  }) 
  return (
    <div key={label} className={classes}>
      {children}
    </div>
  )
}
TabsItem.defaultProps = {
  disabled: false,
  isActive: false
}

TabsItem.displayName = 'TabsItem';
export default TabsItem

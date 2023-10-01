import classNames from 'classnames';
import React from 'react';



export interface UseTabsItemProps {
  label: any
  className?: string
  isActive?: boolean
  disabled?: boolean
}
const UseTabsItems: React.FC<UseTabsItemProps> = (props) => {

  const { className, isActive, label, children } = props;
  const cs = classNames('tabs-content', className, {'tabs-content-active': isActive})
  return <div key={label} className={cs}>{children}</div>
};
UseTabsItems.defaultProps = { disabled: false, isActive: false }


const UseTabs = () => {
  return (
    <div>
      
    </div>
  );
};

export { UseTabs, UseTabsItems }
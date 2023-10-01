import classNames from 'classnames';
import React from 'react';



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



type UseTabStyle = "underline" | "outline";
export interface UseTabProps {
  defaultIndex?: number
  styleType?: UseTabStyle
  onSelect?: (selectedIndex: number) => void
  className?: string
}
export const UseTabs: React.FC<UseTabProps> = (props) => {
  const { defaultIndex, styleType, onSelect, className, children } = props;

  return (
    <div>
      {children}
    </div>
  );
};
UseTabs.defaultProps = { defaultIndex: 0, styleType: 'underline' }

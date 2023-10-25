import React, { useState } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import Transition from '../Transition';

export type UseAlertType = "success" | "primary" | "warning" | "danger" | "default"

export interface UseAlertRrops {
  title?: string
  closable?: boolean
  customClose?: string
  onClose?: (() => void)
  children: React.ReactNode
  type: UseAlertType
}

const UseAlert: React.FC<UseAlertRrops> = (props) => {
  const { title, closable, type, customClose, onClose, children } = props;

  const customCloseP = customClose || <Icon icon="times" className='window-close' size='lg' />
  const classes = classNames('alert', {[`alert-${type}`]: type})
  const [visible, setVisible] = useState(true)
  const handleClick = () => {
    setVisible(false)
    onClose && onClose()
  }

  return (
    <Transition in={visible} timeout={300} animation='zoom-in-left' wrapper>
      <div className={classes}>
        {title && (<h4 className='alert-title'>{title}</h4>)}
        <p className='alert-message'>{children}</p>
        {closable && (<i onClick={handleClick}>{customCloseP}</i>)}
      </div>
    </Transition>
  );
};
UseAlert.defaultProps = {
  closable: true,
  type: 'primary'
}
export default UseAlert;
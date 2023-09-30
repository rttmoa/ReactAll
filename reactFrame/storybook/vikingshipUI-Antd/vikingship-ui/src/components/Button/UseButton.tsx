import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import classNames from 'classnames'

export enum UseButtonEnumSize { Large = 'lg', Small = 'sm', }
export enum UseButtonEnumType { Primary = 'primary', Default = 'default', Danger = 'danger',  Link = 'Link' }


export type UseButtonSize = "lg" | "sm"
export type UseButtonType = 'primary' | 'default' | "danger" | "link"
interface UseButtonProps {
  className?: string
  disabled?: boolean
  size?: UseButtonSize
  btnType?: UseButtonType
  children: React.ReactNode
  href?: string
}

type NativeButtonProps = UseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = UseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const UseButton: React.FC<ButtonProps> = (props) => {

  const { btnType, disabled, size, children, className, href, ...restProps } = props;

  const cs = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': (btnType === 'link') && disabled
  })

  if(btnType === "link" && href){
    return (
      <a className={cs} href={href} {...restProps}>
        {children}
      </a>
    )
  }
  else{
    return (
      <button className={cs} disabled={disabled} {...restProps}>
        {children}
      </button>
    )
  } 
}

UseButton.defaultProps = {
  disabled: false,
  btnType: 'default'
}
export default UseButton

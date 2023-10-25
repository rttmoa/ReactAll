import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import classNames from 'classnames'

export enum ButtonEnumSize {
  Large = 'lg',
  Small = 'sm'
}

export enum ButtonEnumType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link',
}



export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface BaseButtonProps {
  className?: string;
  /**设置 Button 的禁用 */
  disabled?: boolean;
  /**设置 Button 的尺寸 */
  size?: ButtonSize;
  /**设置 Button 的类型 */
  btnType?: ButtonType;
  children: React.ReactNode;
  href?: string;
  // testButtonEnumType?: ButtonEnumType
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>

// Partial＜T＞：快速把某个接口类型中定义的属性变成可选
// TS 关于泛类约束Partial＜T＞、Required＜T＞、Readonly＜T＞: https://blog.csdn.net/qq_37548296/article/details/131174181
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

/**
 * ### 页面中最常用的的按钮元素，适合于完成特定的交互，支持 HTML button 和 a 链接 的所有属性
 * #### className? | disabled? | size? | btnType? | children? | href?
 */
export const Button: FC<ButtonProps> = (props) => {
  
  const { btnType, disabled, size, children, className, href, ...restProps } = props;

  // btn, btn-lg, btn-primary
  const cs = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': (btnType === 'link') && disabled
  })

  if(btnType === "link" && href){
    return <a className={cs} href={href} {...restProps}>{children} </a>
  }
  else{
    return <button className={cs} disabled={disabled} {...restProps}>{children}</button>
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: 'default'
}

export default Button;

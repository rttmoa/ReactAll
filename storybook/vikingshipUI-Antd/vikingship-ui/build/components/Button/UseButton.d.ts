import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
export declare enum UseButtonEnumSize {
    Large = "lg",
    Small = "sm"
}
export declare enum UseButtonEnumType {
    Primary = "primary",
    Default = "default",
    Danger = "danger",
    Link = "Link"
}
export type UseButtonSize = "lg" | "sm";
export type UseButtonType = 'primary' | 'default' | "danger" | "link";
interface UseButtonProps {
    className?: string;
    disabled?: boolean;
    size?: UseButtonSize;
    btnType?: UseButtonType;
    children: React.ReactNode;
    href?: string;
}
type NativeButtonProps = UseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = UseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
declare const UseButton: React.FC<ButtonProps>;
export default UseButton;

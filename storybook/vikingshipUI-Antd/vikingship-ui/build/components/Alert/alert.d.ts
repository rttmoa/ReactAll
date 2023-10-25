import React from 'react';
export type AlertType = 'success' | 'primary' | 'warning' | 'danger' | 'default';
export interface AlertProps {
    /** 标题 */
    title?: string;
    /** 是否显示关闭图标 */
    closable?: boolean;
    /** the close icon */
    customClose?: string;
    /** 关闭alert时触发的事件 */
    onClose?: (() => void);
    /** 描述 */
    children?: React.ReactNode;
    /** 类型 四种可选 针对四种不同的场景 */
    type: AlertType;
}
/**
 * ### 用于页面中展示重要的提示信息。 点击右侧的叉提示自动消失
 * #### title? | closable? | customClose? | onClose()? | children? | type
 */
export declare const Alert: React.FC<AlertProps>;
export default Alert;

import React, { FC } from 'react';
import { ThemeProps } from '../Icon/icon';
export interface ProgressProps {
    /** 当前百分比 */
    percent: number;
    /** 高度 */
    strokeHeight?: number;
    /** 是否显示百分比数字 */
    showText?: boolean;
    /** 额外的样式 */
    styles?: React.CSSProperties;
    /** 主题 */
    theme?: ThemeProps;
}
declare const Progress: FC<ProgressProps>;
export default Progress;

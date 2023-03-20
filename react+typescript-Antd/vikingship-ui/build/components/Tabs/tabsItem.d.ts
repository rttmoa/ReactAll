import React from 'react';
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
export declare const TabsItem: React.FC<TabsItemProps>;
export default TabsItem;

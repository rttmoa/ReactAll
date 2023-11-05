import { FC } from 'react';
export interface SubMenuProps {
    /** #### 点击 SubMenu.Item 的索引  */
    index?: string;
    /** #### 下拉菜单选项的文字  */
    title: string;
    /** #### 下拉菜单选型的扩展类名  */
    className?: string;
}
export declare const SubMenu: FC<SubMenuProps>;
export default SubMenu;

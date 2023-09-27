import { FC, ReactElement } from 'react';
import { InputProps } from '../Input/input';
interface DataSourceObject {
    value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    /** 返回推荐结果 */
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    /** 选择选中某一项 */
    onSelect?: (item: DataSourceType) => void;
    /** 自定义渲染样式 */
    renderOption?: (item: DataSourceType) => ReactElement;
}
/**
 * 页面中最常用的的输入框元素，适合于完成特定的交互
 * ### 引用方法
 *
 * ~~~js
 * import { AutoComplete } from 'vikingship-ui'
 * ~~~
 */
export declare const AutoComplete: FC<AutoCompleteProps>;
export default AutoComplete;

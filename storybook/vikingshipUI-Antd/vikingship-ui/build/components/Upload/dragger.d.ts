import { FC } from 'react';
interface DraggerProps {
    onFile: (files: FileList) => void;
}
/**
 * ### 文件上传拖拽到组件中
 * #### onFile()? & children
 */
export declare const Dragger: FC<DraggerProps>;
export default Dragger;

import { FC } from 'react';
export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';
export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;
}
export interface UploadProps {
    /** 发送请求地址 */
    action: string;
    /** 默认上传文件列表 */
    defaultFileList?: UploadFile[];
    /**
     * 上传文件之前验证或进行转换
     * @param file
     */
    beforeUpload?: (file: File) => boolean | Promise<File>;
    /** 上传过程的事件 */
    onProgress?: (percentage: number, file: File) => void;
    /** 上传成功的事件 */
    onSuccess?: (data: any, file: File) => void;
    /** 上传失败的事件 */
    onError?: (err: any, file: File) => void;
    /** 上传行为改变 */
    onChange?: (file: File) => void;
    /** 移除上传的文件 */
    onRemove?: (file: UploadFile) => void;
    /** 添加自定义 header */
    headers?: {
        [key: string]: any;
    };
    /** 添加name 属性 - 代表发到后台的文件参数名称 */
    name?: string;
    /** 添加data属性 - 上传所需的额外参数 */
    data?: {
        [key: string]: any;
    };
    /** 是否携带请求参数 */
    withCredentials?: boolean;
    /** 可接受上传文件的类型 */
    accept?: string;
    /** 允许上传多个文件 */
    multiple?: boolean;
    /** 是否拖动上传 */
    drag?: boolean;
}
/**
 * ### 通过点击或者拖拽上传文件
 */
export declare const Upload: FC<UploadProps>;
export default Upload;

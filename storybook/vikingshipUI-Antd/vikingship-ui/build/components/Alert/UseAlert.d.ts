import React from 'react';
export type UseAlertType = "success" | "primary" | "warning" | "danger" | "default";
export interface UseAlertRrops {
    title?: string;
    closable?: boolean;
    customClose?: string;
    onClose?: (() => void);
    children: React.ReactNode;
    type: UseAlertType;
}
declare const UseAlert: React.FC<UseAlertRrops>;
export default UseAlert;

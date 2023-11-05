import React from 'react';
export interface UseTabsItemProps {
    label: any;
    className?: string;
    isActive?: boolean;
    disabled?: boolean;
}
export declare const UseTabsItems: React.FC<UseTabsItemProps>;
type UseTabStyle = "underline" | "outline";
export interface UseTabProps {
    defaultIndex?: number;
    styleType?: UseTabStyle;
    onSelect?: (selectedIndex: number) => void;
    className?: string;
}
export declare const UseTabs: React.FC<UseTabProps>;
export {};

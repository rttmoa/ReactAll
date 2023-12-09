import React, { useState } from 'react';
import { ReactComponent as IconTick } from "@/assets/icon_tick.svg";
import styles from "./index.less";
interface ButtonGroupProps {
    onSelect: (option: string) => void;
    children: any;
    value?: string;
}

interface ButtonGroupItemProps {
    onSelect?: (option: string) => void;
    selected?: boolean;
    disabled?:boolean;
    value: string;
    children?: any;
}

const ButtonGroup: React.FC<ButtonGroupProps> & {
    Item: React.FC<ButtonGroupItemProps>;
} = ({ children, onSelect, value }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(value || null);

    const handleSelect = (option: string) => {
        setSelectedOption(option);
        onSelect && onSelect(option);
    };

    return (
        <div style={{display:'flex',alignItems:'center'}}>
            {React.Children.map(children, (child) =>
                React.cloneElement(child as React.ReactElement<ButtonGroupItemProps>, {
                    onSelect: handleSelect,
                    selected: child.props.value === selectedOption,
                })
            )}
        </div>
    );
};

const ButtonGroupItem: React.FC<ButtonGroupItemProps> = ({
    children,
    onSelect,
    selected,
    disabled,
    value,
}) => (
    <div
        onClick={() =>!disabled&& onSelect && onSelect(value)}
        className={`${styles.button} ${selected && styles.primary}`}
        style={{ marginRight: '10px' }}>
        <div>
            {selected && <IconTick />}  {children}

        </div>
    </div>
);

ButtonGroup.Item = ButtonGroupItem;

export default ButtonGroup;

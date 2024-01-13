import { DownOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { hideMiddleChars } from "@/utils";
import styles from './index.less';
import styles2 from '../SendButtonGroup/index.less';

export default function (props: any) {
    const { title, desc, choose,
        maxValue, selectToken, selectChain,
        currentToken, currentChain, max, chooseToken,
        onMax, defaultValue, onChange, simple } = props;
    const [active, setActive] = useState(false);
    const [visible, setVisible] = useState(true);
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState(defaultValue);
    const [oldValue, setOldValue] = useState(defaultValue);
    const handleChange = () => {
        onMax && onMax()
        setValue(maxValue);
        onChange(maxValue);
    }
    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue])
    return <div className='text-gray-4 flex flex-column gap-2' >
        <div className={`${styles.input} flex flex-column gap-2`} style={{ border: active && '1px solid #ff5c28' || '1px solid rgba(0,0,0,0)' }}>
            <div className=' flex flex-between  gap-2'>
                <div style={{ padding: '1px 8px' }} className={`flex flex-align-center gap-2 fw-bold ${chooseToken && 'token-hover'}`} onClick={chooseToken && selectToken}>
                    <img src={currentToken} width="25" />
                </div>
                <input value={value} onChange={e => { setValue(e.target.value); onChange && onChange(e.target.value) }} onFocus={() => setActive(true)} onBlur={() => setActive(false)} placeholder='0.0' className='flex-auto' style={{
                    fontSize: '16px',
                    width: '100%',
                    color: '#fff',
                    fontWeight: 'bold'
                }} />
            </div>
        </div>

    </div>
}
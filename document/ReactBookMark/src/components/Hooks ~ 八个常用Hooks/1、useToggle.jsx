

import React, { useState } from 'react'

// 状态的切换Hook
function useToggle(dafaultValue) {
   
    const [value, setValue] = useState(dafaultValue)
    function toggleValue(value) {
        setValue(currentValue => {
            return typeof value === "boolean" ? value : !currentValue
        })
    }
    return [value, toggleValue]
}






export default function ToggleComponent() {
    const [value, toggleValue] = useToggle(undefined) // 不可传入 undefined和null
    
    return <div>
        <div>{value && value.toString()}</div>
        <button onClick={toggleValue}>Toggle</button>
        <button onClick={() => toggleValue(true)}>make Ture</button>
        <button onClick={() => toggleValue(false)}>make False</button>
    </div>
}
import { useState, useEffect } from 'react'

const ACTION_KEY_DEFAULT = ['Ctrl ', 'Control']
const ACTION_KEY_APPLE = ['⌘', 'Command']



// ? 文档中 快速搜索 按钮
export function useActionKey() {
  let [actionKey, setActionKey] = useState()
  // console.log("useActionKey")

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) {
        setActionKey(ACTION_KEY_APPLE)
      } else {
        setActionKey(ACTION_KEY_DEFAULT)
      }
    }
  }, [])
  // console.log('actionKey', actionKey) // ['Ctrl ', 'Control']
  return actionKey
}

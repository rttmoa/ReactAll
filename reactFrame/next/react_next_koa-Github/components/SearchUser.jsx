import { useState, useCallback, useRef } from 'react'
import { Select, Spin } from 'antd'
import debounce from 'lodash/debounce'
import api from '../lib/api';
const Option = Select.Option;






// TODO: deboune  页面在详情页面中 - Issue - 创建者中进行搜索
function SearchUser({ onChange, value }) { // 回调；搜索框的值

  
  const lastFetchIdRef = useRef(0) // 使用Ref逃脱闭包陷阱
  const [fetching, setFetching] = useState(false) // 记载状态
  const [options, setOptions] = useState([]) // 所有选项值


  // useCallback方法中没有任何依赖，fetching和options是永远不会变的，所以不用加依赖项
  const fetchUser = useCallback(
    // debounce： 如果用户输入的时间超过了500毫秒才会再发请求 && 节流
    debounce(value => {
      // console.log('fetching user', value)

      lastFetchIdRef.current += 1;
      const fetchId = lastFetchIdRef.current;
      setFetching(true)
      setOptions([])

      // 在浏览器环境中，不会用到req，res
      api.request({url: `/search/users?q=${value}`}).then(resp => {
        // console.log('SearchUser 创建者数据:', resp)
        if (fetchId !== lastFetchIdRef.current) {
          return
        }
        const data = resp.data.items.map(user => ({
          text: user.login,
          value: user.login,
        }));
        setFetching(false)
        setOptions(data)
        })
  }, 500), [])

    
  const handleChange = value => {
    // console.log(value) 
    setOptions([])
    setFetching(false)
    onChange(value)  
  }



  return (
    // https://3x.ant.design/components/select-cn/#API
    <Select
      style={{ width: 200 }}
      showSearch={true}  
      notFoundContent={fetching ? <Spin size="small" /> : <span>请输入人名; 搜索名字</span>}
      filterOption={false}
      placeholder="创建者搜索"
      value={value}
      onChange={handleChange}   // 输入框事件改变时
      onSearch={fetchUser}
      allowClear={true}
    >
      {options.map(op => (
        <Option value={op.value} key={op.value}>
          {op.text}
        </Option>
      ))}
    </Select>
  )
}

export default SearchUser;

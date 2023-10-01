import React, { useState, ChangeEvent, ReactElement, KeyboardEvent, useRef, useEffect } from 'react';
import classNames from 'classnames';
import Input, { InputProps } from '../Input/input'
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';
import Transition from '../Transition/transition';
import Icon from '../Icon/icon';

interface DataSourceObject { value: string }
export type DataSourceType<T = {}> = T & DataSourceObject;

export interface UseAutoCompleteProps extends Omit<InputProps, "onSelect"> {
  // 传递一个字符串进去，返回一个 数组 | Promise类型的数组
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>
  onSelect?: (item: DataSourceType) => void
  renderOption?: (item: DataSourceType) => ReactElement
}

const UseAutoComplete:React.FC<UseAutoCompleteProps> = (props) => {

  const { fetchSuggestions, onSelect, value, renderOption, ...restProps } = props;

  const [inputValue, setInputValue] = useState(value as string) // Input['value']
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false) // 设置下拉框
  const [highlightIndex, setHightlightIndex] = useState(-1)

  const triggerSearch = useRef(false)
  const componentRef = useRef<HTMLDivElement>(null)
  const debouncedValue = useDebounce(inputValue, 300) // 防抖

  // todo 监听 Click
  useClickOutside(componentRef, () => { setSuggestions([]) })

  useEffect(() => {
    if(debouncedValue && triggerSearch.current){
      setSuggestions([])
      const results = fetchSuggestions(debouncedValue)
      if(results instanceof Promise){
        setLoading(true)
        results.then(res => {
          setLoading(false)
          setSuggestions(res)
          if(res.length > 0){
            setShowDropdown(true)
          }
        })
      }
      else{
        setSuggestions(results)
        setShowDropdown(true)
        if(results.length > 0){
          setShowDropdown(true)
        }
      }
    }
    else setShowDropdown(false)

    setHightlightIndex(-1)
  }, [debouncedValue, fetchSuggestions])


  // todo Input['onKeyDown'] 键盘事件
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const highlight = (index: number) => {
      if(index < 0) index = 0
      if(index > suggestions.length) index = suggestions.length - 1
      setHightlightIndex(index)
    }
    switch(e.keyCode){
      case 13:
        if(suggestions[highlightIndex]){
          handleSelect(suggestions[highlightIndex])
        }
      break
      case 38:
        highlight(highlightIndex - 1)
        break
      case 40:
        highlight(highlightIndex + 1)
        break
      case 27:
        setShowDropdown(false)
        break
      // default:
      //   break
    }
  }
  // todo Input['onChange'] 输入框事件改变 (英文时生效)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e);
    const value = e.target.value.trim()
    setInputValue(value)
    triggerSearch.current = true
  }

  // 当回车键按下时
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setShowDropdown(false)
    onSelect && onSelect(item)
    triggerSearch.current = false
  }

  // todo 搜索列表
  const generateDropdown = () => {
    return (
      <Transition
        in={showDropdown || loading}
        animation='zoom-in-top'
        timeout={300}
        onExited={() => { setSuggestions([])}}
      >
        <ul className='viking-suggestion-list'>
          {!loading && (
            <div className='suggestions-loading-icon'>
              <Icon icon="spinner" spin />
            </div>
          )}
          {suggestions.map((item, index) => {
            const cs = classNames('suggestion-item', {"is-active": index === highlightIndex})
            return (
              <li key={index} className={cs} onClick={() => handleSelect(item)}>
                {renderOption ? renderOption(item) : item.value}
              </li>
            )
          })}
        </ul>
      </Transition>
    )
  }

  console.log(highlightIndex);
  console.log(suggestions);
  return (
    <div className='viking-auto-complete' ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {(suggestions.length > 0) && generateDropdown()}
    </div>
  );
};

export default UseAutoComplete;
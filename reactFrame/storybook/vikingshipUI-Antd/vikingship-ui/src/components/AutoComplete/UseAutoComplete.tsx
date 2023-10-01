import React, { useState, ChangeEvent, ReactElement, KeyboardEvent, useRef } from 'react';
import classNames from 'classnames';
import Input, { InputProps } from '../Input/input'
import useDebounce from '../../hooks/useDebounce';

interface DataSourceObject { value: string }
export type DataSourceType<T = {}> = T & DataSourceObject;

export interface UseAutoCompleteProps extends Omit<InputProps, "onSelect"> {
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>
  onSelect?: (item: DataSourceType) => void
  renderOption?: (item: DataSourceType) => ReactElement
}

const UseAutoComplete:React.FC<UseAutoCompleteProps> = (props) => {

  const { fetchSuggestions, onSelect, value, renderOption, ...restProps } = props;

  const [inputValue, setInputValue] = useState(value as string) // Input['value']
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [highlightIndex, setHightlightIndex] = useState(-1)

  const triggerSearch = useRef(false)
  const componentRef = useRef<HTMLDivElement>(null)
  const debouncedValue = useDebounce(inputValue, 300)


  const highlight = (index: number) => {
    if(index < 0) index = 0
    if(index > suggestions.length) index = suggestions.length - 1
    setHightlightIndex(index)
  }

  // Input['onKeyDown'] 键盘事件
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
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
      default:
        break
    }
  }
  // Input['onChange'] 输入框事件改变
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  return (
    <div className='viking-auto-complete' ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {}
    </div>
  );
};

export default UseAutoComplete;
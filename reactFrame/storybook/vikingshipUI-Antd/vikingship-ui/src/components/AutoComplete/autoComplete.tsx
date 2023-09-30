import React, { FC, useState, useEffect, useRef, ChangeEvent, KeyboardEvent, ReactElement } from 'react'
import classNames from 'classnames'
import Input, { InputProps } from '../Input/input'
import Icon from '../Icon/icon'
import Transition from '../Transition/transition'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'



interface DataSourceObject {
  value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  /** 返回推荐结果 */
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
  /** 选择选中某一项 */
  onSelect?: (item: DataSourceType) => void;
  /** 自定义渲染样式 */
  renderOption?: (item: DataSourceType) => ReactElement;
}

/**
 * 页面中最常用的的输入框元素，适合于完成特定的交互
 * ### 引用方法
 *
 * ~~~js
 * import { AutoComplete } from 'vikingship-ui'
 * ~~~
 */
export const AutoComplete: FC<AutoCompleteProps> = (props) => {

  const { fetchSuggestions, onSelect, value, renderOption, ...restProps  } = props;

  const [inputValue, setInputValue] = useState(value as string) // Input['value']
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]) // 下拉列表中 搜索建议词
  const [loading, setLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false) // 显示下拉框
  const [highlightIndex, setHighlightIndex] = useState(-1) // 高亮索引
  const triggerSearch = useRef(false)
  const componentRef = useRef<HTMLDivElement>(null)
  const debouncedValue = useDebounce(inputValue, 300)
  
  useClickOutside(componentRef, () => { setSuggestions([])})

  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      setSuggestions([])
      const results = fetchSuggestions(debouncedValue)
      if (results instanceof Promise) {
        setLoading(true)
        results.then(data => {
          setLoading(false)
          setSuggestions(data)
          if (data.length > 0) {
            setShowDropdown(true)
          }
        })
      } else {
        setSuggestions(results)
        setShowDropdown(true)
        if (results.length > 0) {
          setShowDropdown(true)
        }
      }
    } else {
      setShowDropdown(false)
    }
    setHighlightIndex(-1)
  }, [debouncedValue, fetchSuggestions])

  const highlight = (index: number) => {
    if (index < 0) index = 0
    if (index >= suggestions.length) {
      index = suggestions.length - 1
    }
    setHighlightIndex(index)
  }

  // Input['onKeyDown']  键盘事件（上、下、回车、ESC）
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch(e.keyCode) {
      case 13:
        if (suggestions[highlightIndex]) {
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
  // Input['onChange']  输入框事件改变
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    triggerSearch.current = true
  }

  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setShowDropdown(false)
    if (onSelect) {
      onSelect(item)
    }
    triggerSearch.current = false
  }

  // const renderTemplate = (item: DataSourceType) => {
  //   return renderOption ? renderOption(item) : item.value
  // }

  // todo 下拉列表
  const generateDropdown = () => {
    return (
      <Transition
        in={showDropdown || loading}
        animation="zoom-in-top"
        timeout={300}
        onExited={() => { setSuggestions([]) }}
      >
        <ul className="viking-suggestion-list">
          {loading && (
            <div className="suggestions-loading-icon">
              <Icon icon="spinner" spin/>
            </div>
          )}
          {suggestions.map((item, index) => {
            const classnames = classNames('suggestion-item', {
              'is-active': index === highlightIndex
            })
            return (
              <li key={index} className={classnames} onClick={() => handleSelect(item)}>
                {/* {renderTemplate(item)} */}
                {renderOption ? renderOption(item) : item.value}
              </li>
            )
          })}
      </ul>
      </Transition>
    )
  }

  return (
    <div className="viking-auto-complete" ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {(suggestions.length > 0) && generateDropdown()}
    </div>
  )
}

export default AutoComplete;

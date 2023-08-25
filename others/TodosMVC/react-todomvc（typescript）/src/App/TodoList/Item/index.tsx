import React, { useState, createRef, useEffect } from 'react'
import { useRecoilState } from 'recoil'

import type { AppState, Todo, TodoListType } from '../../../dataStructure'
import { recoilState } from '../../../dataStructure'

import { Layout } from './style'

interface Props {
  todo: Todo
}
interface State {
  onEdit: boolean
}



const Item: React.FC<Props> = ({ todo }) => {

  const [appState, setAppState] = useRecoilState<AppState>(recoilState)
  const editInput = createRef<HTMLInputElement>()
  const init: State = { onEdit: false }
  const [state, setState] = useState(init)

  // 让onEdit为true
  const onClick = (): void => {
    setState({ onEdit: true })
  }

  // 失去焦点时，输入框是否有值
  const onBlurEdit = (e: React.FocusEvent<HTMLInputElement>): void => {
    if (e.currentTarget.value.trim().length > 0) {
      setState({ onEdit: false })
    } else {
      removeItem(todo.id)
    }
  }

  // ESC/Enter时
  const submitEditText = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      if (e.currentTarget.value.trim().length > 0) {
        setState({ onEdit: false })
      }
    }
  }

  // 基于复杂的用户交互控制 Todo 的 CSS
  const SwitchStyle = (t: Todo, onEdit: boolean): string => {
    switch (true) {
      case onEdit && t.completed:
        return 'completed editing'
      case onEdit && !t.completed:
        return 'editing'
      case !onEdit && t.completed:
        return 'completed'
      case !onEdit && !t.completed:
        return ''
      default:
        return ''
    }
  }

  // 翻转状态
  const reverseCompleted = (id: Todo['id']): void => {
    const toggled: TodoListType = appState.todoList.map((t) => {
      // 按 id 搜索点击的项目..
      if (t.id === id) {
        // 仅更改已点击的项目的完成状态
        return { ...t, completed: !t.completed }
        // 回其他物品而不作任何更改
      } else {
        return t
      }
    }) 
    setAppState({ todoList: toggled })
  }

  // x：移除item
  const removeItem = (terminate: Todo['id']): void => {
    const removed: TodoListType = appState.todoList.filter((t: Todo): boolean => t.id !== terminate) 
    setAppState({ todoList: removed })
  }

  const handleTodoTextEdit = (e: React.ChangeEvent<HTMLInputElement>, onEdit_id: Todo['id']): void => {  
    const edited = appState.todoList.map((t: Todo): Todo => {
      if (t.id === onEdit_id) {
        return { ...t, bodyText: e.target.value }
      } else {
        return t
      }
    })
    setAppState({ todoList: edited })
  }

  // 编辑内容时，是否聚焦
  useEffect(() => {
    // For fucus input element when double clicks text label. fix this https://github.com/laststance/create-react-app-typescript-todo-example-2021/issues/50
    if (state.onEdit === true && editInput.current !== null)
      editInput.current.focus()
  }, [editInput, state.onEdit])




  // 遍历的每一个小li
  return (
    <Layout data-cy="todo-item">
      <li className={SwitchStyle(todo, state.onEdit)} data-testid="todo-item">
        <div className="view" data-testid="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={() => reverseCompleted(todo.id)}
            data-cy="todo-item-complete-check"
            data-testid="todo-item-complete-check"
          />
          <label
            onClick={onClick}
            data-cy="todo-body-text"
            data-testid="todo-body-text"
          >
            {todo.bodyText}
          </label>
          <button
            className="destroy"
            onClick={() => removeItem(todo.id)}
            data-cy="delete-todo-btn"
            data-testid="delete-todo-btn"
          />
        </div>
        <input
          ref={editInput}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => onBlurEdit(e)}
          className="edit"
          value={todo.bodyText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTodoTextEdit(e, todo.id)}  
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => submitEditText(e)}  
          data-cy="todo-edit-input"
          data-testid="todo-edit-input"
        />
      </li>
    </Layout>
  )
}

export default Item

import React, { createRef } from 'react'
import { useRecoilState } from 'recoil'

import type { AppState, Todo } from '../../dataStructure'  // 导入类型type
import { recoilState } from '../../dataStructure' // 导入值
import { UUID } from '../../functions'

import { Layout } from './style'



const NewTodoTextInput: React.FC = () => {
  const [appState, setAppState] = useRecoilState<AppState>(recoilState)
  const textInput: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>()

  function addTodo(e: React.KeyboardEvent<HTMLInputElement>): void {

    if (textInput.current === null) return;

    if (e.key === 'Enter' && textInput.current.value.trim().length > 0) {

      // 制作新的 TODO 对象  
      const todo: Todo = {
        bodyText: textInput.current.value,
        completed: false,
        id: UUID(),
      }

      // 将新的 TODO 添加到整个 TodoList
      setAppState({ todoList: [todo, ...appState.todoList] })

      // 重置文本输入 UI 值
      textInput.current.value = "";
    }
  }

  return (
    <Layout>
      <header className="header">
        <h1>todos</h1>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          ref={textInput}
          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => addTodo(e)}
          data-testid="new-todo-input-text"
          data-cy="new-todo-input-text"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus  // 页面刷新自动聚焦
        />
      </header>
    </Layout>
  )
}

export default NewTodoTextInput

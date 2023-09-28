import React, { Component } from 'react'
import TodoItem from './TodoItem'

export default class TodoMain extends Component {
  render() {
    const { list, type } = this.props
    let showList = []
    if (type === 'active') {
      showList = list.filter((item) => !item.done)
    } else if (type === 'completed') {
      showList = list.filter((item) => item.done)
    } else {
      showList = list
    }
    return (
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          checked={list.every((item) => item.done)}
          onChange={this.handleChange}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {showList.map((item) => (
            // 意义 把item抽离到一个组件 为了维护ref
            // 父组件是 Main 子组件是 Item
            // 把父类的 this.props 传递给子组件   三个方法
            <TodoItem {...this.props} key={item.id} item={item}></TodoItem>
          ))}
        </ul>
      </section>
    )
  }

  handleChange = (e) => {
    // console.log('全选', e.target.checked)
    this.props.checkAll(e.target.checked)
  }
}

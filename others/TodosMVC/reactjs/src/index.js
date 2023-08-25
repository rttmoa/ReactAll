import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './styles/base.css'
import './styles/index.css'
// 导入组件
import TodoHeader from './components/TodoHeader'
import TodoMain from './components/TodoMain'
import TodoFooter from './components/TodoFooter'


class App extends Component {
  state = {
    list: [],
    // 有三个值  all  active  completed
    type: 'all',
  }
  render() {
    const { list, type } = this.state
    return (
      <section className="todoapp">
        <TodoHeader addTodo={this.addTodo}></TodoHeader>
        <TodoMain
          list={list}
          delTodoById={this.delTodoById}
          updateDoneById={this.updateDoneById}
          editTodo={this.editTodo}
          checkAll={this.checkAll}
          type={type}
        ></TodoMain>
        <TodoFooter
          list={list}
          clearTodo={this.clearTodo}
          type={type}
          changeType={this.changeType}
        ></TodoFooter>
      </section>
    )
  }

  delTodoById = (id) => {
    this.setState({
      list: this.state.list.filter((item) => item.id !== id),
    })
  }
  updateDoneById = (id) => {
    // 需要根据id把对应的那个任务的状态取反
    this.setState({
      list: this.state.list.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            done: !item.done,
          }
        } else {
          return item
        }
      }),
    })
  }
  addTodo = (name) => {
    this.setState({
      list: [
        {
          id: Date.now(),
          name,
          done: false,
        },
        ...this.state.list,
      ],
    })
  }
  editTodo = (id, name) => {
    this.setState({
      list: this.state.list.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            name,
          }
        } else {
          return item
        }
      }),
    })
  }

  clearTodo = () => {
    this.setState({
      list: this.state.list.filter((item) => !item.done),
    })
  }
  changeType = (type) => {
    this.setState({ type })
  }
  checkAll = (check) => {
    this.setState({
      list: this.state.list.map((item) => {
        return {
          ...item,
          done: check,
        }
      }),
    })
  }
  componentDidMount() {////重新加载页面的渲染  -===组件创建渲染的时候
    this.setState({
      list: JSON.parse(localStorage.getItem('todos')) || [],
    })
  }
  componentDidUpdate() {///只要数据变化  或者新添加数据的时候  存到localStorage里面   更新的时候存起来
    localStorage.setItem('todos', JSON.stringify(this.state.list))
  }
}

// 渲染组件
ReactDOM.render(<App />, document.getElementById('root'))

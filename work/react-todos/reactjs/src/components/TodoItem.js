import React, { Component } from 'react'
import classnames from 'classnames'
export default class TodoItem extends Component {
  state = {
    // 当前双击的id
    currentId: '',
    // 当前双击的名字
    currentName: '',
  }
  inputRef = React.createRef()
  render() {
    const { item } = this.props
    return (
      <li className={classnames({
          completed: item.done,
          editing: item.id === this.state.currentId,
        })}
        key={item.id}
      >
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={item.done}
            onChange={() => this.updateDone(item.id)}
          />
          <label onDoubleClick={() => this.showEdit(item)}>{item.name}</label>
          <button
            className="destroy"
            onClick={() => this.delTodo(item.id)}
          ></button>
        </div>
        <input
          className="edit"
          value={this.state.currentName}
          onChange={(e) => this.setState({ currentName: e.target.value })}
          onKeyUp={this.handleKeyup}
          // 失去焦点
          onBlur={() => this.setState({ currentId: '' })}
          ref={this.inputRef}
        />
      </li>
    )
  }
  // 删除任务
  delTodo = (id) => {
    console.log('id', id)
    this.props.delTodoById(id)
  }
  // 修改任务状态
  updateDone = (id) => {
    this.props.updateDoneById(id)
  }
  showEdit = ({ id, name }) => {
    // console.log('id', id)
    this.setState(
      {
        currentId: id,
        currentName: name,
      },
      // 这段表示 不在挂载下执行  第二个参数等setState 执行完后执行
      () => {
        this.inputRef.current.focus()
      }
    )
  }
  handleKeyup = (e) => {
    // 判断
    if (e.keyCode === 27) {
      // 按了esc，取消修改
      this.setState({
        currentId: '',
        currentName: '',
      })
    }
    if (e.keyCode === 13) {
      // 添加
      this.props.editTodo(this.state.currentId, this.state.currentName)
      // 关闭
      this.setState({
        currentId: '',
        currentName: '',
      })
    }
  }

  // componentDidUpdate() {
  //   // 让输入框有焦点
  //   this.inputRef.current.focus()
  // }
}

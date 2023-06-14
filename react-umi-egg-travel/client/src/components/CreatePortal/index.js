import React, { Component } from 'react';
import ReactDOM from 'react-dom';




// NOTE: 创建门户
export default class CreatePortal extends Component {

  constructor(props) {
    super(props);
    this.body = document.querySelector('body');
    this.el = document.createElement('div');
  }

  componentDidMount() {
    this.el.setAttribute('id', 'portal-root');
    this.body.appendChild(this.el);
  }

  componentWillUnmount() {
    this.body.removeChild(this.el);
  }

  // TODO: ReactDOM.createPortal来实现弹框组件的改造；比较初级，比较通俗易懂
  render() {
    return ReactDOM.createPortal(this.props.children, this.el)
  }
}

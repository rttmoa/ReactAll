import React, { Component } from 'react';
import { Button } from 'antd-mobile';
import Modal from '@/components/Modal';

export default class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  handleClick = ()=>{
    this.setState({
      show: true
    })
  }

  handleShow = ()=>{
    console.log('modal show')
  }

  handleClose = ()=>{
    console.log('modal close')
    this.setState({
      show: false
    })
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.handleClick}>modal</Button>
        <Modal 
          show={this.state.show} 
          onClose={this.handleClose}
          onShow={this.handleShow}
        >
          modal
        </Modal>
      </div>
    )
  }
}
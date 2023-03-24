import React, { Component } from 'react';
import Demo from './demo';
import Input from './input';

export default class Refs extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
    this.divRef = React.createRef();
    this.inputRef = React.createRef();
    this.childRef = React.createRef();
    this.input2Ref = React.createRef();
  }

  componentDidMount(){
    // console.log(this.divRef.current);
    this.inputRef.current.focus();
    // console.log(this.childRef.current.changeText())
    this.input2Ref.current.value = 'input';

    setTimeout(()=>{
      console.log(this.input2Ref.current.value)
    },2000)
  }

  handleChange = ()=> {
    console.log(this.inputRef.current.value)
  }

  handleClick = ()=> {
    this.childRef.current.changeText()
  }

  render() {
    return (
      <div>
        <div ref={this.divRef}>div demo</div>
        <input ref={this.inputRef} onChange={()=>this.handleChange()}/>
        
        <Demo ref={this.childRef}/>
        <button onClick={()=>this.handleClick()}>修改demo组件</button>
        <br />
        <Input ref={this.input2Ref}/>
      </div>
    )
  }
}
import React, { Component, lazy, Suspense } from 'react';
import Lazy from '@/components/suspence'

const Demo = lazy(()=>{
  // console.log(props)
  return new Promise(resolve=>{
    setTimeout(() => {
      resolve(import('./demo').then(res=>{
        console.log(res)
        return res
      }))
    }, 300);
  })
})
const Lazy1 = lazy(()=>import('./demo'))
function LazyDemo(props){
  const Lazy = lazy(()=>import('./demo'))
  console.log(Lazy)
  return (
    <Lazy />
  )
}

export default class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      flag: false,
      demo: ''
    };
  }

  componentDidMount() {
    // setTimeout(() => {
    //   this.setState({
    //     flag: true,
    //     demo: 'demo'
    //   })
    // }, 1000);
  }

  /* error: 抛出的错误
   * info: 带有 componentStack key 的对象，其中包含有关组件引发错误的栈信息
  */
  // componentDidCatch(error, info) {
  //   console.log(error)
  // }

  render() {
    return (
      <div style={{height:'200px'}}>
        {/* <Suspense fallback={<div style={{fontSize:'50px', color: '#f60'}}>loading...</div>}>
          <Demo demo={this.state.demo}/>
          <LazyDemo demo={this.state.demo} />
        </Suspense> */}
        <Lazy component={import("./demo.js")} delay={500}/>

      </div>
    ) 
  }
}
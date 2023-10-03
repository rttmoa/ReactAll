import { cloneElement } from 'react'

const style = {
  width: '100%',
  maxWidth: 1200,
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: 20,
  paddingRight: 20,
}


// cloneElement扩展组件可复用性的高级技巧
export default ({ children, renderer = <div /> }) => {
  // console.log(renderer)
  const newElement = cloneElement(renderer, {
    // 这样是 renderer={<Comp color="red" style={{fontsize:20}}} color和style属性都可以接收到
    style: Object.assign({}, renderer.props.style, style), 
    children,
  })
  return newElement

  // return cloneElement(renderer, {style, children})
  
  // <Content>
  //   <Container renderer={<Comp color="red" stlye={{ fontSize: 40}} />}>{children}</Container>
  // </Content>

  // <Content>
  //   <Container renderer={<Comp color="red" />}>{children}</Container>
  // </Content>

  // // return <Comp style={style}>{children}</Comp>
}
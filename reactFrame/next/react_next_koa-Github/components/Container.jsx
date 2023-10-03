import React from 'react'

const style = {
  width: '100%',
  maxWidth: 1200,
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: 20,
  paddingRight: 20,
}


// TODO: React.cloneElement 扩展组件可复用性的高级技巧
export default ({ children, renderer = <div /> }) => {
  const newElement = React.cloneElement(renderer, {
    style: Object.assign({}, renderer.props.style, style), 
    children,
  })
  return newElement

  // return cloneElement(renderer, {style, children})
  
  // <Content>
  //   <Container renderer={<Comp color="red" stlye={{ fontSize: 40}} />}>{children}</Container>
  // </Content>
}
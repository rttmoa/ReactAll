/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ButtonDemo from './demos/button-demo'
import AlertDemo from './demos/alert-demo'
import MenuDemo from './demos/menu-demo'
import TabsDemo from './demos/tabs-demo'
import IconDemo from './demos/icon-demo'
import TransitionDemo from './demos/transition-demo'
import InputDemo from './demos/input-demo'
import UploadDemo from './demos/upload-demo'
import UploadCom from './demos/uploadCom'

function App() {
  const [title, setTitle] = useState('')
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts/1').then(response => {  setTitle(response.data.title) })
  }) 
  let styleProps = {
    backgroundColor: '#eae6e6', marginBottom: '100px', padding: '20px 60px'
  }
  return (
    <div className="App">
      <div style={{...styleProps}}>
        <b>Title: {title}</b>
      </div>
      <div style={{...styleProps}}>
        <ButtonDemo />
      </div>
      
      <AlertDemo />
      <InputDemo />
      <TransitionDemo />
      <IconDemo />
      <TabsDemo />
      <MenuDemo />
      <UploadDemo />
      <UploadCom />
    </div>
  )
}

export default App;

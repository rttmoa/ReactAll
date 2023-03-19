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


function App() {
  const [title, setTitle] = useState('')
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts/1').then(response => { setTitle(response.data.title) })
  })
  return (
    <div className="App" style={{padding: '20px 80px'}}>
      <b>{title}</b>
      <br />
      <AlertDemo />
      {/* <UploadDemo /> */}
      {/* <InputDemo /> */}
      {/* <TransitionDemo /> */}
      {/* <IconDemo /> */}
      {/* <TabsDemo /> */}
      {/* <MenuDemo /> */}
      {/* <ButtonDemo /> */}
      
    </div>
  )
}

export default App;

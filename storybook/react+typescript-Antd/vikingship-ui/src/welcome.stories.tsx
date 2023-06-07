import React from 'react'
import { storiesOf } from '@storybook/react'






storiesOf('Welcome', module)
  .add('welcome', () => {
    return (
      <>
        <h1>欢迎来到 vikingship 组件库</h1>
        <p> React Hooks 和 typescript</p>
        <h3>安装试试</h3>
        <code>
          npm install vikingship --save
        </code>
      </>
    )
  }, { info : { disable: true }})
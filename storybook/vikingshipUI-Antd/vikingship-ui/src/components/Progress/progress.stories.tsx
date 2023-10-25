import React from 'react'
import { storiesOf } from '@storybook/react'
import Progress from './progress'




const defaultProcess = () => <Progress percent={20} />

const withTextProcess = () => <Progress percent={50} showText={false} />

const strokeHeightProcess = () => <Progress percent={50} strokeHeight={50} />

const addProcess = () => <Progress percent={30} strokeHeight={33} showText={true} theme="danger" />

const useProgress = () => {
  return (
    <>
      <p><Progress percent={30} /></p>
      <p><Progress percent={30} showText={false} /></p>
      <p><Progress percent={30} strokeHeight={40}/></p>
      <p><Progress percent={30} strokeHeight={40} showText={true} theme='danger' /></p>
    </>
  )
}

storiesOf('Process Component', module).add('useProcess', useProgress).add('Process', defaultProcess).add('不显示百分比', withTextProcess).add('不同的高度', strokeHeightProcess).add('03-20', addProcess)

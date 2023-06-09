import React from 'react'
import { storiesOf } from '@storybook/react'
import Progress from './progress'




const defaultProcess = () => (
  <Progress percent={20} />
)

const withTextProcess = () => (
  <Progress percent={50} showText={false} />
)

const strokeHeightProcess = () => (
  <Progress percent={50} strokeHeight={50} />
)

const addProcess = () => <Progress percent={30} strokeHeight={33} showText={true} theme="danger" />

storiesOf('Process Component', module)
  .add('Process', defaultProcess)
  .add('不显示百分比', withTextProcess)
  .add('不同的高度', strokeHeightProcess)
  .add("03-20", addProcess)
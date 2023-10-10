import React from 'react'
import { Trash } from '../../components/Trash'
import { Title } from '../../components/Title'
import { TipGood, TipBad, TipCompat,TipInfo } from '../../components/Tip'
import { PostItem } from '../../components/PostItem'
import { List, ListItemGood, ListItemBad } from '../../components/List'

import { Button } from '../../components/Button'
import { Community } from '../../components/Community'


// todo 此文件Url：  http://localhost:3000/view
function views() {
  return (
    <div>
      <div style={{ width: 1200, height: 1000, margin: '20px auto' }}>
        <h2>测试组件</h2>
        {/* <Trash title="123" onRemove = {() => {}}>123</Trash> */}
        <p>
          <Title suffix="测试页">测试 components</Title>
        </p>
        <p>
          <h1 style={{fontSize: 22}}><b>Tip提示组件</b></h1>
          <TipGood>TipGood</TipGood>
          <TipBad>Tipbad</TipBad>
          <TipCompat>TipCompat</TipCompat>
          <TipInfo>TipInfo</TipInfo>
        </p>
        <hr />
        <p>
          {/* <PostItem title="PostItem" category="category" slug="slug" date="2023-01-02" wide>PostItem</PostItem> */}
          <ListItemGood>children</ListItemGood>
          <ListItemBad>children</ListItemBad>
        </p>
        <p>
          <Button color='indigo' darkColor="sky" href="#" reverse={true} onClick={() => console.log(123)}>Button</Button>
          <Community></Community>
        </p>
        <p>下一个</p>
      </div>
    </div>
  )
}

export default views

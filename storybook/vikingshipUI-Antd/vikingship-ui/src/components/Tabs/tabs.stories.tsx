import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
import Tabs from './tabs'
import TabsItem from './tabsItem'
import Icon from '../Icon'
import { UseTabs, UseTabsItems } from './UseTabs'
// import UseTabsItems from './UseTabs'

export const defaultTabs = () => (
  <Tabs onSelect={function noRefCheck(selectedIndex){console.log(selectedIndex);}}>
    <TabsItem label="选项卡一">
      this is content one
    </TabsItem>
    <TabsItem label="选项卡二">
      this is content two
    </TabsItem>
    <TabsItem label="用户管理">
      this is content three
    </TabsItem>
  </Tabs>
)

export const tabsWithOutline = () => (
  <Tabs onSelect={function noRefCheck(){}} styleType="outline">
    <TabsItem label="card1">
      this is card one
    </TabsItem>
    <TabsItem label="card2">
      this is content two
    </TabsItem>
    <TabsItem disabled label="disabled">
      this is content three
    </TabsItem>
    <TabsItem label="card4">
      this is content four
    </TabsItem>
  </Tabs>
)

export const tabsWithCustom = () => (
  <Tabs onSelect={function noRefCheck(){}} styleType="outline">
    <TabsItem label={<><Icon icon="exclamation-circle" />{'  '}自定义图标</>}>
      this is card one
    </TabsItem>
    <TabsItem label="tab2">
      this is content two
    </TabsItem>
  </Tabs>
)


const useTabs = () => {
  return (
    <div>
      <UseTabs defaultIndex={2} styleType='outline' onSelect={(selectedIndex) => {console.log(selectedIndex);}} className=''>
        <UseTabsItems label={<><Icon icon="exclamation-circle" />{"  select one"}</>}><div><span>Content1</span></div></UseTabsItems>
        <UseTabsItems label="select two" disabled={true}><button>Content2</button></UseTabsItems>
        <UseTabsItems label="select three"><p><h4>Content3</h4></p></UseTabsItems>  
        <UseTabsItems label="select four"><div><b>Content4</b></div></UseTabsItems>
      </UseTabs>  
    </div>
  )
}

storiesOf('Tabs Component', module)
.add('useTabs', useTabs)
  .add('Tabs', defaultTabs)
  .add('选项卡样式的 Tabs', tabsWithOutline)
  .add('自定义选项卡样式 Tabs', tabsWithCustom)

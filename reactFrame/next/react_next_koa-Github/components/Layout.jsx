import { useState, useCallback } from 'react'
import getCofnig from 'next/config'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import axios from 'axios'
import Link from 'next/link'
import {  Button,  Layout,  Icon,  Input,  Avatar,  Tooltip,  Dropdown,  Menu } from 'antd'
import Container from './Container'
import { logout } from '../store/store'

const { Header, Content, Footer } = Layout;
const { publicRuntimeConfig } = getCofnig()

const githubIconStyleProps = {
  color: 'white',
  fontSize: 40,
  display: 'block',
  paddingTop: 10,
  marginRight: 20,
}


// 1、父组件要传入子组件的Comp
// const Comp = ({ color, children }) => <div style={{color}}>{children}</div>
// 2、父组件渲染
// <Container  comp={Comp}>{children}</Container>
// 3、子组件
// export default ({children, comp: Comp}) => {
//   return <Comp style={style}>{children}</Comp>
// }


/** #### TODO: 布局：头部，内容区域，底部 ---*/
function MyLayout({ children, user, logout, router }) { 
  // console.log("user", user)
  // console.log("router", router)

  const urlQuery = router.query && router.query.query
  // Input.Search['value']
  const [search, setSearch] = useState(urlQuery || '') // 输入框内的Value
  // Input.Search['onChange']
  const handleSearchChange = useCallback(event => { setSearch(event.target.value) }, [setSearch]) // 输入框关键词 Change
  // Input.Search['onSearch']
  const handleOnSearch = useCallback(() => {router.push(`/search?query=${search}`)}, [search]) // 搜索关键词

  
  const handleLogout = useCallback(() => {logout()}, [logout]) // 退出登陆
  const handleGotoOAuth = useCallback(e => {
    e.preventDefault();
    axios.get(`/prepare-auth?url=${router.asPath}`).then(resp => {
        if (resp.status === 200) {
          location.href = publicRuntimeConfig.OAUTH_URL
        } else {
          console.log('prepare auth failed', resp)
        }
      }).catch(err => {
        console.log('prepare auth failed', err)
      }) 
  }, [])

  const userDropDown = (
    <Menu>
      <Menu.Item>
        <a href="javascript:void(0)">占 位</a>
      </Menu.Item>
      <Menu.Item> 
        <a href="javascript:void(0)" onClick={handleLogout}>登 出</a>
      </Menu.Item>
    </Menu>
  )


  // TODO: 渲染页面布局：组件传递过来的值去渲染
    // <Container /> 组件复用
  return (
    <Layout>

      <Header>
        {/* TODO: React.cloneElement扩展组件可复用性的高级技巧 - <Container /> */}
        <Container renderer={<div className="header-inner" />}>
          <div className="header-left">
            <div className="logo">
              <Link href="/">
                <Icon type="github" style={githubIconStyleProps} />
              </Link>
            </div>
            <div>
              <Input.Search placeholder="搜索仓库" value={search} onChange={handleSearchChange} onSearch={handleOnSearch} />
            </div>
          </div>
          <div className="header-right">
            <div className="user">
              {user && user.id ? (
                <Dropdown overlay={userDropDown}>
                  <a href="/"><Avatar size={40} src={user.avatar_url} /></a>
                </Dropdown>
              ) : (
                <Tooltip title="点击进行登录">
                  <a href={`/prepare-auth?url=${router.asPath}`}><Avatar size={40} icon="user" /></a>
                </Tooltip>
              )}
            </div>
          </div>
        </Container>
      </Header>


      <Content>
        <Container>{children}</Container>
        {/* <Container renderer={<p style={{backgroundColor: 'pink', height: 500}} />}>{children}</Container> */}
        {/* <Container renderer={<div />}>{children}</Container> */}
        {/* <Container renderer={<Comp color="red" />}>{children}</Container> */}
        {/* <Container><Comp color="red">{children}</Comp></Container> */}
        {/* <Container comp="p"><div className='content'>{children}</div></Container>  */}
        {/* <Container comp={Comp}>{children}</Container> */}
      </Content>
      <Footer style={{textAlign: 'center'}}>
        Develop by Jokcy @<a href="mailto:jokcy@hotmail.com">jokcy@hotmail.com</a>
      </Footer>
      <style jsx>{`
        .content {
          color: red;
        }
        .header-inner {
          display: flex;
          justify-content: space-between;
        }
        .header-left {
          display: flex;
          justify-content: flex-start;
        }
      `}</style>
      <style jsx global>{`
        #__next {
          height: 100%;
        }
        .ant-layout {
          min-height: 100%;
        }
        .ant-layout-header {
          padding-left: 0;
          padding-right: 0;
        }
        .ant-layout-content {
          background: #fff;
        }
      `}</style>
    </Layout>
  )
}
function mapState(state) {
  return { user: state.user }
}
function mapReducer(dispatch) {
  return { logout: () => dispatch(logout())}
}
export default connect(mapState, mapReducer)(withRouter(MyLayout))  

import { memo, isValidElement, useEffect } from 'react'
import { withRouter } from 'next/router'
import { Row, Col, List, Pagination } from 'antd'
import Link from 'next/link'
// import Router from 'next/router'
import Repo from '../components/Repo'
import { cacheArray } from '../lib/repo-basic-cache'
const api = require('../lib/api')


// todo Search: http://localhost:3000/search?query=react

// 筛选条件： 语言类型
const LANGUAGES = ['JavaScript', 'HTML', 'CSS', 'TypeScript', 'Java', 'Rust']

// 筛选条件： 排序类型
const SORT_TYPES = [
  { name: 'Best Match' },
  { name: 'Most Stars', value: 'stars', order: 'desc', },
  { name: 'Fewest Stars', value: 'stars', order: 'asc', },
  { name: 'Most Forks', value: 'forks', order: 'desc', },
  { name: 'Fewest Forks', value: 'forks', order: 'asc', },
]

const selectedItemStyle = {
  borderLeft: '2px solid #e36209',
  fontWeight: 700,
}



// 判断是服务端渲染还是客户端渲染
const isServer = typeof window === 'undefined'


function noop (page, pageSize) { console.log('分页', page, pageSize) }
const per_page = 5;
const FilterLink = memo(({ name, query, lang, sort, order, page }) => { // 不依赖任何的state，可以放外部，没有任何副作用
  let queryString = `?query=${query}`
  if (lang) queryString += `&lang=${lang}`
  if (sort) queryString += `&sort=${sort}&order=${order || 'desc'}`
  if (page) queryString += `&page=${page}`
  queryString += `&per_page=${per_page}`

  return (
    <Link href={`/search${queryString}`}>
      {isValidElement(name) ? name : <a>{name}</a>}
    </Link>
  )
})


/**
 * ! Search Page  （左侧筛选条件 + 右侧仓库列表）
 * 地址栏中的参数 （服务端处理返回给客户端）
 * sort: 排序方式
 * order: 排序顺序
 * lang: 仓库的项目开发主语言
 * page：分页页面
 * 封装组件：<Repo />
 */
function Search ({ router, repos }) { // withRouter 包裹组件
  const { ...querys } = router.query;
  const { lang, sort, order, page } = router.query;
  // console.log("querys", querys) // {query: 'react', lang: 'JavaScript', sort: 'forks', order: 'desc', page: '1', per_page: "20"}
  // console.log("repos", repos)

  useEffect(() => {
    // cache缓存页面数据 && 对于cacheArray，服务端是没有必要去执行的 && 这个是用户去搜索有关的
    if (!isServer) cacheArray(repos.items)
  })

  return (
    <div className="root">
      {/* gutter是Row中的每一个Col之前的空格 */}
      <Row gutter={30}>

        <Col span={6}>
          <List
            bordered
            header={<span className="list-header">语言</span>}
            style={{ marginBottom: 20 }}
            dataSource={LANGUAGES}
            renderItem={item => { // 每一项
              const selected = lang === item
              return (
                <List.Item style={selected ? selectedItemStyle : null}>
                  {selected ? <span>{item}</span> : (
                    // http://localhost:3000/search?query=react&lang=JavaScript&page=3&per_page=20
                    <FilterLink {...querys} lang={item} name={item} />
                  )}
                </List.Item>
              )
            }}
          />
          <List
            bordered
            header={<span className="list-header">排序</span>}
            dataSource={SORT_TYPES}
            renderItem={item => {
              let selected = false
              if (item.name === 'Best Match' && !sort) {
                selected = true
              } else if (item.value === sort && item.order === order) {
                selected = true
              }
              return (
                <List.Item style={selected ? selectedItemStyle : null}>
                  {/* <a onClick={() => doSearch({lang, query, sort: item.value||"", order: item.order||""})}>{item.name}</a> */}
                  {selected ? (<span>{item.name}</span>) : (
                    // http://localhost:3000/search?query=react&lang=JavaScript&sort=forks&order=desc&page=3&per_page=20
                    <FilterLink {...querys} sort={item.value} order={item.order} name={item.name} />
                  )}
                </List.Item>
              )
            }}
          />
        </Col>

        {/* 渲染仓库 + 分页 */}
        {repos && (
          <Col span={18}>
            <h3 className="repos-title">{repos.total_count} 个仓库</h3>
            {repos.items && repos.items.map(repo => (<Repo repo={repo} key={repo.id} />))}
            <div className="pagination">
              <Pagination
                pageSize={per_page}
                current={Number(page) || 1}
                total={repos.total_count}
                onChange={noop}
                // 参数： 页码，按钮类型，Icon
                itemRender={(page, type, ol) => {
                  const p = type === 'page' ? page : type === 'prev' ? page - 1 : page + 1
                  const name = type === 'page' ? page : ol
                  return <FilterLink {...querys} page={p} name={name} />
                }}
              />
            </div>
          </Col>
        )}

      </Row>
      <style jsx>{`
        .root {
          padding: 20px 0;
        }
        .list-header {
          font-weight: 800;
          font-size: 16px;
        }
        .repos-title {
          border-bottom: 1px solid #eee;
          font-size: 24px;
          line-height: 50px;
        }
        .pagination {
          padding: 20px;
          text-align: center;
        }
      `}</style>
    </div>
  )
}

Search.getInitialProps = async ({ ctx }) => { 
  const { query, sort, lang, order, page } = ctx.query
  if (!query) return { repos: { total_count: 0 } }

  // search?q=react+language:javascript&sort=stars&order=desc&page=2
  // search?query=react&lang=TypeScript&sort=stars&order=desc&page=3&per_page=5
  let queryString = `?q=${query}`
  if (lang) queryString += `+language:${lang}`
  if (sort) queryString += `&sort=${sort}&order=${order || 'desc'}`
  if (page) queryString += `&page=${page}`
  queryString += `&per_page=${per_page}`

  // 传入 req, res 这是API约定
  const result = await api.request({ url: `/search/repositories${queryString}` }, ctx.req, ctx.res)   
  
  return {
    repos: result.data,
  }
}

export default withRouter(Search)

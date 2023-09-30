import { useState, useCallback, useEffect } from 'react'
import { Avatar, Button, Select, Spin } from 'antd'
import dynamic from 'next/dynamic'
import { getLastUpdated } from '../../lib/utils'
import withRepoBasic from '../../components/with-repo-basic';   /* TODO: 使用 withRepoBasic 组件 包裹组件 */
import SearchUser from '../../components/SearchUser';
const MdRenderer = dynamic(() => import('../../components/MarkdownRenderer'));
import api from '../../lib/api';



const CACHE = {}

// todo issue: http://localhost:3000/detail/issues?owner=primer&name=react

/** #### TODO: 查看 Issue 详情  显示与隐藏  */
function IssueDetail({ issue }) {
  // console.log("IssueDetail-issue", issue)
  return (
    <div className="root">
      <MdRenderer content={issue.body} />
      <div className="actions">
        <Button href={issue.html_url} target="_blank">打开Issue讨论页面（github Issue）</Button>
      </div>
      <style jsx>{`
        .root {
          background: #fefefe; // MarkDown背景颜色   #fafafa：浅灰
          padding: 20px;
        }
        .actions {
          text-align: right;
        }
      `}</style>
    </div>
  )
}




/** #### TODO: 每一项Issue外壳  */
function IssueItem({ issue }) {

  // 使用按钮控制Detail的显示与隐藏
  const [showDetail, setShowDetail] = useState(false);
  const toggleShowDetail = useCallback(() => {setShowDetail(detail => !detail)}, [])

  return (
    <div>
      <div className="issue">
        <Button type="primary" size="small" onClick={toggleShowDetail} style={{ position: 'absolute', right: 10, top: 10 }}>
          {showDetail ? '隐藏' : '查看'}
        </Button>
        <div className="avatar">
          <Avatar src={issue.user.avatar_url} shape="square" size={50} />
        </div>
        <div className="main-info">
          <h6>
            <span>{issue.title}</span>
            {issue.labels.map(label => (<Label label={label} key={label.id} />))}
          </h6>
          <p className="sub-info">
            <span>Updated at ~ {getLastUpdated(issue.updated_at)}</span>
          </p>
        </div>
        <style jsx>{`
          .issue {
            display: flex;
            position: relative;
            padding: 10px;
          }
          {/* 鼠标移上去 */}
          .issue:hover {
            background: #fafafa;
          }
          .issue + .issue {
            border-top: 1px solid #eee;
          }
          .main-info > h6 {
            max-width: 600px;
            font-size: 16px;
            padding-right: 40px;
          }
          .avatar {
            margin-right: 20px;
          }
          .sub-info {
            margin-bottom: 0;
          }
          .sub-info > span + span {
            display: inline-block;
            margin-left: 20px;
            font-size: 12px;
          }
        `}</style>
      </div>
      {showDetail ? <IssueDetail issue={issue} /> : null}
    </div>
  )
}



/** #### TODO: 渲染 标签(灰色，紫色，红色，绿色)  */
function Label({ label }) {
  // console.log("label", label)
  return (
    <>
      <span className="label" style={{ background: `#${label.color}` }}>{label.name}</span>
      <style jsx>{`
        .label {
          display: inline-block;
          line-height: 20px;
          margin-left: 15px;
          padding: 3px 10px;
          border-radius: 3px;
          font-size: 14px;
        }
      `}</style>
    </>
  )
}


const isServer = typeof window === 'undefined';
const Option = Select.Option;
/** 搜索框内Url  */
function makeQuery(creator, state, labels) {
  let creatorStr = creator ? `creator=${creator}` : "";
  let stateStr = state ? `state=${state}` : ''
  let labelStr = ''
  if (labels && labels.length > 0) {
    labelStr = `labels=${labels.join(',')}`; // 以 ， 分割的字符串
  } 
  const arr = [] 
  if (creatorStr) arr.push(creatorStr)
  if (stateStr) arr.push(stateStr)
  if (labelStr) arr.push(labelStr)

  return `?${arr.join('&')}`;
}

  

/**
 * TODO: 在标题上显示label！！！！！
 */
function Issues({ initialIssues, labels, owner, name }) {    // 在服务端渲染的时候，将labels返回，在Issues页面当中使用

  const [creator, setCreator] = useState(); // 搜索框：创建者

  const [state, setState] = useState(); // 搜索框：状态

  const [label, setLabel] = useState([]); // 搜索框：Label

  const [issues, setIssues] = useState(initialIssues); // 问题列表

  const [fetching, setFetching] = useState(false); // 设置 加载状态(按钮，页面的加载图标) 

  useEffect(() => {
    // 在服务端渲染的时候跳过
    if (!isServer) {
      CACHE[`${owner}/${name}`] = labels;   // 在浏览器端存储，在控制台中取用
    }
  }, [owner, name, labels]);

  const handleCreatorChange = useCallback(value => {setCreator(value)}, []);  // SearchUser 组件回调 搜索创建者内容

  const handleStateChange = useCallback(value => {setState(value)}, []);

  const handleLabelChange = useCallback(value => {setLabel(value)}, []);

  const handleSearch = useCallback(() => {
    setFetching(true);
    // URL: "/github/repos/facebook/react/issues?state=all&labels=Browser: IE,Browser: Safari,CLA Signed"
    api.request({ url: `/repos/${owner}/${name}/issues${makeQuery(creator, state, label)}`}).then(resp => {
      // console.log("搜索响应内容", resp)
      setIssues(resp.data);
      setFetching(false);
    }).catch(err => {
      console.error("搜索框搜索内容 Error", err);
      setFetching(false);
    })
  }, [owner, name, creator, state, label]);  // TODO: 如果搜索框中条件改变，搜索按钮会根据新条件去查询

  // console.log("labels", labels)


  return (
    <div className="root">
      <div className="search">
        <SearchUser onChange={handleCreatorChange} value={creator} /> {/* 搜索组件封装 */}
        <Select placeholder="状态" onChange={handleStateChange} style={{ width: 200, marginLeft: 20 }} value={state}>
          <Option value="all">all</Option>
          <Option value="open">open</Option>
          <Option value="closed">closed</Option>
        </Select>
        <Select mode="multiple" placeholder="Label" onChange={handleLabelChange} style={{ flexGrow: 1, marginLeft: 20, marginRight: 20 }} value={label}>
          {labels.map(la => (
            <Option value={la.name} key={la.id}>
              {la.name}
            </Option>
          ))}
        </Select>
        {/* 通过 fetching 来控制的按钮是否可以点击/禁用 */}
        <Button type="primary" disabled={fetching} onClick={handleSearch}>
          搜索
        </Button>
      </div>
      {fetching ? (
        <div className="loading">
          <Spin />
        </div>
      ) : (
        <div className="issues">
          {issues.map(issue => (<IssueItem issue={issue} key={issue.id} />))}
        </div>
      )}
      
      <style jsx>{`
        .issues {
          border: 1px solid #eee;
          border-radius: 5px;
          margin-bottom: 20px;
          margin-top: 20px;
        }
        .search {
          display: flex;
        }
        .loading {
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>

    </div>
  )
}

Issues.getInitialProps = async ({ ctx }) => {   // TODO: 在控制台CMD中打印
  // console.log('issues getInitialProps invoked')

  const { owner, name } = ctx.query;
  const full_name = `${owner}/${name}`;
  
  // TODO: 并发请求
  const fetchs = await Promise.all([
    await api.request({url: `/repos/${owner}/${name}/issues`}, ctx.req, ctx.res),
    CACHE[full_name] ? Promise.resolve({ data: CACHE[full_name] }) : await api.request({url: `/repos/${owner}/${name}/labels`}, ctx.req, ctx.res),
  ]);
  // console.log("fetchs", fetchs) // 控制台中打印

  return {
    owner,
    name,
    initialIssues: fetchs[0].data,
    labels: fetchs[1].data
  }
}
export default withRepoBasic(Issues, 'issues');

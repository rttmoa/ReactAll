import { useState, useCallback, useEffect } from 'react'
import { Avatar, Button, Select, Spin } from 'antd'
import dynamic from 'next/dynamic'
import { getLastUpdated } from '../../lib/utils'
import withRepoBasic from '../../components/with-repo-basic';   /* TODO: 使用 withRepoBasic 组件 包裹组件 */
import SearchUser from '../../components/SearchUser';
import api from '../../lib/api';
const MdRenderer = dynamic(() => import('../../components/MarkdownRenderer'));


const CACHE = {}

// todo issue: http://localhost:3000/detail/issues?owner=facebook&name=react




/** #### 查看 Issue 详情  显示与隐藏 （渲染 MD + 跳转Github）  */
function IssueDetail({ issue }) {
  return (
    <div className="root">
      <MdRenderer content={issue.body} />
      <div className="actions">
        <Button type='primary' href={issue.html_url} target="_blank">打开Issue讨论页面（github Issue）</Button>
      </div>
      <style jsx>{`
        .root {
          background: #eee; // MarkDown 背景颜色   #eee：浅灰
          padding: 20px 40px;
        }
        .actions {
          text-align: right;
        }
      `}</style>
    </div>
  )
}

/** #### 渲染 标签(灰色，紫色，红色，绿色) Tag */
function Label({ label }) {
  return (
    <>
      <span className="label" style={{ background: `#${label.color}` }}>{label.name}</span>
      <style jsx>{`
        .label {
          display: inline-block;
          line-height: 20px;
          margin-left: 15px;
          padding: 2px 5px;
          border-radius: 5px;
          font-size: 12px;
        }
      `}</style>
    </>
  )
}

/** #### Issue Item  */
function IssueItem({ issue }) {

  // 使用按钮控制 IssueDetail 的显示与隐藏
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
            background: #eee;
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
      {showDetail && <IssueDetail issue={issue} />}
    </div>
  )
}



const isServer = typeof window === 'undefined';

const Option = Select.Option;

  
function Issues({ initialIssues, labels, owner, name }) {  // 服务端得到； 问题列表、标签列表

  const [creator, setCreator] = useState(); // 搜索框：创建者

  const [state, setState] = useState(); // 搜索框：状态

  const [label, setLabel] = useState([]); // 搜索框：Label

  const [issues, setIssues] = useState(initialIssues); // 问题列表

  const [fetching, setFetching] = useState(false); // 加载状态（详情问题的加载）

  useEffect(() => {
    // 在服务端渲染的时候跳过
    if (!isServer) {
      CACHE[`${owner}/${name}`] = labels;   // 在浏览器端存储，在控制台中取用
    }
  }, [owner, name, labels]);

  const handleCreatorChange = useCallback(value => {setCreator(value)}, []);  // SearchUser 组件回调 搜索创建者内容

  const handleStateChange = useCallback(value => {setState(value)}, []); // value: all | open | closed

  const handleLabelChange = useCallback(value => {setLabel(value)}, []); // (4) ['Browser: IE', 'Browser: Safari', 'Component: DOM', 'Component: Hooks']


  function makeQuery(creator, state, labels) {
    // url: "/github/repos/facebook/react/issues?creator=rttmoa&state=open&labels=Browser: IE,Browser: Safari"
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
  const handleSearch = useCallback(() => {
    setFetching(true); 
    // url: "/github/repos/facebook/react/issues?creator=rttmoa&state=open&labels=Browser: IE,Browser: Safari"
    api.request({ url: `/repos/${owner}/${name}/issues${makeQuery(creator, state, label)}`}).then(resp => {
      // console.log("SearchButton：", resp) // todo 查询结果 （客户端）
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
        {/* 输入 创建者 输入框加载状态 */}
        <SearchUser onChange={handleCreatorChange} value={creator} />  
        <Select placeholder="状态" onChange={handleStateChange} style={{ width: 200, marginLeft: 20 }} value={state} disabled={fetching}>
          <Option value="all">all</Option>
          <Option value="open">open</Option>
          <Option value="closed">closed</Option>
        </Select>
        <Select mode="multiple" placeholder="Label" onChange={handleLabelChange} style={{ flexGrow: 1, marginLeft: 20, marginRight: 20 }} value={label}         disabled={fetching}>
          {labels.map(la => (
            <Option value={la.name} key={la.id}>
              {la.name}
            </Option>
          ))}
        </Select>
        <Button type="primary" disabled={fetching} onClick={handleSearch}>搜索</Button>
      </div>
      {fetching ? (
        // 搜索时，加载 Loading 效果
        <div className="loading"><Spin /></div>
      ) : (
        // 渲染所有 Issue Item
        <div className="issues">{issues.map(issue => (<IssueItem issue={issue} key={issue.id} />))}</div>
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

Issues.getInitialProps = async ({ ctx }) => {
  const { owner, name } = ctx.query;
  const full_name = `${owner}/${name}`;
  
  // 并发请求
  const fetchs = await Promise.all([
    await api.request({url: `/repos/${owner}/${name}/issues`}, ctx.req, ctx.res),
    CACHE[full_name] ? Promise.resolve({ data: CACHE[full_name] }) : await api.request({url: `/repos/${owner}/${name}/labels`}, ctx.req, ctx.res),
  ]); 
  // console.log(fetchs)

  return {
    owner,
    name,
    initialIssues: fetchs[0].data,
    labels: fetchs[1].data
  }
}

// TODO:  将Issue页面传入高阶组件中，高阶组件中处理 仓库信息， 返回 <Com {...rest} /> 组件信息
export default withRepoBasic(Issues, 'issues');  

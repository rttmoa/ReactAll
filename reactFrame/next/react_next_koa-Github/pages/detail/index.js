import dynamic from 'next/dynamic';    /* 异步模块加载 */
import api from '../../lib/api';

import withRepoBasic from '../../components/with-repo-basic';  



// 异步组件加载： MDRenderer这个组件只有等到 Detail 执行渲染的时候， 它才会被真正的加载
const MDRenderer = dynamic(() => import('../../components/MarkdownRenderer'), {
  // 第二个参数 在异步加载的时候，可以反馈给用户加载的状态，而不是空白的内容
  loading: () => <p>Loading</p>
})
function Detail({ readme }) {
  return <MDRenderer content={readme.content} isBase64={true} />
}
Detail.getInitialProps = async ({ router, ctx: { query: { owner, name }, req, res } }) => { // todo 传入 ctx.query.owner/name  供高阶组件中使用
  const readmeResp = await api.request({url: `/repos/${owner}/${name}/readme`}, req, res);
  return {
    readme: readmeResp.data
  }
}
export default withRepoBasic(Detail, 'index')   // TODO: 高阶组件中传入 index   （高阶组件中处理详情页面的  卡片和Markdown部分）
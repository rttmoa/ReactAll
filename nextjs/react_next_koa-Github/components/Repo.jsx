import Link from 'next/link'
import { Icon } from 'antd'

import { getLastUpdated } from '../lib/utils';

function getLicense(license) {
  return license ? `${license.spdx_id} license` : "";
}



/** #### TODO: 仓库列表数据 ---*/
export default ({ repo }) => {

  return (
    // .rootdiv
    // p.other-info
    <div className="root">

      {/* 仓库标题 & 描述 & 时间 & issues数量 */}
      <div className="basic-info">
        <h3 className="repo-title">
          <Link href={`/detail?owner=${repo.owner.login}&name=${repo.name}`}>
            <a>{repo.full_name}</a>
          </Link>
        </h3>
        <p className="repo-desc">{repo.description}</p>
        <p className="other-info">
          {repo.license ? (<span className="license">{getLicense(repo.license)}</span>) : null}
          <span className="last-updated">{getLastUpdated(repo.updated_at)}</span>{"  "}
          <span className="open-issues" style={{color: "red"}}>{repo.open_issues_count} open issues</span>
        </p>
      </div>

      {/* 语言 Star数 */}
      <div className="lang-star">
        <span className="lang">{repo.language}</span>
        <span className="stars">{repo.stargazers_count} <Icon type="star" theme="filled" /></span>
      </div>

      <style jsx>{`
        .root {
          display: flex;
          justify-content: space-between; 
        }
        .other-info > span + span {
          margin-left: 10px;
        }
        {/* 相邻兄弟 */}
        .root + .root {
          border-top: 3px solid #eee;
          padding-top: 20px;
        }
        .repo-title {
          font-size: 20px;
        }
        .lang-star {
          display: flex;
        }
        {/* 下面所有 span */}
        .lang-star > span {
          width: 120px;
          text-align: right;
        } 
        .repo-desc {
          width: 400px;
        }
      `}</style>
    </div>
  )
}

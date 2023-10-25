import moment from 'moment'
// import moment from 'moment/locale/zh-cn' // 在next config js 中做了处理

  
/** 格式化时间 - 多久之前 */
export function getLastUpdated(time) {
  return moment(time).fromNow()
}

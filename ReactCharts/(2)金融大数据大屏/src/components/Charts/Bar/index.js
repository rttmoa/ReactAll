/*青岛研锦网络科技有限公司  版权所有*/

// 本资源来源于云码资源淘宝店铺
// 访问地址：https://shop188702750.taobao.com
// 更多超优质资源欢迎访问
import BaseChart from '../lib/BaseChart';
import option from './option';
import getOption from './getOption';

export default class Bar extends BaseChart {
  static defaultProps = {
    option,
    getOption,
  };
}

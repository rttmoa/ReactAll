import BaseChart from '../lib/BaseChart';
import option from './option';
import getOption from './getOption';




/***--- 饼图 继承 BaseChart ---**/
export default class Pie extends BaseChart {
  static defaultProps = {
    option,
    getOption,
  };
}

import BaseChart from '../lib/BaseChart';
import option from './option';
import getOption from './getOption';



/***--- Bar 继承 BaseChart ---**/
export default class Bar extends BaseChart {
  static defaultProps = {
    option,
    getOption,
  };
}

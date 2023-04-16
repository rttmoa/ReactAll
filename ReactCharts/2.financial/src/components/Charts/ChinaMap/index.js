import 'echarts/map/js/china';
// import 'echarts-gl';
import BaseChart from '../lib/BaseChart';
import option from './option';
import getOption from './getOption';



/***--- ChinaMap 继承 BaseChart ---**/
export default class ChinaMap extends BaseChart {
  static defaultProps = {
    option,
    getOption,
  };
}

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Echarts from 'echarts-for-react';





export default class BaseChart extends PureComponent {
  static propTypes = {
    option: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    getOption: PropTypes.func.isRequired,
    style: PropTypes.object,
  };

  static defaultProps = {
    style: {},
  };

  componentDidMount() {
    const { runAction } = this.props;
    // console.log("runAction", runAction)

    if (this.chartRef && runAction) {
      // console.log("this.chartRef", this.chartRef)
      const chartIns = this.chartRef.getEchartsInstance();
      window.setTimeout(() => {
        runAction(chartIns);
      }, 500);
    }
  }

  render() {
    const { option, data, getOption, style } = this.props; 
    // debugger
    const finalOption = getOption(option, data);
    const finalStyle = getStyle(style);
    // console.log("this,props", this.props)
    // console.log("finalOption", finalOption)


    return (
      <Echarts
        ref={ref => { this.chartRef = ref }}
        style={finalStyle}
        option={finalOption}
        notMerge
        lazyUpdate
      />
    );
  }
}
function getStyle(style) {
  return Object.assign({ position: 'relative' }, style);
}
// function getStyle(style) {
//   return Object.assign({position: 'relative',width: '100%',height: '100%',tranform: 'translate3d(0, 0, 0)',}, style);
// }
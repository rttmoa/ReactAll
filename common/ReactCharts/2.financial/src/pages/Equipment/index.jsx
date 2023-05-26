import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Card from '@/components/Card'
import Labels from '@/components/Labels'
import Pie from '@/components/Charts/Pie'
import { genEquipment } from '@/utils/genChartData'
import styles from './index.scss'

const legends = {
  PC: {
    key: 'PC',
    label: 'PC',
    type: 'circle',
    backgroundColor: '#FF8700',
  },
  Android: {
    key: 'Android',
    label: 'Android',
    type: 'circle',
    backgroundColor: '#ffc300',
  },
  Iphone: {
    key: 'Iphone',
    label: 'Iphone',
    type: 'circle',
    backgroundColor: '#00e473',
  },
  其它: {
    key: '其它',
    label: '其它',
    type: 'circle',
    backgroundColor: '#009DFF',
  },
};


@connect(({ loan }) => ({ loan }))
export default class index extends PureComponent {
  render() {
    const { loan } = this.props;
    const { equipment, channel } = loan;

    const equipmentData = genEquipment(equipment, legends)
    const channelData = calculate(channel) // 计算map后的 每个索引占比 百分比
    // console.log("equipment", equipment)
    // console.log("equipmentData", equipmentData)

    // console.log("channel", channel)
    // console.log("channelData", channelData)

    return (
      <Card title="设备渠道" legends={<Labels data={Object.values(legends)} />}>
        {/* 内容部分为 children */}

        <Pie data={equipmentData} style={{ height: 240 }} />

        {/* 渠道排行：合作方，核算，自营，其他 */}
        <div className={styles.channel}>
          <div className={styles.title}>渠道排行</div>
          {channelData.map(({ name, percent }) => (
            <div className={styles.column} key={name}>
              <div className={styles.label}>{name}</div>
              <div className={styles.bars}>
                <div className={styles.inner} />
                <div className={styles.outer} style={{ width: percent }} />
              </div>
              <div className={styles.num}>{percent}</div>
            </div>
          ))}
        </div>

      </Card>
    );
  }
}
function calculate(data = [], max) {
  let mmax = max;
  if (!mmax) {
    mmax = data.reduce((prev, cur) => cur.value + prev, 0);
    // console.log("mmax", mmax)    // value值总和：25600
  }
  return data.map(e => {
    // console.log("percent", (e.value * 100) / mmax) // 5位小数点
    // console.log( "percent", parseInt((e.value * 100) / mmax) ) // 取整
    // console.log("percent", parseInt((e.value * 100) / mmax, 10)) // 取整
    return ({ ...e, percent: `${parseInt((e.value * 100) / mmax, 10)}%` })
  });
}

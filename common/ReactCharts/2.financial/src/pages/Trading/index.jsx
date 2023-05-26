import React, { PureComponent } from "react";
import { connect } from "react-redux";
import animate from "animate.css";        //----->>>>    动画组件中 淡入 浅出
import Card from "@/components/Card";
import { moment, formatMoney } from "../../utils/util";

import styles from "./index.scss";

// Table表格的表头
const columns = [
  {
    title: "用户名",
    dataIndex: "userName",
    width: 100
  },
  {
    title: "时间",
    dataIndex: "time",
    width: 150
  },
  {
    title: "操作",
    dataIndex: "operate",
    width: 80
  },
  {
    title: "金额",
    dataIndex: "amt",
    width: 120
  },
  {
    title: "产品",
    dataIndex: "productName",
    width: 160
  }
];

@connect(({ map }) => ({ map }))
export default class index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      business: []   // 贷款人员信息
    };
  }
  // getDerivedStateFromProps 会在调用 render 方法之前调用，即在渲染 DOM 元素之前会调用，并且在初始挂载及后续更新时都会被调用
  static getDerivedStateFromProps(props, state) {
    const { map: { message } } = props;
    let { business } = state;
    if (Object.keys(message).length !== 0) {
      if (business.length > 7) {
        business = business.slice(0, 7);
      }
      // 返回新数组
      return {
        business: [{
            ...message,  // {address, money, telphone, username, value}
            time: +new Date(),
            operate: "贷款",
            productName: ""
          },
          ...business
        ]
      };
    }
    return null;
  }

  render() {
    // console.log("message", this.props.map.message)
    // console.log("business", this.state.business)


    return (
      <Card title='实时交易情况'>
        <table className={styles.tableBox}>
          <thead className={styles.tableHead}>
            <tr>
              {columns.map(c => (
                <th key={c.dataIndex} style={{ width: c.width }}>
                  {c.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {this.state.business.slice(0, 6).map((e, i) => (
              <tr key={e.telphone + Math.random()}
                className={`${animate.animated} ${i === 0 ? animate.fadeInRight : animate.slideInDown}`}
              >
                <td>{e.username}</td>
                <td>{moment(e.time).format()}</td>
                <td>{e.operate}</td>
                <td>￥{formatMoney(e.money * 10000)}</td>
                <td>测试产品签约</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    );
  }
}

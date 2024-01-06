import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Card from "../../components/Card";
import Funnel from "../../components/Charts/Funnel";
import Line from "../../components/Charts/Line";
import Labels from "@/components/Labels";
import { genUserConver, genUserConverLine } from "../../utils/genChartData";



/***--- 注册用户对象(regist)，实名用户对象(real)，贷款用户对象(loan) ---**/
const legends = {
  regist: {
    key: "regist",
    label: "注册用户",
    type: "circle",
    backgroundColor: "#465192"
  },
  real: {
    key: "real",
    label: "实名用户",
    type: "circle",
    backgroundColor: "#64609b"
  },
  loan: {
    key: "loan",
    label: "贷款用户",
    type: "circle",
    backgroundColor: "#8874a5"
  }
};

@connect(({ loan }) => ({ loan }))
export default class index extends PureComponent {
  render() {
    const { loan: { userConver } } = this.props; 
    const userConverData = genUserConver(userConver, legends);
    const userConverLineData = genUserConverLine(userConver, legends);
    // debugger


    return (
      <Card title='客户统计' legends={<Labels data={Object.values(legends)} />}>
        <Funnel data={userConverData} style={{ height: 200 }} />
        <Line data={userConverLineData} style={{ height: 220 }} />
      </Card>
    );
  }
}

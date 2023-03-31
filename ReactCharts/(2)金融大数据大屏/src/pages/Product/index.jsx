/*青岛研锦网络科技有限公司  版权所有*/

// 本资源来源于云码资源淘宝店铺
// 访问地址：https://shop188702750.taobao.com
// 更多超优质资源欢迎访问
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Card from "@/components/Card";
import Pie from "@/components/Charts/Pie";
import { genLoanProduct } from "@/utils/genChartData";

import styles from "./index.scss";

@connect(({ loan }) => ({
  loan
}))
export default class index extends PureComponent {
  render() {
    const { loan } = this.props;
    const { product, cooperator } = loan;
    const loanProductData = genLoanProduct(product);
    const loanCoopData = genLoanProduct(cooperator);
    return (
      <div className={styles.bottomCenter}>
        <Card title='产品统计'>
          <Pie data={loanProductData} />
        </Card>
        <Card title='合作方统计'>
          <Pie data={loanCoopData} />
        </Card>
      </div>
    );
  }
}

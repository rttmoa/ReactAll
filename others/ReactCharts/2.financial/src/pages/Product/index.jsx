import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Card from "@/components/Card";
import Pie from "../../components/Charts/Pie";
import { genLoanProduct } from "../../utils/genChartData";

import styles from "./index.scss";



@connect(({ loan }) => ({ loan }))
export default class index extends PureComponent {
  render() {
    const { loan: { product, cooperator } } = this.props;
    const loanProductData = genLoanProduct(product);
    const loanCoopData = genLoanProduct(cooperator);
    // console.log("loan", this.props)
    // console.log("产品", product)
    // console.log("合作方", cooperator)

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

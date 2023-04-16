import React, { PureComponent } from "react";
import ReactParticleLine from "react-particle-line";
import animate from "animate.css";
import { connect } from "react-redux";

// import Header from "@/pages/Header"; // 使用@
import Header from "../Header";
import Equipment from "../Equipment";
import Map from "../Map";
import Loan from "../Loan";
import Customer from "../Customer";
import Product from "../Product";
import Trading from "../Trading";
import styles from "./index.scss";

// @connect(({ loan }) => ({ loan }))
export default class Home extends PureComponent {
  render() {
    // console.log("Home", this.props) // {history: {…}, location: {…}, match: {…}, staticContext: undefined, loan: {…}, dispatch, …}
    return (
      <ReactParticleLine>
        <div className={styles.homeBox}>
          {/* 头部 */}
          <div className={styles.header}>
            <Header />
          </div>
          {/* 设备渠道 - 横向一 */}
          <div className={styles.topLeft}>
            {/* <Equipment /> */}
          </div>
          {/* 中国地图 - 横向二 */}
          <div className={`${styles.topCenter} ${animate.animated} ${animate.zoomIn}`}>
            {/* <Map /> */}
          </div>
          {/* 贷款金额 - 横向三 */}
          <div className={styles.topRight}>
            {/* <Loan /> */}
          </div>
          {/* 客户统计 - 横向一 */}
          <div className={styles.bottomLeft}>
            <Customer />
          </div>
          {/* 产品统计 - 横向二 */}
          <div className={styles.bottomCenter}>
            {/* <Product /> */}
          </div>
          {/* 实时交易情况 - 横向三 */}
          <div className={styles.bottomRight}>
            {/* <Trading /> */}
          </div>
        </div>
      </ReactParticleLine>
    );
  }
}

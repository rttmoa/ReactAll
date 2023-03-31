/*青岛研锦网络科技有限公司  版权所有*/

// 本资源来源于云码资源淘宝店铺
// 访问地址：https://shop188702750.taobao.com
// 更多超优质资源欢迎访问
import React, { PureComponent } from "react";
import ReactParticleLine from "react-particle-line";
import animate from "animate.css";
import Header from "@/pages/Header";
import Equipment from "@/pages/Equipment";
import Map from "@/pages/Map";
import Loan from "@/pages/Loan";
import Customer from "@/pages/Customer";
import Product from "@/pages/Product";
import Trading from "@/pages/Trading";

import styles from "./index.scss";

export default class Home extends PureComponent {
  render() {
    return (
      <ReactParticleLine>
        <div className={styles.homeBox}>
          <div className={styles.header}>
            <Header />
          </div>
          <div className={styles.topLeft}>
            <Equipment />
          </div>
          <div
            className={`${styles.topCenter} ${animate.animated} ${animate.zoomIn}`}
          >
            <Map />
          </div>
          <div className={styles.topRight}>
            <Loan />
          </div>
          <div className={styles.bottomLeft}>
            <Customer />
          </div>
          <div className={styles.bottomCenter}>
            <Product />
          </div>
          <div className={styles.bottomRight}>
            <Trading />
          </div>
        </div>
      </ReactParticleLine>
    );
  }
}

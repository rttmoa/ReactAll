/*青岛研锦网络科技有限公司  版权所有*/

// 本资源来源于云码资源淘宝店铺
// 访问地址：https://shop188702750.taobao.com
// 更多超优质资源欢迎访问
import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import ChinaMap from "@/components/Charts/ChinaMap";
import Bar from "@/components/Charts/Bar";
import ScrollNumbers from "@/components/ScrollNumbers";
import { genOverviewMap, genOverviewBar } from "@/utils/genMapData";

import styles from "./index.scss";

@connect(({ map }) => ({ map }))
export default class index extends PureComponent {
  render() {
    const { map } = this.props;
    const { mapData, message } = map;
    const chinaMapData = genOverviewMap(mapData, message);
    const { sum, ...mapBarData } = genOverviewBar(mapData);

    return (
      <Fragment>
        {mapData.length > 0 && (
          <Fragment>
            <div className={styles.numBox}>
              <div className={styles.title}>当前累计贷款金额</div>
              <ScrollNumbers
                numbers={sum * 1000}
                style={{ color: "#e8bb3f", fontSize: 50 }}
              />
            </div>
            <ChinaMap
              data={chinaMapData}
              style={{ height: "90%", width: "80%", top: "10%", left: "-5%" }}
            />
            <Bar
              data={mapBarData}
              style={{
                position: "absolute",
                height: "95%",
                top: "5%",
                right: "2%",
                width: "30%"
              }}
            />
          </Fragment>
        )}
      </Fragment>
    );
  }
}

import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import ChinaMap from "../../components/Charts/ChinaMap";
import Bar from "../../components/Charts/Bar";
import ScrollNumbers from "../../components/ScrollNumbers";
import { genOverviewMap, genOverviewBar } from "../../utils/genMapData";

import styles from "./index.scss";



@connect(({ map }) => ({ map }))
export default class index extends PureComponent {
  render() {
    const { map: {mapData, message} } = this.props;
    const chinaMapData = genOverviewMap(mapData, message);
    const { sum, ...mapBarData } = genOverviewBar(mapData);
    // debugger

    return (
      <Fragment>
        {mapData.length > 0 && (
          <>
            <div className={styles.numBox}>
              <div className={styles.title}>当前累计贷款金额</div>
              <ScrollNumbers numbers={sum * 1000} style={{ color: "#e8bb3f", fontSize: 50 }}/>
            </div>
            <ChinaMap data={chinaMapData} style={{ height: "90%", width: "80%", top: "10%", left: "-5%" }}/>
            <Bar data={mapBarData} style={{position: "absolute", height: "95%", top: "5%", right: "2%", width: "30%"}}/>
          </>
        )}
      </Fragment>
    );
  }
}

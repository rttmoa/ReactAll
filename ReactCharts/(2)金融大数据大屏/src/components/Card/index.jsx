import React, { memo } from 'react'
import styles from './index.scss'
/*青岛研锦网络科技有限公司  版权所有*/

// 本资源来源于云码资源淘宝店铺
// 访问地址：https://shop188702750.taobao.com
// 更多超优质资源欢迎访问
const Card = memo(props => {
  const { titleClass, legends, contentClass, title, children } = props;
  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <div className={`${styles.title} ${titleClass}`}>{title}</div>
        {legends || null}
      </div>
      <div className={`${styles.content} ${contentClass}`}>{children}</div>
    </div>
  );
});

export default Card;

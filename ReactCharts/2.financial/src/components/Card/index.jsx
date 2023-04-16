import React, { memo } from 'react'
import styles from './index.scss'







const Card = memo(props => {
  const { titleClass, legends, contentClass, title, children } = props;
  return (
    <div className={styles.card}>
      {/* 渲染标题行 */}
      <div className={styles.head}>
        <div className={`${styles.title} ${titleClass}`}>{title}</div>
        {legends || null}
      </div>
      {/* 渲染Card内部的children */}
      <div className={`${styles.content} ${contentClass}`}>{children}</div>
    </div>
  );
});

export default Card;

import React, { memo } from 'react';
/*青岛研锦网络科技有限公司  版权所有*/

// 本资源来源于云码资源淘宝店铺
// 访问地址：https://shop188702750.taobao.com
// 更多超优质资源欢迎访问
const styles = {
  root: {
    height: '30px',
    lineHeight: '30px',
  },
  label: {
    marginRight: '20px',
    fontSize: '10px',
    color: '#666',
  },
  circle: {
    display: 'inline-block',
    width: '12px',
    height: '12px',
    borderRadius: '6px',
    marginRight: '5px',
    position: 'relative',
    top: '2px',
  },
  line: {
    display: 'inline-block',
    width: '16px',
    height: 0,
    marginRight: '5px',
    borderBottom: 'none',
    verticalAlign: 'middle',
  },
};

const Labels = memo(props => {
  const { data, style } = props;
  return (
    <div style={{ ...styles.root, ...style }}>
      {data.map(t => {
        return (
          <span key={t.key} style={styles.label}>
            <i
              style={{ backgroundColor: t.backgroundColor, border: t.border, ...styles[t.type] }}
            />
            {t.label}
          </span>
        );
      })}
    </div>
  );
});

export default Labels;

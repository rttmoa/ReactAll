import { Row, Col } from 'antd';
import { SwapOutlined } from '@ant-design/icons';
import styles from './index.less';

const Select = (props: any) => {
  return (
    <div className={styles.select}>
      <div className={styles.inp}>
        {props.icon && (
          <div className={styles.tokenIcon}>
            <img src={props.icon} />
          </div>
        )}

        <div className={styles.tokenName}>{props.name}</div>
        <svg
          className={styles.icon}
          focusable="false"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
        </svg>
      </div>
    </div>
  );
};

const KpInputSection = (props: any) => {
  const {
    name,
    price,
    number,
    placeholder,
    inputVal,
    setInputVal,
    onSelectToken,
    onChangeFutureVal,
    ...rest
  } = props;

  const onChangeInput = (e) => {
    setInputVal(e.target.value);
    if (onChangeFutureVal) {
      onChangeFutureVal(e.target.value);
    }
  };

  return (
    <div className={styles.kb} {...rest}>
      <div>
        <div className={styles.areaInput}>
          <input
            placeholder={placeholder}
            value={inputVal}
            onChange={onChangeInput}
          />
        </div>
        <div className={styles.price}>$0.0</div>
      </div>

      <div className={styles.kpselect} {...rest}>
        <div
          className={`${styles.root} ${styles.left}`}
          onClick={() => {
            onSelectToken();
          }}
        >
          <Select name={props.name || 'Select'} icon={props.icon} />
        </div>
      </div>
    </div>
  );
};
export default KpInputSection;

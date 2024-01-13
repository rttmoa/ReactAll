import styles from './index.less';

const KpTotal = (props: any) => {
  const { icon, name, price, number, ...rest } = props;
  return (
    <div className={styles.kt} {...rest}>
      <div className={styles.wrap}>
        <div className={styles.tokenCol}>
          <span className={styles.name}>
            {number}&nbsp;<span>{name}</span>
          </span>
          <br />
          <label className={styles.price}>{price}</label>
        </div>
      </div>
    </div>
  );
};
export default KpTotal;

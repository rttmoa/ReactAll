import styles from './index.less';

const KpToken = (props: any) => {
  const { icon, name, price, pool, lev, ...rest } = props;
  return (
    <div className={styles.kt} {...rest}>
      <div className={styles.wrap}>
        {(pool && (
          <>
            {' '}
            <div className={styles.tokenCol}>
              <span className={styles.name}>{name}</span>
              <br />
              <label className={styles.price}>{price}</label>
            </div>
          </>
        )) || (
          <>
            {' '}
            <img src={icon} />
            <div className={styles.tokenCol}>
              <span className={styles.name}>{name}</span>
              <br />
              <label className={styles.price}>{price}</label>
            </div>
          </>
        )}
        {/* lev */}
        {lev && <div className={styles.lev}>{lev}</div>}
      </div>
    </div>
  );
};
export default KpToken;

import { Table } from 'antd';
import styles from './index.less';
const KpChildTable = (props: any) => {
  const { ...rest } = props;
  return (
    <div className={styles.kpct}>
      <Table {...rest} />
    </div>
  );
};
export default KpChildTable;

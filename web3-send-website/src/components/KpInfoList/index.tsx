import { Row, Col } from 'antd';
import styles from './index.less';

const KpTotal = (props: any) => {
  const { dataSource, ...rest } = props;
  return (
    <div className={styles.ki} {...rest}>
      <Row>
        {dataSource &&
          dataSource.map((item) => (
            <Col span={24}>
              <Row justify="space-between">
                <Col className={styles.small}>{item[0]}</Col>
                <Col>{item[1]}</Col>
              </Row>
            </Col>
          ))}
      </Row>
    </div>
  );
};
export default KpTotal;

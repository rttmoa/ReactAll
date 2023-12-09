import { Line } from '@ant-design/plots';
import { useEffect, useState } from 'react';
import { get } from "@/utils/http";
import dayjs from 'dayjs';
const TokenLine = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = async () => {
    const result = await get('/api/tokenBalanceHistory');

    setData(result.data.reverse().map(item => {
      return {
        category: item.chainName + '-' + item.tokenName,
        value:item.balance,
        year: dayjs(item.cratetime).format('YYYY-MM-DD HH:mm:00')
      };
    }));
  };
  const config = {
    data,
    xField: 'year',
    yField: 'value',
    seriesField: 'category',
    // xAxis: {
    //   type: 'time',
    // },
    // yAxis: {
    //   label: {
    //     // 数值格式化为千分位
    //     formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
    //   },
    // },
    yAxis: {
      grid: {
        line: {
          style: {
            stroke: 'rgba(255,255,255,0.1)',
          }
        }
      }
    }
  };

  return <Line {...config} />;
};
export default TokenLine;
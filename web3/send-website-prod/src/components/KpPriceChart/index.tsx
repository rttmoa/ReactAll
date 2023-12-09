import { useEffect, useRef, useState } from 'react';
import Binance from 'binance-api-node';
import { createChart, CrosshairMode } from 'lightweight-charts';
import { Radio } from 'antd';
import axios from 'axios';
import styled from 'styled-components';
const client = Binance();
const BinancePriceApi = 'https://api.acy.finance/polygon-test';
const StyledSelect = styled(Radio.Group)`
  .ant-radio-button-wrapper {
    background: transparent !important;
    height: 22px;
    font-size: 0.7rem;
    padding: 0 0.1rem;
    border: 0.75px solid #333333;
    border-radius: 0 0 0 0;
    line-height: 22px;
    color: #b5b5b6;
  }
  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
    color: #ffffff;
    box-shadow: 0 0 0 0 black;
    border-color: #333333;
    background-color: #29292c !important;
  }
  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):hover {
    color: #ffffff;
    background-color: #29292c !important;
  }
  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled)::before {
    background-color: #black !important;
  }
  .ant-radio-button-wrapper:not(:first-child)::before {
    background-color: transparent;
  }
`;
export default function KpPriceChart(props) {
  const [pairName, setPairName] = useState('BTC/USDT');
  const [latestPrice, setLatestPrice] = useState(0);
  const [candleData1, setCandleData1] = useState();
  const [candleData2, setCandleData2] = useState();

  useEffect(() => {
    if (props.longToken && props.shortToken) {
      setPairName(`${props.longToken}/${props.shortToken}`);
    }
  }, [props.longToken, props.shortToken]);

  useEffect(() => {
    if (props.token) setPairName(`${props.token}/USDT`);
  }, [props.token]);

  // chart creation
  // full example (without realtime data): https://codesandbox.io/s/9inkb?file=/src/index.js
  const chart = useRef();
  const chartContainerRef = useRef();
  const candleSeries = useRef();

  useEffect(() => {
    if (chart.current) return;

    chart.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        textColor: '#ccc',
        fontFamily: 'Karla 300',
      },
      grid: {
        vertLines: {
          visible: true,
          // color: "rgba(27, 27, 27, 1)",
          color: '#1b1b1b',
          style: 0,
        },
        horzLines: {
          visible: true,
          // color: "rgba(35, 38, 59, 1)",
          color: '#1b1b1b',
          style: 2,
        },
      },
      // https://github.com/tradingview/lightweight-charts/blob/master/docs/time-scale.md#time-scale
      timeScale: {
        rightOffset: 5,
        borderVisible: false,
        barSpacing: 5,
        timeVisible: true,
        fixLeftEdge: true,
      },
      // https://github.com/tradingview/lightweight-charts/blob/master/docs/customization.md#price-axis
      priceScale: {
        borderVisible: false,
      },
      crosshair: {
        horzLine: {
          color: '#aaa',
        },
        vertLine: {
          color: '#aaa',
        },
        mode: 0,
      },
    });

    console.log(chart.current);

    candleSeries.current = chart.current.addCandlestickSeries({
      lineColor: '#5472cc',
      topColor: 'rgba(49, 69, 131, 0.4)',
      bottomColor: 'rgba(42, 64, 103, 0.0)',
      lineWidth: 2,
      priceLineColor: '#3a3e5e',
      downColor: '#fa3c58',
      wickDownColor: '#fa3c58',
      upColor: '#0ecc83',
      wickUpColor: '#0ecc83',
      borderVisible: false,
    });
  }, []);

  useEffect(() => {
    console.log('debug chart: currentChart ', chart);
    if (!chart.current) {
      return;
    }

    const resizeChart = () => {
      chart.current.resize(
        chartContainerRef.current.offsetWidth,
        chartContainerRef.current.offsetHeight,
      );
      console.log(
        'debug chart: resize ',
        chartContainerRef.current.offsetHeight,
        chartContainerRef.current.offsetWidth,
      );
    };
    resizeChart();
    window.addEventListener('resize', resizeChart);
    return () => window.removeEventListener('resize', resizeChart);
  }, [chart]);

  const formatOHLC = (datas) => {
    console.log('formatohlc ', datas);
    if (!Array.isArray(datas)) datas = [datas];
    return datas.map((data) => ({
      time: data.openTime || data.startTime,
      open: data.open,
      high: data.high,
      low: data.low,
      close: data.close,
    }));
  };

  // binance data subscription
  // cleaner is a function to unsubscribe a previous subscription

  useEffect(() => {
    if (!candleData1 || !candleData2) return;
    if (candleData1.startTime == candleData2.startTime) {
      const candleData = {
        time: candleData1.startTime,
        open: candleData1.open / candleData2.open,
        high: candleData1.high / candleData2.high,
        low: candleData1.low / candleData2.low,
        close: candleData1.close / candleData2.close,
      };
      console.log('update candleData', candleData1, candleData2);
      candleSeries.current.update(candleData);
      setLatestPrice(candleData1.close / candleData2.close);
    }
  }, [candleData1, candleData2]);

  const cleaner = useRef();
  useEffect(() => {
    if (cleaner.current) {
      // unsubscribe from previous subscription
      console.log('cleaned previous subscriber: ', cleaner.current);
      cleaner.current();
      // clear chart candles
      candleSeries.current.setData([]);
    }

    if (props.mode && props.mode == 'hedge' && props.shortToken != 'USDT') {
      const clean = client.ws.candles(`${props.longToken}USDT`, '1m', (res) => {
        setCandleData1(res);
      });
      client.ws.candles(`${props.shortToken}USDT`, '1m', (res) => {
        setCandleData2(res);
      });
      cleaner.current = clean;
    } else {
      // subscribe to websocket for the future price update
      const clean = client.ws.candles(
        pairName.replace('/', ''),
        '1m',
        (res) => {
          const candleData = {
            time: res.startTime,
            open: res.open,
            high: res.high,
            low: res.low,
            close: res.close,
          };
          candleSeries.current.update(candleData);
          setLatestPrice(res.close);
        },
      );
      cleaner.current = clean;
    }

    const fetchPrevAndSubscribe = async () => {
      // before subscribe to websocket, should prefill the chart with existing history, this can be fetched with normal REST request
      // SHOULD DO THIS BEFORE SUBSCRIBE, HOWEVER MOVING SUBSCRIBE TO AFTER THIS BLOCK OF CODE WILL CAUSE THE SUBSCRIPTION GOES ON FOREVER
      // REACT BUG?
      if (props.mode && props.mode == 'hedge' && props.shortToken != 'USDT') {
        const prevData1 = await axios
          .get(
            `${BinancePriceApi}/api/cexPrices/binanceHistoricalPrice?symbol=${props.longToken}USDT&interval=1m`,
          )
          .then((res) => res.data);
        const prevData2 = await axios
          .get(
            `${BinancePriceApi}/api/cexPrices/binanceHistoricalPrice?symbol=${props.shortToken}USDT&interval=1m`,
          )
          .then((res) => res.data);
        let prevData = [];
        for (let i = 0; i < prevData1.length; i++) {
          prevData.push({
            time: prevData1[i].time,
            open: prevData1[i].open / prevData2[i].open,
            high: prevData1[i].high / prevData2[i].high,
            low: prevData1[i].low / prevData2[i].low,
            close: prevData1[i].close / prevData2[i].close,
          });
        }
        candleSeries.current.setData(prevData);
      } else {
        const now = Date.now();
        let prevData = await client.candles({
          symbol: pairName.replace('/', ''),
          interval: '1m',
          limit: 1000,
          endTime: now,
        });
        prevData = formatOHLC(prevData);
        candleSeries.current.setData(prevData);
      }
    };

    fetchPrevAndSubscribe();
  }, [pairName]);

  return (
    <div className="App">
      {/* <div>{pairName.substring(0, pairName.length - 4)}/USDT</div> */}
      <div>{pairName}</div>
      <h2>{Number.parseFloat(latestPrice).toFixed(3)}</h2>
      <div>
        <div className="timeSelector" style={{ float: 'left' }}>
          {/* <div className="ExchangeChart-info-label">24h Change</div> */}
          <StyledSelect value="1m" style={{ width: '200%', height: '23px' }}>
            <Radio.Button
              value="1m"
              style={{ width: '9%', textAlign: 'center' }}
            >
              1m
            </Radio.Button>
            <Radio.Button
              value="5m"
              style={{ width: '9%', textAlign: 'center' }}
            >
              5m
            </Radio.Button>
            <Radio.Button
              value="15m"
              style={{ width: '9%', textAlign: 'center' }}
            >
              15m
            </Radio.Button>
            <Radio.Button
              value="30m"
              style={{ width: '9%', textAlign: 'center' }}
            >
              30m
            </Radio.Button>
            <Radio.Button
              value="1h"
              style={{ width: '9%', textAlign: 'center' }}
            >
              1h
            </Radio.Button>
            <Radio.Button
              value="2h"
              style={{ width: '9%', textAlign: 'center' }}
            >
              2h
            </Radio.Button>
            <Radio.Button
              value="4h"
              style={{ width: '9%', textAlign: 'center' }}
            >
              4h
            </Radio.Button>
            <Radio.Button
              value="1d"
              style={{ width: '9%', textAlign: 'center' }}
            >
              1D
            </Radio.Button>
            <Radio.Button
              value="1w"
              style={{ width: '9%', textAlign: 'center' }}
            >
              1W
            </Radio.Button>
          </StyledSelect>
        </div>
      </div>
      <div
        ref={chartContainerRef}
        style={{ width: '100%', height: '500px', border: '.75px solid #444' }}
      />
    </div>
  );
}

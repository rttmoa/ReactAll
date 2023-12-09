import Binance from 'binance-api-node';
import axios from 'axios';
import { useState, useEffect } from 'react';

const BinanceApi = 'https://api.binance.com';

const pairName = ['ETHUSDT', 'USDCUSDT', 'MATICUSDT'];

const urlETH = `${BinanceApi}/api/v3/ticker/24hr?symbol=ETHUSDT`;
const urlUSDC = `${BinanceApi}/api/v3/ticker/24hr?symbol=USDCUSDT`;
const urlMATIC = `${BinanceApi}/api/v3/ticker/24hr?symbol=MATICUSDT`;

let ETHPrice = axios.get(urlETH);
let USDCPrice = axios.get(urlUSDC);
let MATICPrice = axios.get(urlMATIC);

const usePriceFeed = () => {
  const [latestPrices, setLatestPrices] = useState({});

  const fetchPrice = async () => {
    let priceDict = {};

    await axios
      .all([ETHPrice, USDCPrice, MATICPrice])
      .then(
        axios.spread((...responses) => {
          priceDict['ETH'] = responses[0].data.lastPrice;
          priceDict['USDC'] = responses[1].data.lastPrice;
          priceDict['MATIC'] = responses[2].data.lastPrice;
        }),
      )
      .catch((e) => console.log('covalent error: ', e));

    setLatestPrices(priceDict);
    setTimeout(fetchPrice, 1000 * 60);
  };

  useEffect(() => {
    fetchPrice();
  }, []);

  return latestPrices;
};

export default usePriceFeed;

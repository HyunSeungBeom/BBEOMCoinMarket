import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getMultipleSymbolsFullSortedData } from "service/api";
import { CoinData, Coin, CoinList } from "type/coin";

function MainPage() {
  const [coinList, setCoinList] = useState([] as CoinData[]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMultipleSymbolsFullSortedData();
      console.log(data);
      setCoinList(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>BBEOM Coin Market</h1>
      {coinList.map((coin, index) => {
        return (
          <div key={index}>
            <p>{coin.FROMSYMBOL}</p>
            <p>{coin.PRICE}</p>
          </div>
        );
      })}
    </div>
  );
}

export default MainPage;

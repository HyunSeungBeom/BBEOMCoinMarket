import { useEffect, useState } from "react";
import { getMultipleSymbolsFullSortedData } from "service/api";
import { CoinData } from "type/coin";

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
      <div className="w-full top-0 bg-purple-600 text-white p-4">
        <div>
          <h1 className="text-4xl"> Coin Market</h1>
        </div>
      </div>
      <div className="flex justify-between border p-2">
        <h2>심볼</h2>
        <h2>가격</h2>
      </div>
      {coinList.map((coin, index) => {
        return (
          <div key={index} className="flex justify-between border p-2">
            <p>{coin.FROMSYMBOL}</p>
            <p>{coin.PRICE}</p>
          </div>
        );
      })}
    </div>
  );
}

export default MainPage;

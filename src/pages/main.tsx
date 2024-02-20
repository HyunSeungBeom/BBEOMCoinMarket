import { useEffect, useState } from "react";
import { getMultipleSymbolsFullSortedData } from "service/api";
import { CoinData } from "type/coin";

function MainPage() {
  const [coinList, setCoinList] = useState([] as CoinData[]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMultipleSymbolsFullSortedData();
      setCoinList(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <BuildHeader />
      <BuildTableTitle />
      <BuildTable coinList={coinList} />
    </div>
  );
}

const BuildHeader: React.FC = () => {
  return (
    <div className="w-full top-0 bg-purple-600 text-white p-4 mb-4">
      <div>
        <h1 className="text-4xl">Coin Market</h1>
      </div>
    </div>
  );
};

const BuildTableTitle: React.FC = () => {
  return (
    <div className="flex justify-between border p-2">
      <h2>코인</h2>
      <h2>현재가</h2>
      <h2>전일대비</h2>
      <h2>거래대금</h2>
    </div>
  );
};

const BuildTable: React.FC<{ coinList: CoinData[] }> = ({ coinList }) => {
  return (
    <div>
      {coinList.map((coin, index) => (
        <div key={index} className="flex justify-between border p-2">
          <p>{coin.FROMSYMBOL}</p>
          <p>{refineCurrentPrice(coin.PRICE)}</p>
          <p>{refineChangePCT(coin.CHANGEPCT24HOUR)}</p>
          <p>
            {refineVolume(coin.VOLUME24HOURTO)}
            <span className="text-gray-500 text-sm"> 백만</span>
          </p>
        </div>
      ))}
    </div>
  );
};

const refineCurrentPrice = (price: number) => {
  if (price > 1000) {
    return price.toLocaleString(undefined, { maximumFractionDigits: 0 });
  }

  if (price > 100) {
    return price.toFixed(1);
  }

  if (price > 10) {
    return price.toFixed(2);
  }

  if (price > 0.1) {
    return price.toFixed(3);
  }

  return price.toFixed(6);
};

const refineChangePCT = (price: number) => {
  const priceColor = price > 0 ? "text-red-500" : "text-blue-500";

  if (price > 0) {
    return <span className={priceColor}>{`+${price.toFixed(2)}%`}</span>;
  }

  return <span className={priceColor}>{`${price.toFixed(2)}%`}</span>;
};

const refineVolume = (volume: number) => {
  const millionValue = volume / 1000000;
  const data = millionValue.toLocaleString(undefined, {
    maximumFractionDigits: 0,
  });

  return data;
};

export default MainPage;

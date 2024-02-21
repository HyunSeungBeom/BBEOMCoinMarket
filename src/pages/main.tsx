import { ChangeEvent, useEffect, useState } from "react";
import { getMultipleSymbolsFullSortedData } from "service/api";
import { CoinData } from "type/coin";

function MainPage() {
  const [coinList, setCoinList] = useState<CoinData[]>([]);
  const [filteredCoinList, setFilteredCoinList] = useState<CoinData[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMultipleSymbolsFullSortedData();
      setCoinList(data);
      setFilteredCoinList(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = coinList.filter((coin) => {
      return coin.FROMSYMBOL.toLowerCase().includes(searchInput.toLowerCase());
    });

    setFilteredCoinList(filtered);
  }, [searchInput]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  return (
    <>
      <BuildHeader />
      <div className="flex">
        <div className="w-[450px] m-4">
          <BuildSearch value={searchInput} onChange={handleSearchChange} />
          <BuildTableTitle />
          <BuildTable coinList={filteredCoinList} />
        </div>
      </div>
    </>
  );
}

const BuildHeader: React.FC = () => {
  return (
    <div className="w-full top-0 bg-purple-600 text-white p-4 ">
      <div>
        <h1 className="text-4xl">Coin Market</h1>
      </div>
    </div>
  );
};

const BuildSearch: React.FC<{
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}> = ({ value, onChange }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="코인심볼 검색"
        className="w-full border p-2"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

const BuildTableTitle: React.FC = () => {
  return (
    <div className="grid grid-cols-4 border p-2">
      <h2 className="justify-self-start">코인</h2>
      <h2 className="justify-self-center">현재가</h2>
      <h2 className="justify-self-center">전일대비</h2>
      <h2 className="justify-self-end">거래대금</h2>
    </div>
  );
};

const BuildTable: React.FC<{ coinList: CoinData[] }> = ({ coinList }) => {
  return (
    <div>
      {coinList.map((coin, index) => (
        <RenderPriceChange key={index} coin={coin} />
      ))}
    </div>
  );
};

const refineCurrentPrice = (price: number) => {
  if (price > 1000)
    return price.toLocaleString(undefined, { maximumFractionDigits: 0 });
  if (price > 100) return price.toFixed(1);
  if (price > 10) return price.toFixed(2);
  if (price > 0.1) return price.toFixed(3);
  return price.toFixed(6);
};

const refineChangePCT = (price: number) => {
  const priceColor = price > 0 ? "text-red-500" : "text-blue-500";

  if (price > 0)
    return <span className={priceColor}>{`+${price.toFixed(2)}%`}</span>;
  if (price < 0)
    return <span className={priceColor}>{`${price.toFixed(2)}%`}</span>;
  return <span>{`${price.toFixed(2)}%`}</span>;
};

const refineVolume = (volume: number) => {
  const millionValue = volume / 1000000;
  return millionValue.toLocaleString(undefined, {
    maximumFractionDigits: 0,
  });
};

const RenderPriceChange: React.FC<{ coin: CoinData }> = ({ coin }) => {
  const [price, setPrice] = useState(coin.PRICE);

  useEffect(() => {
    setPrice(coin.PRICE);
  }, [coin.PRICE]);

  return (
    <div className="grid grid-cols-4 border p-2">
      <p className="justify-self-start">{coin.FROMSYMBOL}</p>
      <p className="justify-self-end mr-5">{refineCurrentPrice(price)}</p>
      <p className="justify-self-end mr-5">
        {refineChangePCT(coin.CHANGEPCT24HOUR)}
      </p>
      <p className="justify-self-end">
        {refineVolume(coin.VOLUME24HOURTO)}
        <span className="text-gray-500 text-sm"> 백만</span>
      </p>
    </div>
  );
};

export default MainPage;

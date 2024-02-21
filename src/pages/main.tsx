import { ChangeEvent, useEffect, useState } from "react";
import { getMultipleSymbolsFullSortedData } from "service/api";
import { CoinData } from "type/coin";

function MainPage() {
  const [coinList, setCoinList] = useState<CoinData[]>([]);
  const [filteredCoinList, setFilteredCoinList] = useState<CoinData[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedCoin, setSelectedCoin] = useState<CoinData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMultipleSymbolsFullSortedData();
      setCoinList(data);
      setFilteredCoinList(data);

      console.log(data);
    };
    fetchData();

    const intervalId = setInterval(fetchData, 10000);

    return () => {
      clearInterval(intervalId);
    };
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

  const hanldeCoinClick = (coin: CoinData) => {
    setSelectedCoin(coin);
  };

  return (
    <>
      <BuildHeader />
      <div className="flex">
        <div className="w-[450px] m-4">
          <BuildSearch value={searchInput} onChange={handleSearchChange} />
          <BuildTableTitle />
          <BuildTable
            coinList={filteredCoinList}
            handleCoinClick={hanldeCoinClick}
          />
        </div>

        {selectedCoin && (
          <div className="flex-grow m-4">
            <BuildCoinGraphBox coin={selectedCoin} />
          </div>
        )}
      </div>
    </>
  );
}

const BuildHeader: React.FC = () => {
  return (
    <div className="w-full top-0 bg-purple-600 text-white p-4">
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

const BuildTable: React.FC<{
  coinList: CoinData[];
  handleCoinClick(coin: CoinData): void;
}> = ({ coinList, handleCoinClick }) => {
  return (
    <div>
      {coinList.map((coin, index) => (
        <div
          key={index}
          className={"grid grid-cols-4 border p-2"}
          onClick={() => handleCoinClick(coin)}
        >
          <p className="justify-self-start">{coin.FROMSYMBOL}</p>
          <p className="justify-self-end mr-5">
            {refineCurrentPrice(coin.PRICE)}
          </p>
          <p className="justify-self-end mr-5">
            {refineChangePCT(coin.CHANGEPCTDAY)}
          </p>
          <p className="justify-self-end">
            {refineVolume(coin.VOLUME24HOURTO)}
            <span className="text-gray-500 text-sm"> 백만</span>
          </p>
        </div>
      ))}
    </div>
  );
};

const BuildCoinGraphBox: React.FC<{ coin: CoinData }> = ({ coin }) => {
  return (
    <div>
      <BuildCoinGraphTopTitle coin={coin} />
      <BuildCoinGraphTopPrice coin={coin} />
      <BuildCoinGraph coin={coin} />
    </div>
  );
};

const BuildCoinGraphTopTitle: React.FC<{ coin: CoinData }> = ({ coin }) => {
  return (
    <div className="flex items-center">
      <img
        src={`https://cryptocompare.com${coin.IMAGEURL}`}
        style={{ width: "60px", height: "60px" }}
      />
      <h2 className="text-4xl ">{coin.FROMSYMBOL}</h2>
    </div>
  );
};

const BuildCoinGraphTopPrice: React.FC<{ coin: CoinData }> = ({ coin }) => {
  return (
    <div>
      <div className="flex items-center">
        <h2 className="text-3xl">
          <span className="font-bold">{refineCurrentPrice(coin.PRICE)}</span>
          <span className="text-2xl text-gray-500"> KRW </span>
        </h2>
      </div>
      <div className="flex items-center">
        <h3 className="mr-5">{refineChangePCT(coin.CHANGEPCTDAY)}</h3>

        <h3>{refineChangeDayValue(coin.CHANGEDAY)}</h3>
      </div>
    </div>
  );
};

const BuildCoinGraph: React.FC<{ coin: CoinData }> = ({ coin }) => {
  return <div></div>;
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

const refineChangeDayValue = (price: number) => {
  const priceColor = price > 0 ? "text-red-500" : "text-blue-500";

  if (price > 0)
    return <span className={priceColor}>{`+${price.toFixed(2)}`}</span>;
  if (price < 0)
    return <span className={priceColor}>{`${price.toFixed(2)}`}</span>;
  return <span>{`${price.toFixed(2)}`}</span>;
};

const refineVolume = (volume: number) => {
  const millionValue = volume / 1000000;
  return millionValue.toLocaleString(undefined, {
    maximumFractionDigits: 0,
  });
};

export default MainPage;

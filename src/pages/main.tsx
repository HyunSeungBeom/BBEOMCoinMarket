import { ChangeEvent, useEffect, useState } from "react";
import {
  getMultipleSymbolsFullSortedData,
  getOrderBookL2Snapshot,
  getPairOHLCV,
} from "service/Api";
import { CoinData } from "type/Coin";
import { graphData } from "type/Graph";
import ReactApexChart from "react-apexcharts";
import { SmallButton } from "components/SmallButton";
import { LineWave } from "react-loader-spinner";
import { OrderBookMock } from "service/OrderBookMock";

function MainPage() {
  const [coinList, setCoinList] = useState<CoinData[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedCoin, setSelectedCoin] = useState<CoinData | null>(null);
  const [graphData, setGraphData] = useState<graphData[]>([]);
  const [lastUpdateTime, setLastUpdateTime] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMultipleSymbolsFullSortedData();
      const test = await getOrderBookL2Snapshot("BTC");
      console.log(test);
      if (selectedCoin == null) {
        const graph = await getPairOHLCV("histoday", data[0].FROMSYMBOL);
        setSelectedCoin(data[0]);
        setGraphData(graph);
      } else {
        const graph = await getPairOHLCV("histoday", selectedCoin.FROMSYMBOL);
        setSelectedCoin(selectedCoin);
        setGraphData(graph);
      }
      setCoinList(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const currentTime = new Date().getTime();
      const data = await getMultipleSymbolsFullSortedData();

      if (selectedCoin !== null) {
        if (currentTime - lastUpdateTime > 10000) {
          const fetchSelectedCoin = data.find(
            (coin) => coin.FROMSYMBOL === selectedCoin.FROMSYMBOL
          );
          setSelectedCoin(fetchSelectedCoin!);
          setLastUpdateTime(currentTime);
        }
      }

      const filtered = data.filter((coin) => {
        return coin.FROMSYMBOL.toLowerCase().includes(
          searchInput.toLowerCase()
        );
      });

      setCoinList(filtered);
    };
    fetchData();

    const intervalId = setInterval(fetchData, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, [searchInput, selectedCoin, lastUpdateTime]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const hanldeCoinClick = (coin: CoinData) => {
    const fetchData = async () => {
      const data = await getPairOHLCV("histoday", coin.FROMSYMBOL);
      setSelectedCoin(coin);
      setGraphData(data);
    };

    fetchData();
  };

  const showGraphData = (time: string, symbol: string) => {
    const fetchData = async () => {
      const data = await getPairOHLCV(time, symbol);
      setGraphData(data);
    };
    fetchData();
  };

  return (
    <>
      <div className="flex justify-center bg-gray-100">
        <div className="w-[450px] m-4 flex-shrink-0">
          <BuildSearch value={searchInput} onChange={handleSearchChange} />
          <BuildTableTitle />
          <BuildTable coinList={coinList} handleCoinClick={hanldeCoinClick} />
        </div>

        {selectedCoin && (
          <div className="bg-white my-4">
            <div className="w-[900px] my-4 mx-5 flex-shrink-0 ">
              <BuildDetail
                coin={selectedCoin}
                graphData={graphData}
                showGraphData={showGraphData}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const BuildEmpty: React.FC = () => {
  return (
    <div
      className="flex items-center justify-center flex-col"
      style={{ height: "calc(100vh - 80px)" }}
    >
      <LineWave
        visible={true}
        height="200"
        width="200"
        color="#805AD5"
        ariaLabel="line-wave-loading"
        wrapperStyle={{}}
        wrapperClass=""
        firstLineColor=""
        middleLineColor=""
        lastLineColor=""
      />
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
    <div className="grid grid-cols-4 border p-2 bg-white">
      <h2 className="justify-self-start">코인</h2>
      <h2 className="justify-self-center">현재가</h2>
      <h2 className="justify-self-center">전일대비</h2>
      <h2 className="justify-self-end mr-5">거래대금</h2>
    </div>
  );
};

const BuildTable: React.FC<{
  coinList: CoinData[];
  handleCoinClick(coin: CoinData): void;
}> = ({ coinList, handleCoinClick }) => {
  return (
    <div className="overflow-auto max-h-[1400px] bg-white">
      {coinList.map((coin, index) => (
        <div
          key={index}
          className={"grid grid-cols-4 border p-2 hover:bg-gray-100 "}
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
            <span className="text-gray-500 text-sm ml-1">백만</span>
          </p>
        </div>
      ))}
    </div>
  );
};

const BuildDetail: React.FC<{
  coin: CoinData;
  graphData: graphData[];
  showGraphData(time: string, symbol: string): void;
}> = ({ coin, graphData, showGraphData }) => {
  return (
    <div>
      <BuildCoinGraphTopTitle coin={coin} />
      <div className="flex items-center">
        <div className="flex-1">
          <BuildCoinGraphTopPrice coin={coin} />
        </div>
        <div className="flex-1">
          <BuildCoinGraphTopHighLow coin={coin} />
        </div>
        <div className="flex-1">
          <BuildCoinGraphTopValue coin={coin} />
        </div>
      </div>
      <BuildCoinGraphBox
        coin={coin}
        graphData={graphData}
        showGraphData={showGraphData}
      />
      <div>
        <BuildCoinGraphOrderBook coin={coin} />
        <BuildCoinBuySell />
      </div>
    </div>
  );
};

const BuildCoinGraphTopTitle: React.FC<{ coin: CoinData }> = ({ coin }) => {
  return (
    <div className="flex items-center my-4">
      <img
        src={`https://cryptocompare.com${coin.IMAGEURL}`}
        style={{ width: "55px", height: "55px" }}
      />
      <h2 className="text-3xl ml-3">{coin.FROMSYMBOL}</h2>
    </div>
  );
};

const BuildCoinGraphTopPrice: React.FC<{ coin: CoinData }> = ({ coin }) => {
  return (
    <div>
      <div className="flex items-center">
        <h2 className="text-3xl">
          <span className="font-bold">{refineCurrentPrice(coin.PRICE)}</span>
          <span className="text-2xl text-gray-500 ml-2">KRW</span>
        </h2>
      </div>
      <div className="flex items-center">
        <h3 className="mr-2">{refineChangePCT(coin.CHANGEPCTDAY)}</h3>
        {checkPrice(coin.CHANGEDAY)}
        <h3 className="ml-2">{refineChangeDayValue(coin.CHANGEDAY)}</h3>
      </div>
    </div>
  );
};

const BuildCoinGraphTopHighLow: React.FC<{ coin: CoinData }> = ({ coin }) => {
  return (
    <div>
      <div className="flex items-center">
        <h3 className="mr-20">고가</h3>
        <h3 className="text-red-600">{refineCurrentPrice(coin.HIGHDAY)}</h3>
      </div>
      <div className="border-t border-gray-200 my-2"></div>
      <div className="flex items-center">
        <h3 className="mr-20">저가</h3>
        <h3 className="text-blue-600">{refineCurrentPrice(coin.LOWDAY)}</h3>
      </div>
    </div>
  );
};

const BuildCoinGraphTopValue: React.FC<{ coin: CoinData }> = ({ coin }) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="mr-4">거래량(24h)</h3>
        </div>
        <div className="flex items-center">
          <h3>{(coin.VOLUME24HOURTO / coin.PRICE).toLocaleString()}</h3>
          <span className="text-gray-500 text-sm ml-1"> {coin.FROMSYMBOL}</span>
        </div>
      </div>
      <div className="border-t border-gray-200 my-2"></div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="mr-4">거래대금(24H)</h3>
        </div>
        <div className="flex items-center">
          <h3 className="text-sm">
            {coin.VOLUME24HOURTO.toLocaleString()}
            <span className="text-gray-500 text-sm ml-1">KRW</span>{" "}
          </h3>
        </div>
      </div>
    </div>
  );
};

const BuildCoinGraphBox: React.FC<{
  coin: CoinData;
  graphData: graphData[];
  showGraphData(time: string, symbol: string): void;
}> = ({ coin, graphData, showGraphData }) => {
  return (
    <div>
      <BuildCoinGraphButton coin={coin} showGraphData={showGraphData} />
      <BuildCoinGraph graphData={graphData} />
    </div>
  );
};

const BuildCoinGraphButton: React.FC<{
  coin: CoinData;
  showGraphData(time: string, symbol: string): void;
}> = ({ coin, showGraphData }) => {
  return (
    <div className="flex justify-end mt-10 mb-2">
      <SmallButton
        text="1분"
        onClick={() => showGraphData("histominute", coin.FROMSYMBOL)}
        className="mx-1"
      />
      <SmallButton
        text="1시간"
        onClick={() => showGraphData("histohour", coin.FROMSYMBOL)}
        className="mx-1"
      />
      <SmallButton
        text="1일"
        onClick={() => showGraphData("histoday", coin.FROMSYMBOL)}
        className="ml-1"
      />
    </div>
  );
};

const BuildCoinGraph: React.FC<{ graphData: graphData[] }> = ({
  graphData,
}) => {
  const chartSeries = [
    {
      data: graphData.map((data) => ({
        x: data.time * 1000,
        y: [data.open, data.high, data.low, data.close],
      })),
    },
  ];

  const chartOptions = {
    chart: {
      height: 550,
      width: 600,
    },
    xaxis: {
      type: "datetime" as const,
    },
  };

  return (
    <div className="my-1">
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="candlestick"
        height={350}
      />
    </div>
  );
};

const BuildCoinGraphOrderBook: React.FC<{ coin: CoinData }> = ({ coin }) => {
  const [orderBookData, setOrderBookData] = useState<any>();

  useEffect(() => {
    const mockOrderBookData = OrderBookMock(coin);

    setOrderBookData(mockOrderBookData);
  }, [coin]);

  const renderOrderBook = (
    orders: { P: number; Q: number }[],
    type: "bid" | "ask"
  ) => {
    if (type === "bid") {
      return (
        <div className="w-1/2">
          {orders.map((order, index) => (
            <div className={`flex items-center`} key={index}>
              <div className="flex text-sm justify-end items-center w-1/3 border-2 border-white bg-blue-100 h-10">
                <p className="mr-4 "> {order.Q}</p>
              </div>
              <div className="flex items-center justify-center w-1/3 border-2 border-white bg-blue-100 h-10">
                <p className="text-red-500">{refineCurrentPrice(order.P)}</p>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (type == "ask") {
      return (
        <div className="w-1/2">
          {orders.map((order, index) => (
            <div className={`flex items-center justify-end`} key={index}>
              <div className="flex items-center justify-center w-1/3 border-2 border-white bg-red-100 h-10">
                <p className="text-red-500">{refineCurrentPrice(order.P)}</p>
              </div>
              <div className="flex text-sm justify-start items-center w-1/3 border-2 border-white bg-red-100 h-10">
                <p className="ml-4 "> {order.Q}</p>
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div>
      {orderBookData ? (
        <div>
          {renderOrderBook(orderBookData.BID, "bid")}
          {renderOrderBook(orderBookData.ASK, "ask")}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

const BuildCoinBuySell: React.FC = () => {
  return (
    <div>
      <div className="flex justify-end mt-10 mb-2"></div>
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
  const priceColor = price > 0 ? "text-red-600" : "text-blue-600";

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

const checkPrice = (price: number) => {
  if (price < 0) {
    return <span className="text-blue-600">▼</span>;
  } else {
    return <span className="text-red-600">▲</span>;
  }
};

export default MainPage;

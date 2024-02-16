import React, { useEffect, useState } from "react";
import { getCoinsMarket } from "services/api";
import InfiniteScroll from "react-infinite-scroll-component";

interface Coin {
  id: string;
  name: string;
  symbol: string;
}

function MainPage() {
  const [coinList, setCoinList] = useState<Coin[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchCoinList = async () => {
    const newCoinsList = await getCoinsMarket(page);
    setCoinList((prevList) => [...prevList, ...newCoinsList]);
    if (newCoinsList.length === 0) {
      setHasMore(false);
    } else {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    fetchCoinList();
  }, []);

  return (
    <div>
      <h1>Welcome to BBEOM Coin Market!</h1>
      <InfiniteScroll
        dataLength={coinList.length}
        next={fetchCoinList}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        {coinList.map((coin: Coin, index) => (
          <div key={index}>
            <h2>{coin.name}</h2>
            <p>{coin.symbol}</p>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default MainPage;

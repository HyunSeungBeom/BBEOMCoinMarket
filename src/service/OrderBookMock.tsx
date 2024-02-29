import { CoinData } from "type/Coin";

export const OrderBookMock = (coin: CoinData) => {
  if (coin.PRICE > 10000000)
    return {
      BID: [
        { P: coin.PRICE + 10000, Q: 0.001 },
        { P: coin.PRICE + 9000, Q: 0.009 },
        { P: coin.PRICE + 8000, Q: 0.001 },
        { P: coin.PRICE + 7000, Q: 0.009 },
        { P: coin.PRICE + 6000, Q: 0.001 },
        { P: coin.PRICE + 5000, Q: 0.009 },
        { P: coin.PRICE + 4000, Q: 0.001 },
        { P: coin.PRICE + 3000, Q: 0.009 },
        { P: coin.PRICE + 2000, Q: 0.001 },
        { P: coin.PRICE + 1000, Q: 0.009 },
      ],
      ASK: [
        { P: coin.PRICE - 1000, Q: 0.012 },
        { P: coin.PRICE - 2000, Q: 0.001 },
        { P: coin.PRICE - 3000, Q: 0.012 },
        { P: coin.PRICE - 4000, Q: 0.001 },
        { P: coin.PRICE - 5000, Q: 0.012 },
        { P: coin.PRICE - 6000, Q: 0.001 },
        { P: coin.PRICE - 7000, Q: 0.012 },
        { P: coin.PRICE - 8000, Q: 0.001 },
        { P: coin.PRICE - 9000, Q: 0.012 },
        { P: coin.PRICE - 10000, Q: 0.001 },
      ],
    };

  if (coin.PRICE > 1000000) {
    return {
      BID: [
        { P: coin.PRICE + 1000, Q: 0.01 },
        { P: coin.PRICE + 900, Q: 0.09 },
        { P: coin.PRICE + 800, Q: 0.01 },
        { P: coin.PRICE + 700, Q: 0.09 },
        { P: coin.PRICE + 600, Q: 0.01 },
        { P: coin.PRICE + 500, Q: 0.09 },
        { P: coin.PRICE + 400, Q: 0.01 },
        { P: coin.PRICE + 300, Q: 0.09 },
        { P: coin.PRICE + 200, Q: 0.01 },
        { P: coin.PRICE + 100, Q: 0.09 },
      ],
      ASK: [
        { P: coin.PRICE - 100, Q: 0.12 },
        { P: coin.PRICE - 200, Q: 0.01 },
        { P: coin.PRICE - 300, Q: 0.12 },
        { P: coin.PRICE - 400, Q: 0.01 },
        { P: coin.PRICE - 500, Q: 0.12 },
        { P: coin.PRICE - 600, Q: 0.01 },
        { P: coin.PRICE - 700, Q: 0.12 },
        { P: coin.PRICE - 800, Q: 0.01 },
        { P: coin.PRICE - 900, Q: 0.12 },
        { P: coin.PRICE - 1000, Q: 0.01 },
      ],
    };
  }

  if (coin.PRICE < 0.1) {
    return {
      BID: [
        {
          P: coin.PRICE + 0.0001,
          Q: 0.0001,
        },
        {
          P: coin.PRICE + 0.00009,
          Q: 0.0009,
        },
        {
          P: coin.PRICE + 0.00008,
          Q: 0.0001,
        },
        {
          P: coin.PRICE + 0.00007,
          Q: 0.0009,
        },
        {
          P: coin.PRICE + 0.00006,
          Q: 0.0001,
        },
        {
          P: coin.PRICE + 0.00005,
          Q: 0.0009,
        },
        {
          P: coin.PRICE + 0.00004,
          Q: 0.0001,
        },
        {
          P: coin.PRICE + 0.00003,
          Q: 0.0009,
        },
        {
          P: coin.PRICE + 0.00002,
          Q: 0.0001,
        },
        {
          P: coin.PRICE + 0.00001,
          Q: 0.0009,
        },
      ],
      ASK: [
        {
          P: coin.PRICE - 0.00001,
          Q: 0.0012,
        },
        {
          P: coin.PRICE - 0.00002,
          Q: 0.0001,
        },
        {
          P: coin.PRICE - 0.00003,
          Q: 0.0012,
        },
        {
          P: coin.PRICE - 0.00004,
          Q: 0.0001,
        },
        {
          P: coin.PRICE - 0.00005,
          Q: 0.0012,
        },
        {
          P: coin.PRICE - 0.00006,
          Q: 0.0001,
        },
        {
          P: coin.PRICE - 0.00007,
          Q: 0.0012,
        },
        {
          P: coin.PRICE - 0.00008,
          Q: 0.0001,
        },
        {
          P: coin.PRICE - 0.00009,
          Q: 0.0012,
        },
        {
          P: coin.PRICE - 0.0001,
          Q: 0.0001,
        },
      ],
    };
  }

  return {
    BID: [
      { P: coin.PRICE + 10, Q: 1 },
      { P: coin.PRICE + 9, Q: 0.9 },
      { P: coin.PRICE + 8, Q: 2.1 },
      { P: coin.PRICE + 7, Q: 3 },
      { P: coin.PRICE + 6, Q: 6 },
      { P: coin.PRICE + 5, Q: 9 },
      { P: coin.PRICE + 4, Q: 1 },
      { P: coin.PRICE + 3, Q: 2 },
      { P: coin.PRICE + 2, Q: 3 },
      { P: coin.PRICE + 1, Q: 2 },
    ],
    ASK: [
      { P: coin.PRICE - 1, Q: 1 },
      { P: coin.PRICE - 2, Q: 13 },
      { P: coin.PRICE - 3, Q: 12 },
      { P: coin.PRICE - 4, Q: 1 },
      { P: coin.PRICE - 5, Q: 12 },
      { P: coin.PRICE - 6, Q: 1 },
      { P: coin.PRICE - 7, Q: 12 },
      { P: coin.PRICE - 8, Q: 1 },
      { P: coin.PRICE - 9, Q: 12 },
      { P: coin.PRICE - 10, Q: 1 },
    ],
  };
};

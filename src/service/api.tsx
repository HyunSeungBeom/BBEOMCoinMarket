import axios from "axios";
import { whiteCoinSymbol } from "./whiteCoinSymbol";
import { Coin, CoinData } from "type/coin";

const BASE_URL = "https://min-api.cryptocompare.com/data";
const SOCKET_URL = "wss://streamer.cryptocompare.com/v2";
const API_KEY = process.env.REACT_APP_API_KEY;

export const getMultipleSymbolsFullSortedData = async () => {
  const symbols = whiteCoinSymbol
    .map((whiteToken) => whiteToken.replace('"', ""))
    .join(",");
  const url = `${BASE_URL}/pricemultifull?fsyms=${symbols}&tsyms=KRW`;
  const response = await axios.get(url);

  const data: CoinData[] = (Object.values(response.data.RAW) as Coin[])
    .map((coin: Coin) => coin.KRW)
    .sort((a, b) => b.VOLUME24HOURTO - a.VOLUME24HOURTO);

  return data;
};

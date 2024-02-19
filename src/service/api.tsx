import axios from "axios";
import { whiteCoinSymbole } from "./whiteCoinSymbol";
import { CoinList, Coin, CoinData } from "type/coin";
import { SetStateAction } from "react";

const BASE_URL = "https://min-api.cryptocompare.com/data";
const API_KEY = process.env.REACT_APP_API_KEY;

export const getMultipleSymbolsFullSortedData = async () => {
  const symobols = whiteCoinSymbole
    .map((whiteToken) => whiteToken.replace('"', ""))
    .join(",");
  const url = `${BASE_URL}/pricemultifull?fsyms=${symobols}&tsyms=KRW`;
  const response = await axios.get(url);

  const data: CoinData[] = (Object.values(response.data.RAW) as Coin[])
    .map((coin: Coin) => coin.KRW)
    .sort((a, b) => b.VOLUMEHOURTO - a.VOLUMEHOURTO);

  return data;
};

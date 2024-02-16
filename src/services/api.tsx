import axios from "axios";

const BASE_URL = "https://api.coingecko.com/api/v3";
const API_KEY = process.env.REACT_APP_API_KEY;

export const getCoinsList = async () => {
  const url = `${BASE_URL}/coins/list?x_cg_api_key=${API_KEY}`;
  const response = await axios.get(url);
  return response.data;
};

export const getCoinsMarket = async (page: number) => {
  const url = `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=${page}&sparkline=false&locale=en`;
  const response = await axios.get(url);
  return response.data;
};

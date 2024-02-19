export interface CoinData {
  CHANGE24HOUR: number;
  CHANGEDAY: number;
  CHANGEHOUR: number;
  CHANGEPCT24HOUR: number;
  CHANGEPCTDAY: number;
  CHANGEPCTHOUR: number;
  CIRCULATINGSUPPLY: number;
  CIRCULATINGSUPPLYMKTCAP: number;
  CONVERSIONLASTUPDATE: number;
  CONVERSIONSYMBOL: string;
  CONVERSIONTYPE: string;
  FLAGS: string;
  FROMSYMBOL: string;
  HIGH24HOUR: number;
  HIGHDAY: number;
  HIGHHOUR: number;
  IMAGEURL: string;
  LASTMARKET: string;
  LASTTRADEID: string;
  LASTUPDATE: number;
  LASTVOLUME: number;
  LASTVOLUMETO: number;
  LOW24HOUR: number;
  LOWDAY: number;
  LOWHOUR: number;
  MARKET: string;
  MEDIAN: number;
  MKTCAP: number;
  MKTCAPPENALTY: number;
  OPEN24HOUR: number;
  OPENDAY: number;
  OPENHOUR: number;
  PRICE: number;
  SUPPLY: number;
  TOPTIERVOLUME24HOUR: number;
  TOPTIERVOLUME24HOURTO: number;
  TOSYMBOL: string;
  TOTALTOPTIERVOLUME24H: number;
  TOTALTOPTIERVOLUME24HTO: number;
  TOTALVOLUME24H: number;
  TOTALVOLUME24HTO: number;
  TYPE: string;
  VOLUME24HOUR: number;
  VOLUME24HOURTO: number;
  VOLUMEDAY: number;
  VOLUMEDAYTO: number;
  VOLUMEHOUR: number;
  VOLUMEHOURTO: number;
}

export interface Coin {
  KRW: CoinData;
}

export type CoinList = Record<string, Coin>;

export interface orderBookData {
  TYPE: string;
  CCSEQ: number;
  M: string;
  FSYM: string;
  TSYM: string;
  BID: Array<{
    P: number;
    Q: number;
  }>;
  ASK: Array<{
    P: number;
    Q: number;
  }>;
}

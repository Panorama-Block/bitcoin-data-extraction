import axios from "axios";

const BASE_URL = "https://api.mempool.space/api";

export interface Block {
    extras: {
        reward: number;
        coinbaseTx: {
          vin: {
            scriptsig: string;
          }[];
          vout: {
            scriptpubkey_address: string;
            value: number;
          }[];
        };
    };
    coinbaseRaw: string;
    medianFee: number;
    feeRange: number[];
    totalFees: number;
    avgFee: number;
    avgFeeRate: number;
    pool: {
        id: number;
        name: string;
        slug: string;
    };
    matchRate: number;
    id: string;
    height: number;
    version: number;
    timestamp: number;
    bits: number;
    nonce: number;
    difficulty: number;
    merkle_root: string;
    tx_count: number;
    size: number;
    weight: number;
    previousblockhash: string;
}

export interface BlockHeader {
    header: number;
}

export interface BlockTransactions {
    transactions: {
        txid: string;
        version: number;
        locktime: number;
        vin: Object[];
        vout: Object[];
        size: number;
        weight: number;
        fee: number;
        status: {
            confirmed: boolean;
            block_height: number;
            block_hash: string;
            block_time: number;
        };
    }[];
}


export const getBlock = async (hash: string): Promise<Block | false> => {
    try {
      const response = await axios.get(`${BASE_URL}/block/${hash}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching block info:', error);
      return false;
    }
};

export const getBlockHeader = async (hash: string): Promise<Block | false> => {
    try {
      const response = await axios.get(`${BASE_URL}/block/${hash}/header`);
      return response.data;
    } catch (error) {
      console.error('Error fetching block header info:', error);
      return false;
    }
};

export const getBlockTransactions = async (hash: string, start_index: number): Promise<Block | false> => {
    try {
      const response = await axios.get(`${BASE_URL}/block/${hash}/txs?start_index=${start_index}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching block transactions info:', error);
      return false;
    }
};
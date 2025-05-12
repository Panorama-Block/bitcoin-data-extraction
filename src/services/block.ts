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

export interface BlockFees {
  response: {
    avgHeight: number;
    timestamp: number;
    avgFees: number;
  }[];
}

export interface BlockRewards {
  response: {
    avgHeight: number;
    timestamp: number;
    avgRewards: number;
  }[];
}

export interface BlockFeerates {
  response: {
    avgHeight: number;
    timestamp: number;
    avgFee_0: number;
    avgFee_10: number;
    avgFee_25: number;
    avgFee_50: number;
    avgFee_75: number;
    avgFee_100: number;
  }[];
}

export interface BlockSizesWeights {
  response: {
    avgHeight: number;
    timestamp: number;
    avgSize: number;
  }[];
}

export interface BlockPredictions {
  response: [number[]];
}

export interface BlockAuditScore {
  hash: string;
  matchRate: number;
  expectedFees: number;
  expectedWeight: number;
}

export interface BlockAuditScores {
  response: {
    hash: string;
    matchRate: number;
    expectedFees: number;
    expectedWeight: number;
  }[];
}

export interface BlockAuditSummary {
  height: number;
  id: string;
  timestamp: number;
  template: {
    txid: string;
    fee: number;
    vsize: number;
    value: number;
    rate: number;
    flags: number;
  }[];
  missingTxs: string[];
  addedTxs: string[];
  freshTxs: string[];
  sigopTxs: string[];
  fullrbfTxs: string[];
  acceleratedTxs: string[];
  matchRate: number;
  expectedFees: number;
  expectedWeight: number;
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

export const getBlockHeader = async (hash: string): Promise<BlockHeader | false> => {
    try {
      const response = await axios.get(`${BASE_URL}/block/${hash}/header`);
      return response.data;
    } catch (error) {
      console.error('Error fetching block header info:', error);
      return false;
    }
};

export const getBlockTransactions = async (hash: string, start_index: number): Promise<BlockTransactions | false> => {
    try {
      const response = await axios.get(`${BASE_URL}/block/${hash}/txs?start_index=${start_index}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching block transactions info:', error);
      return false;
    }
};

export const getBlockFees = async (timePeriod: string): Promise<BlockFees | false> => {
    try {
      const response = await axios.get(`${BASE_URL}/v1/mining/blocks/fees/${timePeriod}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching block fees info:', error);
      return false;
    }
};

export const getBlockRewards = async (timePeriod: string): Promise<BlockRewards | false> => {
    try {
      const response = await axios.get(`${BASE_URL}/v1/mining/blocks/rewards/${timePeriod}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching block rewards info:', error);
      return false;
    }
};

export const getBlockFeerates = async (timePeriod: string): Promise<BlockFeerates | false> => {
    try {
      const response = await axios.get(`${BASE_URL}/v1/mining/blocks/fee-rates/${timePeriod}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching block feerates info:', error);
      return false;
    }
};

export const getBlockSizesWeights = async (timePeriod: string): Promise<BlockSizesWeights | false> => {
    try {
      const response = await axios.get(`${BASE_URL}/v1/mining/blocks/sizes-weights/${timePeriod}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching block sizes and weights info:', error);
      return false;
    }
};

export const getBlockPredictions = async (timePeriod: string): Promise<BlockPredictions | false> => {
    try {
      const response = await axios.get(`${BASE_URL}/v1/mining/blocks/predictions/${timePeriod}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching block predictions info:', error);
      return false;
    }
}

export const getBlockAuditScore = async (blockHash: string): Promise<BlockAuditScore | false> => {
    try {
      const response = await axios.get(`${BASE_URL}/v1/mining/blocks/audit/score/${blockHash}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching block audit score info:', error);
      return false;
    }
}

export const getBlockAuditScores = async (startHeight: string): Promise<BlockAuditScores | false> => {
    try {
      const response = await axios.get(`${BASE_URL}/v1/mining/blocks/audit/scores/${startHeight}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching block audit scores info:', error);
      return false;
    }
}

export const getBlockAuditSummary = async (blockHash: string): Promise<BlockAuditScore | false> => {
    try {
      const response = await axios.get(`${BASE_URL}/v1/block/${blockHash}/audit-summary`);
      return response.data;
    } catch (error) {
      console.error('Error fetching block audit summary info:', error);
      return false;
    }
}
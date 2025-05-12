import axios from "axios";

const BASE_URL = "https://api.mempool.space/api";

export interface MiningPools {
    pools: {
        poolId: number;
        name: string;
        link: string;
        blockCount: number;
        rank: number;
        emptyBlocks: number;
        slug: string;
    }[];
    blockCount: number;
    lastEstimatedHashrate: number;
}

export interface MiningPool {
    pool: {
        id: number;
        name: string;
        link: string;
        addresses: string[];
        regexes: string[];
        slug: string;
        blockCount: {
            all: number;
            last24h: number;
            last7d: number;
        }
        blockShare: {
            all: number;
            last24h: number;
            last7d: number;
        }
        estimatedHashrate: number;
        reportedHashrate: number;
    }
}

export interface MiningPoolHashrates {
    response: {
        timestamp: number;
        avgHashrate: number;
        share: number;
        poolName: string;
    }[];
}

export interface MiningPoolBlocks {
    response: {
        id: string;
        timestamp: number;
        height: number;
        version: number;
        bits: number;
        nonce: number;
        difficulty: number;
        merkleRoot: string;
        tx_count: number;
        size: number;
        weight: number;
        previousblockhash: string;
        extras: {
            coinbaseRaw: string;
            medianFee: number;
            reward: number;
            totalFees: number;
            pool: {
                id: number;
            }
        }
    }[];
}

export const getMiningPools = async (timePeriod: string): Promise<MiningPools | false> =>  {
  try {
    const response = await axios.get(`${BASE_URL}/v1/mining/pools/${timePeriod}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Mining Pools info:', error);
    return false;
  }
};

export const getMiningPool = async (slug: string): Promise<MiningPool | false> =>  {
  try {
    const response = await axios.get(`${BASE_URL}/v1/mining/pool/${slug}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Mining Pool info:', error);
    return false;
  }
};

export const getMiningPoolHashRates = async (timePeriod: string): Promise<MiningPoolHashrates | false> =>  {
  try {
    const response = await axios.get(`${BASE_URL}/v1/mining/hashrate/pools/${timePeriod}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Mining Pool Hashrates info:', error);
    return false;
  }
};

export const getMiningPoolBlocks = async (slug: string, blockHeight: string): Promise<MiningPoolBlocks | false> =>  {
  try {
    const response = await axios.get(`${BASE_URL}/v1/mining/pool/${slug}/blocks/${blockHeight}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Mining Pool Blocks info:', error);
    return false;
  }
};
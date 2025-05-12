import axios from "axios";

const BASE_URL = "https://api.mempool.space/api";

export interface MempoolBlockFees {
    response: {
        blockSize: number;
        blockVSize: number;
        nTx: number;
        totalFees: number;
        medianFee: number;
        feeRange: number[];
    }[];
}

export interface RecommendedFees {
    fatestFee: number;
    halfHourFee: number;
    hourFee: number;
    economyFee: number;
    minimumFee: number;
}

export interface Mempool {
    count: number;
    vsize: number;
    totalFee: number;
    feeHistogram: string[];
}

export interface MempoolTxID {
    txids: string[];
}

export interface MempoolRecent {
    response: {
        txid: string;
        fee: number;
        vsize: number;
        value: number;
    }[];
}

export interface MempoolRBFTransactions {
    response: {
        tx: {
            txid: string;
            fee: number;
            vsize: number;
            value: number;
            rate: number;
            rbf: boolean;
            fullRbf: boolean;
        };
        time: number;
        fullRbf: boolean;
        replaces: {
            tx: {
                txid: string;
                fee: number;
                vsize: number;
                value: number;
                rate: number;
                rbf: boolean;
            };
            time: number;
            interval: number;
            fullRbf: boolean;
            replaces: string[];
        }[];
    }[];
}

export interface mempoolFullRBFTransactions {
    response: {
        tx: {
            txid: string;
            fee: number;
            vsize: number;
            value: number;
            rate: number;
            rbf: boolean;
            fullRbf: boolean;
        };
        time: number;
        fullRbf: boolean;
        replaces: {
            tx: {
                txid: string;
                fee: number;
                vsize: number;
                value: number;
                rate: number;
                rbf: boolean;
            };
            time: number;
            interval: number;
            fullRbf: boolean;
            replaces: string[];
        }[];
    }[];
}

export const MempoolBlockFees = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/v1/fees/mempool-blocks`);
      return response.data;
    } catch (error) {
      console.error('Error mempool blocks fees info:', error);
      return false;
    }
};

export const RecommendedFees = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/v1/fees/recommended`);
      return response.data;
    } catch (error) {
      console.error('Error recommended fees info:', error);
      return false;
    }
};

export const Mempool = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/mempool`);
      return response.data;
    } catch (error) {
      console.error('Error mempool info:', error);
      return false;
    }
};

export const MempoolTxID = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/mempool/txids`);
      return response.data;
    } catch (error) {
      console.error('Error mempool transaction IDs info:', error);
      return false;
    }
};

export const MempoolRecent = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/mempool/recent`);
      return response.data;
    } catch (error) {
      console.error('Error mempool recent info:', error);
      return false;
    }
};

export const MempoolRBFTransactions = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/v1/replacements`);
      return response.data;
    } catch (error) {
      console.error('Error mempool rbf transactions info:', error);
      return false;
    }
};

export const MempoolFullRBFTransactions = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/v1/fullrbf/replacements`);
      return response.data;
    } catch (error) {
      console.error('Error mempool full rbf transactions info:', error);
      return false;
    }
};
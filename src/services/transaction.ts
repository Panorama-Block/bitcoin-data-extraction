import axios from "axios"
import Hashblock from "../model/Hashblock"
import { getDayTimestamp } from "../utils/date"

const BASE_URL = "https://mempool.space/api"

export interface TransactionStatus {
  confirmed: boolean;
  block_height?: number;
  block_hash?: string;
  block_time?: number;
}

export interface TransactionVin {
  txid: string;
  vout: number;
  prevout?: {
    scriptpubkey: string;
    scriptpubkey_asm: string;
    scriptpubkey_type: string;
    scriptpubkey_address: string;
    value: number;
  };
  scriptsig: string;
  scriptsig_asm: string;
  witness?: string[];
  is_coinbase: boolean;
  sequence: number;
}

export interface TransactionVout {
  scriptpubkey: string;
  scriptpubkey_asm: string;
  scriptpubkey_type: string;
  scriptpubkey_address: string;
  value: number;
}

export interface TransactionInfo {
  txid: string;
  version: number;
  locktime: number;
  size: number;
  weight: number;
  fee: number;
  vin: TransactionVin[];
  vout: TransactionVout[];
  status: TransactionStatus;
}

// Addition of Data

export interface TransactionHex {
  hexcode: number;
}

export interface TransactionMerkleblockProof {
  hexcode: number;
}

export interface TransactionMerkleProof {
  blockHeight: number;
  merkle: string[];
  pos: number;
}

export interface TransactionOutspend {
  spent: boolean;
  txid: string;
  vin: number;
  status: {
    confirmed: boolean;
    block_height: number;
    block_hash: string;
    block_time: number;
  }
}

export interface TransactionOutspends {
  response: {
    spent: boolean;
    txid: string;
    vin: number;
    status: {
      confirmed: boolean;
      block_height: number;
      block_hash: string;
      block_time: number;
    }
  }[];
}

export interface TransactionRaw {
  response: string;
}

export interface TransactionRBFTimeline {
  replacements: {
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
  };
  replaces: string[];
}

export interface TransactionStatus {
  confirmed: boolean;
  blockHeight: number;
  blockHash: string;
  blockTime: number;
}

export interface TransactionTimes {
  response: number[];
}

export const getTransactionInfo = async (id: string): Promise<TransactionInfo | false> => {
  try {
    const response = await axios.get(`${BASE_URL}/tx/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching transaction info:', error);
    return false;
  }
};

export const getTransactionIds = async (id: string): Promise<string[] | false> => {
  try {
    const response = await axios.get(`${BASE_URL}/block/${id}/txids`);
    return response.data;
  } catch (error) {
    console.error('Error fetching transaction IDs:', error);
    return false;
  }
};

export const getTransactions = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/block/${id}/summary`)

    if (response.data) {

      const { fee, value } = response.data.reduce((acc: any, transaction: any) => {
        acc.fee += transaction.fee
        acc.value += transaction.value

        return acc
      })

      const data = {
        id: id,
        tx_count: response.data.length,
        fee: fee,
        value: value
      }

      // const result = await Hashblock.updateOne(
      //   { id: id },
      //   {
      //     tx_count: response.data.length,
      //     fee: fee,
      //     value: value
      //   }
      // )
      return data
    }
  }
  catch (error) {
    return false
  }
}

export const getTransactionsByDay = async (day: number) => {
  const timestamp = getDayTimestamp(day)

  try {
    const hashblocks = await Hashblock.aggregate([
      { $unset: ["_id"] },
      {
        $match: {
          timestamp: {
            $gte: timestamp
          }
        }
      },
      {
        $group: {
          "_id": null,
          'fee': {
            "$sum": "$fee"
          },
          'tx_count': {
            "$sum": "$tx_count"
          },
          'value': {
            "$sum": "$value"
          }
        }
      },
      {
        $project: {
          '_id': 0,
          'fee': "$fee",
          'tx_count': "$tx_count",
          'value': "$value"
        }
      }
    ]).sort({ timestamp: -1 })

    return hashblocks
  }
  catch (error) {
    console.log(error)
    return false
  }
}

export const getTransactionHex = async (txid: string): Promise<TransactionHex | false> =>  {
  try {
    const response = await axios.get(`${BASE_URL}/tx/${txid}/hex`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Transaction Hex info:', error);
    return false;
  }
};

export const getTransactionMerkleBlockProof = async (txid: string): Promise<TransactionMerkleblockProof | false> =>  {
  try {
    const response = await axios.get(`${BASE_URL}/tx/${txid}/merkleblock-proof`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Transaction Merkle Block Proof info:', error);
    return false;
  }
};

export const getTransactionMerkleProof = async (txid: string): Promise<TransactionMerkleProof | false> =>  {
  try {
    const response = await axios.get(`${BASE_URL}/tx/${txid}/merkle-proof`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Transaction Merkle Proof info:', error);
    return false;
  }
};

export const getTransactionOutspend = async (txid: string, vout: number): Promise<TransactionOutspend | false> =>  {
  try {
    const response = await axios.get(`${BASE_URL}/tx/${txid}/outspend/${vout}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Transaction Outspend info:', error);
    return false;
  }
};

export const getTransactionOutspends = async (txid: string): Promise<TransactionOutspends | false> =>  {
  try {
    const response = await axios.get(`${BASE_URL}/tx/${txid}/outspends`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Transaction Outspends info:', error);
    return false;
  }
};

export const getTransactionRaw = async (txid: string): Promise<TransactionRaw | false> =>  {
  try {
    const response = await axios.get(`${BASE_URL}/tx/${txid}/raw`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Transaction Raw info:', error);
    return false;
  }
};

export const getTransactionRBFTimeline = async (txid: string): Promise<TransactionRBFTimeline | false> =>  {
  try {
    const response = await axios.get(`${BASE_URL}/v1/tx/${txid}/rbf`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Transaction RBF Timeline info:', error);
    return false;
  }
};

export const getTransactionStatus = async (txid: string): Promise<TransactionStatus | false> =>  {
  try {
    const response = await axios.get(`${BASE_URL}/tx/${txid}/status`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Transaction Status info:', error);
    return false;
  }
};

export const getTransactionTimes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/v1/transaction-times`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Transaction Times info:', error);
    return false;
  }
};
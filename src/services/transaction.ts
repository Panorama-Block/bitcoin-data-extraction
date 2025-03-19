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
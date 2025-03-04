import axios from "axios"
import Hashblock from "../model/Hashblock"
import { getTransactions } from "./transaction"
import { getDayTimestamp } from "../utils/date"

const BASE_URL = "https://api.mempool.space/api"

export type HashblockType = {
  id: string,
  height: number,
  version: number,
  timestamp: number,
  tx_count: number,
  size: number,
  weight: number,
  merkle_root: string,
  previousblockhash: string,
  mediantime: number,
  nonce: number,
  bits: number,
  difficulty: number
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  totalPages: number;
  page: number;
}

export const getHashblocks = async (page: number = 1, limit: number = 10): Promise<PaginatedResult<any> | false> => {
  try {
    const total = await Hashblock.countDocuments();
    const totalPages = Math.ceil(total / limit);
    const validPage = Math.min(page, totalPages || 1);
    const skip = (validPage - 1) * limit;

    const hashblocks = await Hashblock.find()
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit);

    return {
      data: hashblocks,
      total,
      totalPages,
      page: validPage
    };
  }
  catch (error) {
    return false;
  }
}

export const getHashblocksByDay = async (day: number) => {
  const timestamp = getDayTimestamp(day)

  try {
    const hashblocks = await Hashblock.find({
      timestamp: {
        $gte: timestamp
      }
    }, {
      "_id": 0,
      "__v": 0
    }).sort({ timestamp: -1 })
    return hashblocks
  }
  catch (error) {
    return false
  }
}

export const getNewestsHashblocks = async () => {

  try {
    const response = await axios.get(`${BASE_URL}/blocks`)

    return response.data
  }
  catch (error) {
    return false
  }
}

export const getManyHashblocks = async (targetCount: number = 1000) => {
  try {
    let allBlocks: any[] = [];
    let lastHeight: number | undefined;

    while (allBlocks.length < targetCount) {
      const url = lastHeight
        ? `${BASE_URL}/blocks/${lastHeight}`
        : `${BASE_URL}/blocks`;

      const response = await axios.get(url);
      const blocks = response.data;

      if (!blocks || blocks.length === 0) {
        break;
      }

      allBlocks = [...allBlocks, ...blocks];

      // Pega a altura do último bloco para próxima iteração
      const lastBlock = blocks[blocks.length - 1];
      lastHeight = lastBlock.height - 1;

      await new Promise(resolve => setTimeout(resolve, 100));
    }

    return allBlocks.slice(0, targetCount);
  }
  catch (error) {
    console.error('Error fetching many blocks:', error);
    return false;
  }
}

export const saveHashblock = async (hashblock: HashblockType) => {
  try {
    const hasHashblock = await Hashblock.find({ id: hashblock.id })

    if (hasHashblock.length === 0) {
      await Hashblock.create({
        id: hashblock.id,
        tx_count: hashblock.tx_count,
        previousblockhash: hashblock.previousblockhash,
        timestamp: hashblock.timestamp
      })
      const data = await getTransactions(hashblock.id)
      return data
    }
    else if (hasHashblock[0].value === 0) {
      const data = await getTransactions(hashblock.id)
      return data
    }
  }
  catch (error) {
    return false
  }
}
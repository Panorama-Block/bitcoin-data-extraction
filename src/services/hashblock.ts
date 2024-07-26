import axios from "axios"
import Hashblock from "../model/Hashblock"
import { getTransactions } from "./transaction"
import { getDayTimestamp } from "../utils/date"

const BASE_URL = "https://mempool.space/api/v1"

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

export const getHashblocks = async () => {
  try {
    const hashblocks = await Hashblock.find()
    return hashblocks
  }
  catch (error) {
    return false
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
    })
    return hashblocks
  }
  catch (error) {
    return false
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
    }
    const data = await getTransactions(hashblock.id)
    return data
  }
  catch (error) {
    return false
  }
}
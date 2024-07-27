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

export const getHashblocks = async () => {
  try {
    const hashblocks = await Hashblock.find().sort({ timestamp: -1 })
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
    }).sort({ timestamp: -1 })
    return hashblocks
  }
  catch (error) {
    return false
  }
}

export const getNewestsHashblocks = async (height?: string) => {
  try {
    if (height) {
      const response = await axios.get(`${BASE_URL}/blocks/${height}`)
      return response.data
    }
    else {
      const response = await axios.get(`${BASE_URL}/blocks`)
      return response.data
    }
  }
  catch (error) {
    console.log(error)

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
      const data = await getTransactions(hashblock.id)
      return data
    }
    else if (hasHashblock[0].value === 0) {
      const data = await getTransactions(hashblock.id)
      return data
    }
  }
  catch (error) {
    console.log(error)
    return false
  }
}
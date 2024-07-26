import axios from "axios"
import Hashblock from "../model/Hashblock"
import { getDayTimestamp } from "../utils/date"

const BASE_URL = "https://mempool.space/api/v1"

export const getTransactions = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/block/${id}/summary`)

    if (response.data) {

      const { fee, value } = response.data.reduce((acc: any, transaction: any) => {
        acc.fee += transaction.fee
        acc.value += transaction.value

        return acc
      })

      const data = await Hashblock.updateOne(
        { id: id },
        {
          tx_count: response.data.length,
          fee: fee,
          value: value
        }
      )
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
      {
        $match: {
          timestamp: {
            $gte: timestamp
          }
        }
      },
      {
        $project: {
          "_id": 0,
          'fee': "$fee",
          'tx_count': '$tx_count',
          'value': '$value'
        },
      }
    ])

    return hashblocks
  }
  catch (error) {
    console.log(error)
    return false
  }
}
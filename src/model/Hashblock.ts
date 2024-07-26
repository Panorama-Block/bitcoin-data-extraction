import { Schema, model, connection, Model } from "mongoose"

type HashblockType = {
  id: string,
  tx_count: number,
  previousblockhash: string,
  timestamp: number,
  fee: number,
  value: number
}

const schema = new Schema<HashblockType>({
  id: { type: String, required: true },
  tx_count: { type: Number, required: true },
  previousblockhash: { type: String, required: true },
  timestamp: { type: Number, required: true },
  fee: { type: Number, default: 0 },
  value: { type: Number, default: 0 }
})

const modelName: string = 'Hashblock'

export default (connection && connection.models[modelName]) ? connection.models[modelName] as Model<HashblockType> : model<HashblockType>(modelName, schema)
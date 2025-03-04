import { Schema, model, connection, Model } from "mongoose"

type HashblockType = {
  id: string,
  tx_count: number,
  previousblockhash: string,
  timestamp: number,
  size: number,
  height: number,
  weight: number,
  fee: number,
  value: number
}

const schema = new Schema<HashblockType>({
  id: { type: String, required: true },
  tx_count: { type: Number, required: true },
  previousblockhash: { type: String, required: true },
  timestamp: { type: Number, required: true },
  fee: { type: Number, default: 0 },
  size: { type: Number, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  value: { type: Number, default: 0 }
})

const modelName: string = 'Hashblock'

export default (connection && connection.models[modelName]) ? connection.models[modelName] as Model<HashblockType> : model<HashblockType>(modelName, schema)
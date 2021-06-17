import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const schema = new Schema({
  budget: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true
  },
  reference: {
    type: Schema.Types.ObjectId,
    required: true
  },
  type: {
    type: Schema.Types.String,
    enum: ['training']
  },
  amount: {
    type: Schema.Types.Number,
    required: true
  },
  approved: {
    type: Schema.Types.Bool,
    default: false
  },
  approvedBy: {
    type: Schema.Types.ObjectId
  },
  approvedAt: {
    type: Schema.Types.Date
  }
}, { timestamps: true })

schema.plugin(mongoosePaginate)
const Spending = model('spending', schema)

export default Spending

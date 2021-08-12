import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const schema = new Schema({
  employee: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true
  },
  company: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true
  },
  budget: {
    type: Schema.Types.Number,
    default: 0
  },
  remaining: {
    type: Schema.Types.Number,
    default: 0
  },
  fromDate: {
    type: Schema.Types.Date,
    default: new Date()
  },
  toDate: Schema.Types.Date,
  spendings: {
    type: [{
      type: Schema.Types.ObjectId,
      index: true
    }]
  },
  currency: {
    type: Schema.Types.String,
    default: '€'
  }
}, { timestamps: true })

schema.plugin(mongoosePaginate)
const Budget = model('budget', schema)

export default Budget

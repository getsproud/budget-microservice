import Spending from '../models/spending'
import Budget from '../models/budget'

const approveSpending = call => new Promise((resolve, reject) => {
  const { query } = call

  const message = {
    domain: 'budget',
    i18n: 'SPENDING_APPROVAL_FAILURE',
    data: {},
    code: 500,
    stack: null,
    error: null
  }

  query.approvedAt = null

  if (query.approved)
    query.approvedAt = new Date()

  Spending.findOneAndUpdate({ _id: query._id }, query, { new: true })
    .then(async spending => {
      await Budget.update(
        { _id: spending.bugdet },
        { $inc: { remaining: spending.amount * -1 } }
      )

      if (!spending) {
        message.i18n = 'SPENDING_NOT_FOUND'
        message.code = 404

        return reject(message)
      }

      message.i18n = 'SPENDING_APPROVAL_SUCCESS'
      message.code = 200
      message.data = spending

      return resolve(message)
    }).catch(e => {
      message.stack = e.stack
      message.error = e.message

      return reject(message)
    })
})

export default approveSpending

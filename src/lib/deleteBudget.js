import Budget from '../models/budget'
import Spending from '../models/spending'

const deleteBudget = call => new Promise((resolve, reject) => {
  const { query } = call

  const message = {
    domain: 'budget',
    i18n: 'BUDGET_DELETION_FAILURE',
    data: null,
    code: 500,
    stack: null,
    error: null
  }

  Budget.findOneAndDelete(query)
    .then(budget => {
      if (!budget) {
        message.i18n = 'BUDGET_NOT_FOUND'
        message.code = 404

        return reject(message)
      }

      return Spending.deleteMany({ budget: budget._id }).exec()
    })
    .then(() => {
      message.i18n = 'BUDGET_DELETION_SUCCESS'
      message.code = 204

      return resolve(message)
    }).catch(e => {
      message.stack = e.stack
      message.err = e.message

      return reject(message)
    })
})

export default deleteBudget

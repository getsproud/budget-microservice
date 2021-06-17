import Spending from '../models/spending'
import Budget from '../models/budget'

const spendBudget = call => new Promise((resolve, reject) => {
  const { query } = call

  const message = {
    domain: 'budget',
    i18n: 'BUDGET_SPENDING_FAILURE',
    data: {},
    code: 500,
    stack: null,
    error: null
  }

  Spending.create(query).then(async spending => {
    message.i18n = 'BUDGET_SPENDING_SUCCESS'
    message.code = 200
    message.data = spending

    Budget.update({ _id: query.budget }, { $push: { spendings: spending._id } })
      .then(() => resolve(message))
      .catch(e => {
        message.stack = e.stack
        message.error = e.message

        return reject(message)
      })
  }).catch(e => {
    message.stack = e.stack
    message.error = e.message

    return reject(message)
  })
})

export default spendBudget

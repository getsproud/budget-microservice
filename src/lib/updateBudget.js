import Budget from '../models/budget'

const updateBudget = call => new Promise((resolve, reject) => {
  const { query } = call

  const message = {
    domain: 'budget',
    i18n: 'BUDGET_UPDATE_FAILURE',
    data: {},
    code: 500,
    stack: null,
    error: null
  }

  Budget.findOneAndUpdate({ _id: query._id }, query, { new: true }).then(budget => {
    if (!budget) {
      message.i18n = 'BUDGET_NOT_FOUND'
      message.code = 404

      return reject(message)
    }

    message.i18n = 'BUDGET_UPDATE_SUCCESS'
    message.code = 200
    message.data = budget

    return resolve(message)
  }).catch(e => {
    message.stack = e.stack
    message.error = e.message

    return reject(message)
  })
})

export default updateBudget

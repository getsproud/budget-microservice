import Budget from '../models/budget'

const findAllBy = call => new Promise((resolve, reject) => {
  const { query } = call

  const message = {
    domain: 'budget',
    i18n: 'BUDGET_ERROR',
    data: {},
    code: 500,
    stack: null,
    error: null
  }

  console.log(query)

  Budget.findOne(query).exec().then(budget => {
    message.data = budget

    if (!budget) {
      message.i18n = 'BUDGET_NOT_FOUND'
      message.code = 404

      return reject(message)
    }

    message.i18n = 'BUDGET_FOUND'
    message.code = 200

    return resolve(message)
  }).catch(err => {
    message.stack = err.stack
    message.error = err.message

    return reject(message)
  })
})

export default findAllBy

import Budget from '../models/budget'

const createBudget = call => new Promise((resolve, reject) => {
  const { query } = call

  const message = {
    domain: 'budget',
    i18n: 'BUDGET_CREATION_FAILURE',
    data: {},
    code: 500,
    stack: null,
    error: null
  }

  query.remaining = query.budget

  Budget.create(query).then(budget => {
    message.i18n = 'BUDGET_CREATION_SUCCESS'
    message.code = 200
    message.data = budget

    return resolve(message)
  }).catch(e => {
    message.stack = e.stack
    message.err = e.message

    return reject(message)
  })
})

export default createBudget

import Budget from '../models/budget'

const findAllBy = call => new Promise((resolve, reject) => {
  const { query, options, useResolve } = call

  const message = {
    domain: 'budget',
    i18n: 'BUDGETS_ERROR',
    data: [],
    code: 500,
    stack: null,
    error: null
  }

  const opts = {
    page: options.page || 1,
    limit: options.limit || 12,
    pagination: options.pagination || true
  }

  Budget.paginate(query, opts).then(budgets => {
    message.data = budgets

    if (!budgets.docs || !budgets.docs.length) {
      message.i18n = 'BUDGETS_NOT_FOUND'
      message.code = 404

      return !useResolve ? reject(message) : resolve(message)
    }

    message.i18n = 'BUDGETS_FOUND'
    message.code = 200

    return resolve(message)
  }).catch(err => {
    message.stack = err.stack
    message.error = err.message

    return reject(message)
  })
})

export default findAllBy

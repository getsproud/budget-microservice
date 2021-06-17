import Spending from '../models/spending'

const getSpendings = call => new Promise((resolve, reject) => {
  const { query, options, useResolve } = call

  const message = {
    domain: 'budget',
    i18n: 'SPENDINGS_ERROR',
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

  Spending.paginate(query, opts).then(spendings => {
    message.data = spendings

    if (!spendings.docs || !spendings.docs.length) {
      message.i18n = 'SPENDINGS_NOT_FOUND'
      message.code = 404

      return !useResolve ? reject(message) : resolve(message)
    }

    message.i18n = 'SPENDINGS_FOUND'
    message.code = 200

    return resolve(message)
  }).catch(err => {
    message.stack = err.stack
    message.error = err.message

    return reject(message)
  })
})

export default getSpendings

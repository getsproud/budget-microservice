import Spending from '../models/spending'

const updateSpending = call => new Promise((resolve, reject) => {
  const { query } = call

  const message = {
    domain: 'budget',
    i18n: 'SPENDING_UPDATE_FAILURE',
    data: {},
    code: 500,
    stack: null,
    error: null
  }

  Spending.findOneAndUpdate({ _id: query._id }, query, { new: true }).then(spending => {
    if (!spending) {
      message.i18n = 'SPENDING_NOT_FOUND'
      message.code = 404

      return reject(message)
    }

    message.i18n = 'SPENDING_UPDATE_SUCCESS'
    message.code = 200
    message.data = spending

    return resolve(message)
  }).catch(e => {
    message.stack = e.stack
    message.error = e.message

    return reject(message)
  })
})

export default updateSpending

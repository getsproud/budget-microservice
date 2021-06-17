import Budget from '../models/budget'
import Spending from '../models/spending'

const deleteSpending = call => new Promise((resolve, reject) => {
  const { query } = call

  const message = {
    domain: 'budget',
    i18n: 'SPENDING_DELETION_FAILURE',
    data: null,
    code: 500,
    stack: null,
    error: null
  }

  Spending.findOneAndDelete(query).exec()
    .then(async spending => {
      if (!spending) {
        message.i18n = 'SPENDING_NOT_FOUND'
        message.code = 404

        return reject(message)
      }

      if (spending && spending.approved) {
        await Budget.update({
          _id: spending.budget
        }, {
          $inc: {
            remaining: spending.amount
          }
        }, { new: true })
      }

      await Budget.update({ _id: spending.budget }, { $pull: { spendings: spending._id } })

      message.i18n = 'SPENDING_DELETION_SUCCESS'
      message.code = 204

      return resolve(message)
    }).catch(e => {
      message.stack = e.stack
      message.err = e.message

      return reject(message)
    })
})

export default deleteSpending

import { Responder } from 'cote'
import { connect } from 'mongoose'

import findBy from './lib/findBy'
import findAllBy from './lib/findAllBy'
import createBudget from './lib/createBudget'
import deleteBudget from './lib/deleteBudget'
import updateBudget from './lib/updateBudget'
import spendBudget from './lib/spendBudget'
import deleteSpending from './lib/deleteSpending'
import updateSpending from './lib/updateSpending'
import getSpendings from './lib/getSpendings'
import approveSpending from './lib/approveSpending'

const PORT = 50051

try {
  const connectRetry = t => {
    let tries = t

    return connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@sproud-cluster${process.env.NODE_ENV !== 'production' ? '-dev' : ''}${process.env.MONGO_HOST}/sproud${process.env.NODE_ENV === 'development' ? '-dev' : ''}?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
      .catch(e => {
        if (tries < 5) {
          tries += 1
          setTimeout(() => connectRetry(tries), 5000)
        }

        throw new Error(e)
      })
  }

  connectRetry(0)

  const responder = new Responder({
    name: 'Budget Service', port: PORT, key: 'budget'
  })

  responder.on('findBy', findBy)
  responder.on('findAllBy', findAllBy)
  responder.on('createBudget', createBudget)
  responder.on('deleteBudget', deleteBudget)
  responder.on('updateBudget', updateBudget)
  responder.on('spendBudget', spendBudget)
  responder.on('deleteSpending', deleteSpending)
  responder.on('updateSpending', updateSpending)
  responder.on('getSpendings', getSpendings)
  responder.on('approveSpending', approveSpending)

  responder.on('liveness', () => new Promise(resolve => resolve(200)))
  responder.on('readiness', () => new Promise(resolve => resolve(200)))

  // eslint-disable-next-line
  console.log(`🤩 Budget Microservice bound to port ${PORT}`)
} catch (e) {
  // eslint-disable-next-line
  console.error(`${e.message}`)
  throw new Error(e)
}

import { Router } from 'express'

import * as hashblockController from '../controllers/hashblock'
import * as transactionController from '../controllers/transaction'
import * as addressController from '../controllers/address'

export const mainRouter = Router()

mainRouter.get('/hashblock/', hashblockController.getAllHashblocks)
mainRouter.get('/newestsHashblocks/', hashblockController.getNewestsHashblocks)
mainRouter.get('/hashblock/:day', hashblockController.getHashblocksByDay)
mainRouter.post('/hashblock/', hashblockController.saveHashblock)
mainRouter.get('/transactions/:id', transactionController.getTransactions)
mainRouter.get('/transaction/:id', transactionController.getTransaction)
mainRouter.get('/address/:address', addressController.getAddress)
mainRouter.get('/summary/:day', transactionController.getTransactionsByDay)
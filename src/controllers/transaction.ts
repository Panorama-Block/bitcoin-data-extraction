import { RequestHandler } from "express"
import * as transactionService from '../services/transaction'

export const getTransactions: RequestHandler = async (req, res) => {
  const { id } = req.params
  const transactions = await transactionService.getTransactions(id)

  if (transactions && transactions) {
    res.status(201).json({ ok: transactions })
  }
  else {
    res.status(500).json({
      error: 'An error occurred in the request'
    })
  }
}

export const getTransactionsByDay: RequestHandler = async (req, res) => {
  const { day } = req.params
  const transactions = await transactionService.getTransactionsByDay(Number(day))

  console.log(transactions)
  if (transactions) {
    res.status(201).json({ ok: transactions })
  }
  else {
    res.status(500).json({
      error: 'An error occurred in the request'
    })
  }
}
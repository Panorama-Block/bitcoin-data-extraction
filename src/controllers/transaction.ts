import { RequestHandler } from "express"
import * as transactionService from '../services/transaction'

export const getTransaction: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const transactionInfo = await transactionService.getTransactionInfo(id);

    if (transactionInfo) {
      res.status(200).json({
        ok: true,
        data: transactionInfo
      });
    } else {
      res.status(404).json({
        error: 'Transaction not found or error occurred'
      });
    }
  } catch (error) {
    res.status(500).json({
      error: 'An error occurred while fetching transaction information'
    });
  }
};

export const getTransactionIds: RequestHandler = async (req, res) => {
  const {id} = req.params

  const transactionIds = await transactionService.getTransactionIds(id)

  if (transactionIds) {
    res.status(200).json({
      ok: true,
      data: transactionIds
    })
  } else {
    res.status(500).json({
      error: 'An error occurred in the request'
    })
  }
}

export const getTransactions: RequestHandler = async (req, res) => {
  const { id } = req.params
  const transactions = await transactionService.getTransactions(id)

  if (transactions) {
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

  if (transactions) {
    res.status(201).json({ ok: transactions })
  }
  else {
    res.status(500).json({
      error: 'An error occurred in the request'
    })
  }
}
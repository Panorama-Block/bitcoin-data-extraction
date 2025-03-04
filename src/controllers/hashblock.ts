import { RequestHandler } from "express"
import * as hashblockService from '../services/hashblock'

export interface PaginationQuery {
  page?: string;
  limit?: string;
}

export const saveHashblock: RequestHandler = async (req, res) => {
  const data = req.body
  const hashblock = await hashblockService.saveHashblock(data)

  if (hashblock) {
    res.status(200).json({ ok: "Hashblock saved" })
  }
  else {
    res.status(500).json({
      error: 'An error occurred in the request'
    })
  }
}

export const getAllHashblocks: RequestHandler = async (req, res) => {
  const { page = '1', limit = '10' } = req.query as PaginationQuery
  const pageNumber = Math.max(1, parseInt(page, 10))
  const limitNumber = Math.max(1, Math.min(100, parseInt(limit, 10)))

  try {
    const result = await hashblockService.getHashblocks(pageNumber, limitNumber)

    if (result) {
      res.status(200).json({
        ok: true,
        data: result.data,
        pagination: {
          total: result.total,
          page: pageNumber,
          limit: limitNumber,
          totalPages: result.totalPages
        }
      })
    } else {
      res.status(500).json({
        error: 'An error occurred in the request'
      })
    }
  } catch (error) {
    res.status(500).json({
      error: 'An error occurred while fetching hashblocks'
    })
  }
}

export const getHashblocksByDay: RequestHandler = async (req, res) => {
  const { day } = req.params

  const hashblocks = await hashblockService.getHashblocksByDay(Number(day))

  if (hashblocks) {
    res.json({ ok: hashblocks })
  }
  else {
    res.status(500).json({
      error: 'An error occurred in the request'
    })
  }
}

export const getNewestsHashblocks: RequestHandler = async (req, res) => {
  const hashblocks = await hashblockService.getNewestsHashblocks()

  if (hashblocks) {
    await hashblocks.map(async (hashblock: hashblockService.HashblockType) => {
      const saved = await hashblockService.saveHashblock(hashblock)
    })
    res.json({ ok: hashblocks })
  }
  else {
    res.status(500).json({ error: 'An error occurred in the request' })
  }
}
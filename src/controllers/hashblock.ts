import { RequestHandler } from "express"
import * as hashblockService from '../services/hashblock'

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
  const hashblocks = await hashblockService.getHashblocks()

  if (hashblocks) {
    res.status(200).json({ ok: hashblocks })
  }
  else {
    res.status(500).json({
      error: 'An error occurred in the request'
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
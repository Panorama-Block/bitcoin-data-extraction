import express from 'express'
import cors from 'cors'
import https from 'https'
import http from 'http'
import * as fs from 'fs'

import 'dotenv/config'

const isDevelopment = process.env.NODE_ENV === 'development'

import { mainRouter } from './routes/main'
import helmet from 'helmet'
import { mongoConnect } from './database/mongo'

mongoConnect()

import './jobs/index'

const server = express()

server.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginOpenerPolicy: { policy: "unsafe-none" }
}))
server.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true
}))
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.use(mainRouter)

const port = process.env.PORT || (isDevelopment ? 3000 : 443)

if (isDevelopment) {
    http.createServer(server).listen(port, () => {
        console.log(`Development server running on HTTP port ${port}`)
    })
} else {
    const options = {
        key: fs.readFileSync("/etc/letsencrypt/live/mempool-api.panoramablock.com/privkey.pem"),
        cert: fs.readFileSync("/etc/letsencrypt/live/mempool-api.panoramablock.com/fullchain.pem"),
    }
    https.createServer(options, server).listen(port, () => {
        console.log(`Production server running on HTTPS port ${port}`)
    })
}
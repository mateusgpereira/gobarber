import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'

import routes from './routes'
import { tmpFolder } from './config/upload'
import AppError from './errors/AppError'

import './database'

const app = express()

app.use(express.json())

app.use(routes)

app.use('/files', express.static(tmpFolder))

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.status).json({
      status: 'error',
      message: err.message
    })
  }

  console.error(err)

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  })
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server running on ${port}`)
})

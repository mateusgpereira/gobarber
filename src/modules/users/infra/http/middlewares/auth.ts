import { verify } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import authConfig from '@config/authConfig'
import AppError from '@shared/errors/AppError'

interface TokenPayload {
  iat: number
  exp: number
  sub: string
}

const auth = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new AppError('Missing authorization token', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, authConfig.jwt.secret)

    const { sub } = decoded as TokenPayload

    req.user = { id: sub }
    return next()
  } catch (err) {
    throw new AppError('Invalid Authorization token', 401)
  }
}

export default auth

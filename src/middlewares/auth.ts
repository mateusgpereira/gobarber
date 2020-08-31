import { verify } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import authConfig from '../config/authConfig'

interface TokenPayload {
  iat: number
  exp: number
  sub: string
}

const auth = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new Error('Missing authorization token')
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, authConfig.jwt.secret)

    const { sub } = decoded as TokenPayload

    req.user = { id: sub }
    return next()
  } catch (err) {
    throw new Error('Invalid Authorization token')
  }
}

export default auth

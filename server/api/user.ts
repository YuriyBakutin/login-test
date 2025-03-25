import { getCookie } from 'h3'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token')

  if (!token) {
    return { authorized: false }
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
    return { authorized: true, user: decoded }
  } catch {
    return { authorized: false }
  }
})

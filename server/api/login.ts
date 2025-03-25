import { readBody, setCookie } from 'h3'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import users from '../data/users.json'
import { incorrectLoginPasswordMessage } from '../data/messages'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, password } = body

  if (!username) {
    throw createError({
      statusCode: 400,
      message: 'Поле Логин является обязательным',
    })
  }

  if (!username || !password) {
    throw createError({
      statusCode: 400,
      message: 'Поле Пароль является обязательным',
    })
  }

  const hashedPassword = crypto.createHash('md5').update(password).digest('hex')

  const user = users.find(
    (u) =>
      u.credentials.username === username &&
      u.credentials.passphrase === hashedPassword,
  )

  if (!user) {
    return { success: false, message: incorrectLoginPasswordMessage }
  }

  const token = jwt.sign(
    { username, name: user.name, surname: user.surname },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' },
  )

  setCookie(event, 'auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60, // 1 час
  })

  return { success: true, user: { name: user.name, surname: user.surname } }
})

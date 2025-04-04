import { getCookie } from 'h3'
import jwt from 'jsonwebtoken'
import cities from '../data/cities.json'
import coffeeMachineModels from '../data/coffeeMachineModels.json'
import serviceCompanies from '../data/serviceCompanies.json'
import statuses from '../data/statuses.json'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token')

  if (!token) {
    return { authorized: false }
  }

  const coffeeMachinesOptions = {
    cities,
    coffeeMachineModels,
    serviceCompanies,
    statuses,
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
    return { authorized: true, user: decoded, coffeeMachinesOptions }
  } catch {
    return { authorized: false }
  }
})

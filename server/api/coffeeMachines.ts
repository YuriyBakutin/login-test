import { getCookie } from 'h3'
import coffeeMachines from '../data/coffeeMachines.json'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token')

  if (!token) {
    return { authorized: false }
  }

  try {
    return { coffeeMachines }
  } catch (error) {
    return { error }
  }
})

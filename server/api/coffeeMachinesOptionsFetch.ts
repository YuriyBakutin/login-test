import { getCookie } from 'h3'
import cities from '../data/cities.json'
import coffeeMachineModels from '../data/coffeeMachineModels.json'
import serviceCompanies from '../data/serviceCompanies.json'
import statuses from '../data/statuses.json'
// import coffeeMachines from '../data/coffeeMachines.json'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token')

  if (!token) {
    return { authorized: false }
  }

  try {
    return {
      cities,
      coffeeMachineModels,
      serviceCompanies,
      statuses,
      authorized: true,
    }
  } catch (error) {
    return { error }
  }
})

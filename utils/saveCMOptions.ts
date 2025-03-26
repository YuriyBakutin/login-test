import type { ICity, ICMModel, IServiceCompany, IStatus } from '~/stores/cmdb'
import { cmdb } from '~/stores/cmdb'

interface IOptions {
  coffeeMachineModels: ICMModel[]
  serviceCompanies: IServiceCompany[]
  cities: ICity[]
  statuses: IStatus[]
}

export const saveCMOptions = async (options: IOptions) => {
  const rawOptions = toRaw(options)

  const tasks = [
    cmdb.cities.bulkPut(rawOptions.cities),
    cmdb.serviceCompanies.bulkPut(rawOptions.serviceCompanies),
    cmdb.coffeeMachineModels.bulkPut(rawOptions.coffeeMachineModels),
    cmdb.statuses.bulkPut(rawOptions.statuses),
  ]

  try {
    await Promise.all(tasks)
  } catch (error) {
    return error
  }
}

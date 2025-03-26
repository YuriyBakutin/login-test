import Dexie from 'dexie'
import type { Table } from 'dexie'

export interface ICity {
  id?: number
  name: string
}

export interface ICMModel {
  id?: number
  name: string
}

export interface IServiceCompany {
  id?: number
  name: string
}

export interface IStatus {
  id?: number
  name: string
}

export interface ICoffeeMachine {
  id?: number
  dateCreated: number
  statusId: number
  cityId: number
  modelId: number
  cupCounter: number
  repairsNumber: number
  nextServiceDate: number
  serviceCompanyId: number
}

export class CoffeeMachineDatabase extends Dexie {
  cities!: Table<ICity>
  coffeeMachineModels!: Table<ICMModel>
  serviceCompanies!: Table<IServiceCompany>
  statuses!: Table<IStatus>
  coffeeMachines!: Table<ICoffeeMachine>

  constructor() {
    super('SearchParamDatabase')

    this.version(1).stores({
      cities: '&id, name',
      coffeeMachineModels: '&id, name',
      serviceCompanies: '&id, name',
      statuses: '&id, name',
      coffeeMachines:
        '&id, dateCreated, statusId, cityId, modelId, cupCounter,' +
        'repairsNumber, nextServiceDate, serviceCompanyId',
    })
  }
}

export const cmdb = new CoffeeMachineDatabase()

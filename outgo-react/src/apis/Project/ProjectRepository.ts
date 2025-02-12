import axios from 'axios'
import { Timeframe } from '../../Types/enums'
import fetchBackendToken from '../../authentication/ADB2Chelpers/fetchBackendToken'
import { IPublicClientApplication, AccountInfo } from '@azure/msal-browser'

const backendApiUrl = 'http://localhost:5298/api'

export interface Project {
  name: string
  description: string
  budget: number
  savings: number
  budgetTimeframe: Timeframe
}

export class ProjectRepository {
  static async getAll() {
    const { data } = await axios.get(`${backendApiUrl}/Project`)
    return data
  }

  static async getById(id: number) {
    const { data } = await axios.get(`${backendApiUrl}/Project/${id}`)
    return data
  }

  static async getByName(name: string) {
    const { data } = await axios.get(`${backendApiUrl}/Project/byName/${name}`)
    return data
  }

  static async create(
    project: Project,
    instance: IPublicClientApplication,
    accounts: AccountInfo[]
  ) {
    const tokendata = await fetchBackendToken(instance, accounts)
    if (typeof tokendata === 'string') {
      throw new Error('Invalid token data')
    }
    const { data } = await axios.post(
      `${backendApiUrl}/Project`,
      project,
      tokendata.tokenOptions
    )
    return data
  }

  static async update(id: number, project: Project, instance: IPublicClientApplication,
    accounts: AccountInfo[]) {

    const tokendata = await fetchBackendToken(instance, accounts)
    try {
      if (typeof tokendata === 'string') {
        throw new Error('Invalid token data')
      }
      const { data } = await axios.put(
        `${backendApiUrl}/Project/${id}`,
        project,
        tokendata.tokenOptions
      )
      return data
    } catch (error) {
      console.error('Error updating project:', error)
      throw error
    }
  }

  static async delete(id: number, instance: IPublicClientApplication, accounts: AccountInfo[]) {
    const tokendata = await fetchBackendToken(instance, accounts)
    try {
      if (typeof tokendata === 'string') {
        throw new Error('Invalid token data')
      }
      const { data } = await axios.delete(`${backendApiUrl}/Project/${id}`, tokendata.tokenOptions)
      return data
    } catch (error) {
      console.error('Error deleting project:', error)
      throw error
    }
  }
}

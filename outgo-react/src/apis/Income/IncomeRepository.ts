import axios from 'axios'
import { Timeframe, TransactionType } from '../../Types/enums'

const backendApiUrl = 'http://localhost:5298/api'

export interface Income {

  name: string
  description?: string // Optional
  amount: number
  incomeType: TransactionType
  timeframe?: Timeframe // Optional
  date: string // Date as an ISO string (to match DateTime in .NET)
  userId: string
  projectId: number
}

export class IncomeRepository {
  // Get income by ProjectId for one year
  static async getYealyIncome(projectId: number) {
    const { data } = await axios.get(
      `${backendApiUrl}/Income/Project/${projectId}/Year`
    )
    return data
  }

  // Post new income
  static async create(income: Income) {
    const { data } = await axios.post(`${backendApiUrl}/Income`, income)
    return data
  }

  // Update income
  static async update(id: number, income: Income) {
    try {
      const { data } = await axios.put(`${backendApiUrl}/Income/${id}`, income)
      return data
    } catch (error) {
      console.error('Error updating income:', error)
      throw error
    }
  }

  // Delete income
  static async delete(id: number) {
    try {
      const { data } = await axios.delete(`${backendApiUrl}/Income/${id}`)
      return data
    } catch (error) {
      console.error('Error deleting income:', error)
      throw error
    }
  }
}

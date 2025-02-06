import axios from 'axios'
import { Category, Timeframe, TransactionType } from '../../Types/enums'

const backendApiUrl = 'http://localhost:5298/api'

export interface Expense {
  id: number
  name: string
  description?: string // Optional
  amount: number
  expenseType: TransactionType
  timeframe?: Timeframe
  date: string // ISO date format e.g., "2024-02-06T10:00:00Z"
  category: Category
  userId: string
  projectId: number
}

export class ExpensesRepository {
  // Get expense by ProjectId for one year
  static async getYealyExpenses(projectId: number) {
    const { data } = await axios.get(
      `${backendApiUrl}/Expenses/Project/${projectId}/Year`
    )
    return data
  }

  // Get expense by ProjectId for one month
  static async getMonthlyExpenses(projectId: number) {
    const { data } = await axios.get(
      `${backendApiUrl}/Expenses/Project/${projectId}/Month`
    )
    return data
  }

  // Get expense by ProjectId for one week
  static async getWeeklyExpenses(projectId: number) {
    const { data } = await axios.get(
      `${backendApiUrl}/Expenses/Project/${projectId}/Week`
    )
    return data
  }

  // Get expense by ProjectId for past 5 years
  static async getFiveYearExpenses(projectId: number) {
    const { data } = await axios.get(
      `${backendApiUrl}/Expenses/Project/${projectId}/Past5Years`
    )
    return data
  }

  // Post new expense
  static async create(expense: Expense) {
    const { data } = await axios.post(`${backendApiUrl}/Expenses`, expense)
    return data
  }

  // Update expense
  static async update(id: number, expense: Expense) {
    try {
      const { data } = await axios.put(
        `${backendApiUrl}/Expenses/${id}`,
        expense
      )
      return data
    } catch (error) {
      console.error('Error updating expense:', error)
      throw error
    }
  }

  // Delete expense
  static async delete(id: number) {
    try {
      const { data } = await axios.delete(`${backendApiUrl}/Expenses/${id}`)
      return data
    } catch (error) {
      console.error('Error deleting expense:', error)
      throw error
    }
  }
}

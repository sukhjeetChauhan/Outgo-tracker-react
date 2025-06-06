import axios from 'axios'
import { Category, Timeframe, TransactionType } from '../../Types/enums'

const backendUrl = import.meta.env.VITE_BASE_BACKEND_URL

export const backendApiUrl = `${backendUrl}/api`

export interface Expense {
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
  static async getYealyExpenses(projectId: number | null) {
    const { data } = await axios.get(
      `${backendApiUrl}/Expenses/Project/${projectId}/Year`,
      { withCredentials: true }
    )
    return data
  }

  // Get expense by ProjectId for one month
  static async getMonthlyExpenses(projectId: number | null) {
    const { data } = await axios.get(
      `${backendApiUrl}/Expenses/Project/${projectId}/Month`,
      { withCredentials: true }
    )
    return data
  }

  // Get expense by ProjectId for one week
  static async getWeeklyExpenses(projectId: number | null) {
    const { data } = await axios.get(
      `${backendApiUrl}/Expenses/Project/${projectId}/Week`,
      { withCredentials: true }
    )
    return data
  }

  // Get expense by ProjectId for past 5 years
  static async getFiveYearExpenses(projectId: number | null) {
    const { data } = await axios.get(
      `${backendApiUrl}/Expenses/Project/${projectId}/Past5Years`,
      { withCredentials: true }
    )
    return data
  }

  // Post new expense
  static async create(expense: Expense) {
    const { data } = await axios.post(`${backendApiUrl}/Expenses`, expense, {
      withCredentials: true,
    })
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

import axios from 'axios'
import { backendApiUrl } from '../Expenses/ExpensesRepository'
export interface User {
  id: string
  firstName: string
  lastName: string
  email?: string
  phoneNumber?: string
  defaultProjectId: number | null
}

export class UsersRepository {
  static async getById(id: string) {
    const { data } = await axios.get(`${backendApiUrl}/User/${id}`, {
      withCredentials: true,
    })
    return data
  }

  static async create(user: User) {
    const { data } = await axios.post(`${backendApiUrl}/User`, user)
    return data
  }

  static async update(id: string, user: User) {
    const { data } = await axios.put(`${backendApiUrl}/User/${id}`, user)
    return data
  }

  static async delete(id: string) {
    const { data } = await axios.delete(`${backendApiUrl}/User/${id}`)
    return data
  }
}

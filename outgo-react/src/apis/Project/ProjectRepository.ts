import axios from 'axios'
import { Timeframe } from '../../Types/enums'

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

  static async create(project: Project) {
    const { data } = await axios.post(`${backendApiUrl}/Project`, project)
    return data
  }

  static async update(id: number, project: Project) {
    try {
      const { data } = await axios.put(
        `${backendApiUrl}/Project/${id}`,
        project
      )
      return data
    } catch (error) {
      console.error('Error updating project:', error)
      throw error
    }
  }

  static async delete(id: number) {
    try {
      const { data } = await axios.delete(`${backendApiUrl}/Project/${id}`)
      return data
    } catch (error) {
      console.error('Error deleting project:', error)
      throw error
    }
  }
}

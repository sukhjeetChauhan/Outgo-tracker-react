import axios from 'axios'
import { Role } from '../../Types/enums'
import { backendApiUrl } from '../Expenses/ExpensesRepository'

export interface ProjectUser {
  userId: string
  projectId: number
  role: Role
}

export class ProjectUserRepository {
  static async getByUserId(userId: string | null) {
    const { data } = await axios.get(
      `${backendApiUrl}/ProjectUser/GetByUserId/${userId}`
    )
    return data
  }

  static async getUserByProjectId(projectId: number) {
    const { data } = await axios.get(
      `${backendApiUrl}/ProjectUser/GetUsersByProjectId/${projectId}`
    )
    return data
  }

  static async getProjectByUserId(userId: string | null) {
    const { data } = await axios.get(
      `${backendApiUrl}/ProjectUser/GetProjectsByUserId/${userId}`
    )
    return data
  }

  static async getById(id: number) {
    const { data } = await axios.get(`${backendApiUrl}/ProjectUser/${id}`)
    return data
  }

  static async create(projectUser: ProjectUser) {
    const { data } = await axios.post(
      `${backendApiUrl}/ProjectUser`,
      projectUser
    )
    return data
  }

  static async update(id: number, projectUser: ProjectUser) {
    try {
      const { data } = await axios.put(
        `${backendApiUrl}/ProjectUser/${id}`,
        projectUser
      )
      return data
    } catch (error) {
      console.error('Error updating project user:', error)
      throw error
    }
  }

  static async delete(id: number) {
    try {
      const { data } = await axios.delete(`${backendApiUrl}/ProjectUser/${id}`)
      return data
    } catch (error) {
      console.error('Error deleting project user:', error)
      throw error
    }
  }

  static async deleteByProjectAndUserId(
    projectId: number,
    userId: string | null
  ) {
    try {
      const { data } = await axios.delete(
        `${backendApiUrl}/ProjectUser/DeleteByProjectAndUser/${projectId}/${userId}`
      )
      return data
    } catch (error) {
      console.error('Error deleting project user:', error)
      throw error
    }
  }
}

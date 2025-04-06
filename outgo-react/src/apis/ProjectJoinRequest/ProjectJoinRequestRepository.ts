import axios from 'axios'
import { Status } from '../../Types/enums'
import { backendApiUrl } from '../Expenses/ExpensesRepository'

export interface ProjectJoinRequest {
  projectId: number | null
  userId: string | null
  userName: string
  status: Status
}

export class ProjectJoinRequestRepository {
  static async getByProjectId(projectId: number | null) {
    const { data } = await axios.get(
      `${backendApiUrl}/ProjectJoinRequest/ProjectId/${projectId}`
    )
    return data
  }

  static async getByUserId(userId: string | null) {
    const { data } = await axios.get(
      `${backendApiUrl}/ProjectJoinRequest/UserId/${userId}`
    )
    return data
  }

  static async create(projectJoinRequest: ProjectJoinRequest) {
    const { data } = await axios.post(
      `${backendApiUrl}/ProjectJoinRequest`,
      projectJoinRequest
    )
    return data
  }

  static async update(id: number, projectJoinRequest: ProjectJoinRequest) {
    try {
      const { data } = await axios.put(
        `${backendApiUrl}/ProjectJoinRequest/${id}`,
        projectJoinRequest
      )
      return data
    } catch (error) {
      console.error('Error updating project join request:', error)
      throw error
    }
  }

  static async delete(id: number) {
    try {
      const { data } = await axios.delete(
        `${backendApiUrl}/ProjectJoinRequest/${id}`
      )
      return data
    } catch (error) {
      console.error('Error deleting project join request:', error)
      throw error
    }
  }
}

// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const backendApiUrl = 'http://localhost:5298/api'

export interface Project {
  name: string
  description: string
  budget: number
  savings: number
  budgetTimeframe: number
}

export const getProjects = async () => {
  const { data } = await axios.get(`${backendApiUrl}/Project`)
  return data
}

export const getProjectById = async (id: number) => {
  const { data } = await axios.get(`${backendApiUrl}/Project/${id}`)
  return data
}

export const createProject = async (project: Project) => {
  const { data } = await axios.post(`${backendApiUrl}/Project`, project)
  return data
}

export const updateProject = async (id: number, project: Project) => {
  try {
    const { data } = await axios.put(`${backendApiUrl}/Project/${id}`, project)
    return data
  } catch (error) {
    // Handle errors (could be 400, 404, etc.)
    console.error('Error updating project:', error)
    throw error // or handle the error accordingly
  }
}

export const deleteProject = async (id: number) => {
  try {
    const { data } = await axios.delete(`${backendApiUrl}/Project/${id}`)
    return data
  } catch (error) {
    // Handle errors (could be 400, 404, etc.)
    console.error('Error deleting project:', error)
    throw error // or handle the error accordingly
  }
}

//set up and export react query hooks

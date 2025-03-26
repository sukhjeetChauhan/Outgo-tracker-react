import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Project, ProjectRepository } from './ProjectRepository'
import { useMsal } from '@azure/msal-react'

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: ProjectRepository.getAll,
  })
}

export const useProjectById = (id: number | null) => {
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => ProjectRepository.getById(id),
    enabled: !!id, // Prevents execution if id is null or undefined
  })
}

export const useProjectByName = (name: string) => {
  return useQuery({
    queryKey: ['project', name],
    queryFn: () => ProjectRepository.getByName(name),
    enabled: !!name, // Prevents execution if name is null or undefined
  })
}

export const useCreateProject = () => {
  const { instance, accounts } = useMsal() // Get MSAL instance
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (project: Project) =>
      ProjectRepository.create(project, instance, accounts),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}

export const useUpdateProject = () => {
  const { instance, accounts } = useMsal() // Get MSAL instance & accounts
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, project }: { id: number | null; project: Project }) =>
      ProjectRepository.update(id, project, instance, accounts),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      queryClient.invalidateQueries({ queryKey: ['project', id] })
    },
  })
}

export const useDeleteProject = () => {
  const { instance, accounts } = useMsal() // Get MSAL instance & accounts
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) =>
      ProjectRepository.delete(id, instance, accounts),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Project, ProjectRepository } from './ProjectRepository'

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: ProjectRepository.getAll,
  })
}

export const useProject = (id: number) => {
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => ProjectRepository.getById(id),
    enabled: !!id, // Prevents execution if id is null or undefined
  })
}

export const useCreateProject = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ProjectRepository.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}

export const useUpdateProject = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, project }: { id: number; project: Project }) =>
      ProjectRepository.update(id, project),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      queryClient.invalidateQueries({ queryKey: ['project', id] })
    },
  })
}

export const useDeleteProject = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ProjectRepository.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { ProjectUser, ProjectUserRepository } from './ProjectUserRepository'

export const useGetUsersByProjectId = (projectId: number) => {
  return useQuery({
    queryKey: ['projectUser', 'users', projectId],
    queryFn: () => ProjectUserRepository.getUserByProjectId(projectId),
  })
}
export const useGetProjectsByUserId = (userId: string | null) => {
  return useQuery({
    queryKey: ['projectUser', 'projects', userId],
    queryFn: () => ProjectUserRepository.getProjectByUserId(userId),
  })
}
export const useCreateProjectUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ProjectUserRepository.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projectUser'] })
    },
  })
}

export const useUpdateProjectUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      id,
      projectUser,
    }: {
      id: number
      projectUser: ProjectUser
    }) => ProjectUserRepository.update(id, projectUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projectUser'] })
    },
  })
}

export const useDeleteProjectUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ProjectUserRepository.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projectUser'] })
    },
  })
}

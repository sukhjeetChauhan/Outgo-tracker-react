import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  ProjectJoinRequest,
  ProjectJoinRequestRepository,
} from './ProjectJoinRequestRepository'

export const useGetRequestsByProjectId = (projectId: number | null) => {
  return useQuery({
    queryKey: ['projectJoinRequest', 'requests', projectId],
    queryFn: () => ProjectJoinRequestRepository.getByProjectId(projectId),
  })
}

export const useCreateProjectJoinRequest = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ProjectJoinRequestRepository.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projectJoinRequest'] })
    },
  })
}

export const useUpdateProjectJoinRequest = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      id,
      projectJoinRequest,
    }: {
      id: number
      projectJoinRequest: ProjectJoinRequest
    }) => ProjectJoinRequestRepository.update(id, projectJoinRequest),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projectJoinRequest'] })
    },
  })
}

export const useDeleteProjectJoinRequest = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ProjectJoinRequestRepository.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projectJoinRequest'] })
    },
  })
}

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { User, UsersRepository } from './UsersRepository'

export const useUsersById = (id: string) => {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => UsersRepository.getById(id),
    enabled: !!id,
  })
}

export const useCreateUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (user: User) => UsersRepository.create(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, user }: { id: string; user: User }) =>
      UsersRepository.update(id, user),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['users', id] })
    },
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => UsersRepository.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

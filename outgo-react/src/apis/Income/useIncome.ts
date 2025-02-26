import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { Income, IncomeRepository } from './IncomeRepository'

export const useYearlyIncome = (projectId: number | null) => {
  return useQuery({
    queryKey: ['income', 'yearly', projectId],
    queryFn: () => IncomeRepository.getYealyIncome(projectId),
  })
}

export const useCreateIncome = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: IncomeRepository.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['income'] })
    },
  })
}

export const useUpdateIncome = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, income }: { id: number; income: Income }) =>
      IncomeRepository.update(id, income),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['income'] })
      // queryClient.invalidateQueries({ queryKey: ['income', id] })
    },
  })
}

export const useDeleteIncome = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: IncomeRepository.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['income'] })
    },
  })
}

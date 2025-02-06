import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Expense, ExpensesRepository } from './ExpensesRepository'

export const useYearlyExpenses = (projectId: number) => {
  return useQuery({
    queryKey: ['expenses', 'yearly', projectId],
    queryFn: () => ExpensesRepository.getYealyExpenses(projectId),
  })
}

export const useMonthlyExpenses = (projectId: number) => {
  return useQuery({
    queryKey: ['expenses', 'monthly', projectId],
    queryFn: () => ExpensesRepository.getMonthlyExpenses(projectId),
  })
}

export const useWeeklyExpenses = (projectId: number) => {
  return useQuery({
    queryKey: ['expenses', 'weekly', projectId],
    queryFn: () => ExpensesRepository.getWeeklyExpenses(projectId),
  })
}

export const useFiveYearExpenses = (projectId: number) => {
  return useQuery({
    queryKey: ['expenses', 'fiveYear', projectId],
    queryFn: () => ExpensesRepository.getFiveYearExpenses(projectId),
  })
}

export const useCreateExpense = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ExpensesRepository.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
    },
  })
}

export const useUpdateExpense = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, expense }: { id: number; expense: Expense }) =>
      ExpensesRepository.update(id, expense),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
      queryClient.invalidateQueries({ queryKey: ['expense', id] })
    },
  })
}

export const useDeleteExpense = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ExpensesRepository.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
    },
  })
}

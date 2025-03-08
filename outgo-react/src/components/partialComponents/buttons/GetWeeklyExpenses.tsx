import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store'
import { useWeeklyExpenses } from '../../../apis/Expenses/useExpenses'
import { Expense } from '../../../apis/Expenses/ExpensesRepository'
import { ExpenseTimeframe } from '../../../Pages/Expense'
import { useEffect } from 'react'

export interface GetExpensesButtonProps {
  setLoading: (value: boolean) => void
  setError: (value: boolean) => void
  currentTimeframe: ExpenseTimeframe
  setCurrentTimeframe: (value: ExpenseTimeframe) => void
  setExpense: (value: Expense[]) => void
}

export default function GetWeeklyExpenses({
  setLoading,
  setError,
  currentTimeframe,
  setCurrentTimeframe,
  setExpense,
}: GetExpensesButtonProps) {
  const { defaultProjectId } = useSelector((state: RootState) => state.user)
  const {
    data: expense,
    isLoading,
    isError,
  } = useWeeklyExpenses(defaultProjectId)

  useEffect(() => {
    if (currentTimeframe === 'weekly') {
      if (expense) {
        setExpense(expense)
      }
    }
  }, [currentTimeframe, expense, setExpense])

  const handleClick = () => {
    setLoading(isLoading)
    setError(isError)
    setCurrentTimeframe('weekly')
    setExpense(expense)
  }

  return (
    <button
      className={`${
        currentTimeframe === 'weekly'
          ? 'bg-white text-teal-500'
          : 'bg-teal-500 text-white'
      }  text-lg lg:text-2xl px-4 py-2 rounded-t-lg shadow-md cursor-pointer`}
      onClick={handleClick}
    >
      Weekly Expenses
    </button>
  )
}

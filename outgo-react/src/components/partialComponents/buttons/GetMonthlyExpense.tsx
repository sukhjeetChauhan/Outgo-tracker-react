import { useSelector } from 'react-redux'
import { GetExpensesButtonProps } from './GetWeeklyExpenses'
import { RootState } from '../../../Redux/store'
import { useMonthlyExpenses } from '../../../apis/Expenses/useExpenses'

export default function GetMonthlyExpense({
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
  } = useMonthlyExpenses(defaultProjectId)

  const handleClick = () => {
    setLoading(isLoading)
    setError(isError)
    setCurrentTimeframe('monthly')
    setExpense(expense)
  }
  return (
    <button
      className={`${
        currentTimeframe === 'monthly'
          ? 'bg-white text-teal-500'
          : 'bg-teal-500 text-white'
      }  text-sm lg:text-2xl px-4 py-2 sm:rounded-t-lg shadow-md cursor-pointer border-l-2 border-gray-200 sm:border-none`}
      onClick={handleClick}
    >
      Monthly Expenses
    </button>
  )
}

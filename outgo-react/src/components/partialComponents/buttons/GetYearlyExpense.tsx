import { useSelector } from 'react-redux'
import { GetExpensesButtonProps } from './GetWeeklyExpenses'
import { RootState } from '../../../Redux/store'
import { useYearlyExpenses } from '../../../apis/Expenses/useExpenses'

export default function GetYearlyExpense({
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
  } = useYearlyExpenses(defaultProjectId)

  const handleClick = () => {
    setLoading(isLoading)
    setError(isError)
    setCurrentTimeframe('yearly')
    setExpense(expense)
  }
  return (
    <button
      className={`${
        currentTimeframe === 'yearly'
          ? 'bg-white text-teal-500'
          : 'bg-teal-500 text-white'
      }  text-2xl px-4 py-2 rounded-t-lg shadow-md cursor-pointer`}
      onClick={handleClick}
    >
      Yearly Expenses
    </button>
  )
}

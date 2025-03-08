import { useSelector } from 'react-redux'
import { useFiveYearExpenses } from '../../../apis/Expenses/useExpenses'
import { GetExpensesButtonProps } from './GetWeeklyExpenses'
import { RootState } from '../../../Redux/store'

export default function GetFiveYearlyExpense({
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
  } = useFiveYearExpenses(defaultProjectId)

  const handleClick = () => {
    setLoading(isLoading)
    setError(isError)
    setCurrentTimeframe('5 years')
    setExpense(expense)
  }
  return (
    <button
      className={`${
        currentTimeframe === '5 years'
          ? 'bg-white text-teal-500'
          : 'bg-teal-500 text-white'
      }  text-lg lg:text-2xl px-4 py-2 rounded-t-lg shadow-md cursor-pointer`}
      onClick={handleClick}
    >
      5 Year Expenses
    </button>
  )
}

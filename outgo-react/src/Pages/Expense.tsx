import { useSelector } from 'react-redux'
import { RootState } from '../Redux/store'
import { useWeeklyExpenses } from '../apis/Expenses/useExpenses'

export default function Expense() {
  const { defaultProjectId } = useSelector((state: RootState) => state.user)
  const {
    data: expense,
    isLoading,
    isError,
  } = useWeeklyExpenses(defaultProjectId)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching expenses</div>
  if (expense) console.log(expense)

  return (
    <div>
      <h1>Expense</h1>
    </div>
  )
}

import { useSelector } from 'react-redux'
import { RootState } from '../Redux/store'
import { useWeeklyExpenses } from '../apis/Expenses/useExpenses'
import ExpenseTable from '../components/partialComponents/ExpenseTable'

export default function Expense() {
  const { defaultProjectId } = useSelector((state: RootState) => state.user)
  const {
    data: expense,
    isLoading,
    isError,
  } = useWeeklyExpenses(defaultProjectId)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching expenses</div>
  if (expense) {
    console.log(expense)

    return (
      <div className="mt-20 p-4 w-full h-full ">
        <div className="flex flex-col items-start justify-center rounded w-full h-full">
          <div className="flex gap-4">
            <button className="bg-teal-500 text-white  text-2xl p-2 rounded shadow-md cursor-pointer">
              Weekly Expenses
            </button>
            <button className="bg-teal-500 text-white text-2xl p-2 rounded shadow-md cursor-pointer">
              Monthly Expenses
            </button>
            <button className="bg-teal-500 text-white text-2xl p-2 rounded shadow-md cursor-pointer">
              Yearly Expenses
            </button>
            <button className="bg-teal-500 text-white text-2xl p-2 rounded shadow-md cursor-pointer">
              5 Year Expenses
            </button>
          </div>
          <div className="flex-1 bg-white w-full">
            <ExpenseTable expenses={expense} />
          </div>
        </div>
      </div>
    )
  }
}

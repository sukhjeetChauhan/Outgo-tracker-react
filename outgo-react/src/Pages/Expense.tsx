import DataTable from '../components/partialComponents/DataTable'
import { useState } from 'react'
import { Expense as ExpenseType } from '../apis/Expenses/ExpensesRepository'
import GetWeeklyExpenses from '../components/partialComponents/buttons/GetWeeklyExpenses'
import GetMonthlyExpense from '../components/partialComponents/buttons/GetMonthlyExpense'
import GetYearlyExpense from '../components/partialComponents/buttons/GetYearlyExpense'
import GetFiveYearlyExpense from '../components/partialComponents/buttons/GetFiveYearlyExpense'

export type ExpenseTimeframe = 'weekly' | 'monthly' | 'yearly' | '5 years'

export default function Expense() {
  const [expense, setExpense] = useState<ExpenseType[]>([])
  const [currentTimeframe, setCurrentTimeframe] =
    useState<ExpenseTimeframe>('weekly')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error fetching expenses</div>
  if (expense) {
    console.log(expense)

    return (
      <div className="mt-20 p-4 w-full h-full ">
        <div className="flex flex-col items-start justify-center rounded w-full h-full">
          <div className="flex gap-4">
            <GetWeeklyExpenses
              setLoading={setLoading}
              setError={setError}
              currentTimeframe={currentTimeframe}
              setCurrentTimeframe={setCurrentTimeframe}
              setExpense={setExpense}
            />
            <GetMonthlyExpense
              setLoading={setLoading}
              setError={setError}
              currentTimeframe={currentTimeframe}
              setCurrentTimeframe={setCurrentTimeframe}
              setExpense={setExpense}
            />

            <GetYearlyExpense
              setLoading={setLoading}
              setError={setError}
              currentTimeframe={currentTimeframe}
              setCurrentTimeframe={setCurrentTimeframe}
              setExpense={setExpense}
            />
            <GetFiveYearlyExpense
              setLoading={setLoading}
              setError={setError}
              currentTimeframe={currentTimeframe}
              setCurrentTimeframe={setCurrentTimeframe}
              setExpense={setExpense}
            />
          </div>
          <div className="flex-1 bg-white w-full rounded-b-lg shadow-md">
            <DataTable data={expense} />
          </div>
        </div>
      </div>
    )
  }
}

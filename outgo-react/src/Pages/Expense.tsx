import { useState } from 'react'
import DataTable from '../components/partialComponents/DataTable'
import { Expense as ExpenseType } from '../apis/Expenses/ExpensesRepository'
import GetWeeklyExpenses from '../components/partialComponents/buttons/GetWeeklyExpenses'
import GetMonthlyExpense from '../components/partialComponents/buttons/GetMonthlyExpense'
import GetYearlyExpense from '../components/partialComponents/buttons/GetYearlyExpense'
import GetFiveYearlyExpense from '../components/partialComponents/buttons/GetFiveYearlyExpense'
import FilterSelection from '../components/partialComponents/Filter/FilterSelection'
import CategorySelection from '../components/partialComponents/Filter/CategorySelection'
import DateFilter from '../components/partialComponents/Filter/DateFilter'

export type ExpenseTimeframe = 'weekly' | 'monthly' | 'yearly' | '5 years'

export default function Expense() {
  const [allExpenses, setAllExpenses] = useState<ExpenseType[]>([]) // Store original data
  const [filteredExpenses, setFilteredExpenses] = useState<ExpenseType[]>([]) // Store filtered data
  const [currentTimeframe, setCurrentTimeframe] =
    useState<ExpenseTimeframe>('weekly')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [selectedFilter, setSelectedFilter] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<string>('')

  const filterExpenses = () => {
    let filtered = allExpenses

    if (selectedFilter === 'Category' && selectedCategory !== 'None') {
      filtered = allExpenses.filter(
        (expense) => expense.category === selectedCategory
      )
    }
    if (selectedFilter === 'Date') {
      filtered = allExpenses.filter((expense) => {
        const expenseDate = new Date(expense.date).toLocaleDateString()
        const selectedFilterDate = new Date(selectedDate).toLocaleDateString()
        return expenseDate === selectedFilterDate
      })
    }

    setFilteredExpenses(filtered) // Update only filteredExpenses state
  }

  const updateExpenses = (newExpenses: ExpenseType[]) => {
    setAllExpenses(newExpenses) // Keep original data
    setFilteredExpenses(newExpenses) // Sync filtered data initially
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error fetching expenses</div>
  console.log('Filtered Expenses:', filteredExpenses)

  return (
    <div className="mt-20 p-4 w-full h-full">
      <div className="flex flex-col items-start justify-center rounded w-full h-full">
        <div className="flex sm:gap-4">
          <GetWeeklyExpenses
            setLoading={setLoading}
            setError={setError}
            currentTimeframe={currentTimeframe}
            setCurrentTimeframe={setCurrentTimeframe}
            setExpense={updateExpenses} // Pass updateExpenses function
            filteredExpenses={filterExpenses}
          />
          <GetMonthlyExpense
            setLoading={setLoading}
            setError={setError}
            currentTimeframe={currentTimeframe}
            setCurrentTimeframe={setCurrentTimeframe}
            setExpense={updateExpenses}
          />
          <GetYearlyExpense
            setLoading={setLoading}
            setError={setError}
            currentTimeframe={currentTimeframe}
            setCurrentTimeframe={setCurrentTimeframe}
            setExpense={updateExpenses}
          />
          <GetFiveYearlyExpense
            setLoading={setLoading}
            setError={setError}
            currentTimeframe={currentTimeframe}
            setCurrentTimeframe={setCurrentTimeframe}
            setExpense={updateExpenses}
          />
        </div>
        <div className="flex-1 bg-white w-full rounded-b-lg shadow-md">
          <div
            className={`w-full ${
              selectedFilter !== '' ? 'h-32' : 'h-20'
            } sm:h-20 flex flex-col sm:flex-row justify-end items-center pr-12 border-b-2 border-gray-300 gap-4`}
          >
            <div>
              {selectedFilter === 'Category' && (
                <CategorySelection
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              )}
              {selectedFilter === 'Date' && (
                <DateFilter setSelectedDate={setSelectedDate} />
              )}
            </div>
            <div className="flex gap-4 items-center">
              <FilterSelection setSelectedFilter={setSelectedFilter} />
              <button
                className="bg-teal-300 px-4 py-2 rounded text-white cursor-pointer"
                onClick={filterExpenses}
              >
                Apply
              </button>
              <button
                className="rounded-full border-2 border-teal-300 text-teal-300 font-semibold px-2 py-1"
                onClick={() => {
                  setFilteredExpenses(allExpenses)
                  setSelectedCategory('')
                  setSelectedDate('')
                  setSelectedFilter('')
                }}
              >
                X
              </button>
            </div>
          </div>
          <DataTable data={filteredExpenses} />
        </div>
      </div>
    </div>
  )
}

import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store'
import { useProjectById } from '../../../apis/Project/useProjects'
import { useMonthlyExpenses } from '../../../apis/Expenses/useExpenses'
import { useYearlyIncome } from '../../../apis/Income/useIncome'
import { useMemo } from 'react'
import { Expense } from '../../../apis/Expenses/ExpensesRepository'

export default function OverallDetails() {
  const { defaultProjectId } = useSelector((state: RootState) => state.user)
  const { data: project, isLoading: projectLoading } =
    useProjectById(defaultProjectId)
  const { data: monthlyExpenses, isLoading: monthlyExpensesLoading } =
    useMonthlyExpenses(defaultProjectId)
  const { data: yearlyIncome, isLoading: incomeLoading } =
    useYearlyIncome(defaultProjectId)

  const sortData = useMemo(() => {
    const totalMonthlyExpense = monthlyExpenses?.reduce(
      (a: number, c: Expense) => a + c.amount,
      0
    )
    const totalIncome = yearlyIncome?.reduce(
      (a: number, c: Expense) => a + c.amount,
      0
    )
    return { expense: totalMonthlyExpense, income: totalIncome }
  }, [monthlyExpenses, yearlyIncome])

  return (
    <div className="flex flex-col gap-4 w-3/4">
      <div className="flex items-center justify-between">
        <p className="lg:text-xl md: text-lg font-semibold text-red-400">
          Total Monthly Expenditure :
        </p>
        <p className="lg:text-xl md: text-lg">
          {monthlyExpensesLoading ? 'Loading' : sortData.expense}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <p className="lg:text-xl md: text-lg font-semibold text-yellow-500">
          Total Income :
        </p>
        <p className="lg:text-xl md: text-lg">
          {incomeLoading ? 'Loading' : sortData.income}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <p className="lg:text-xl md: text-lg font-semibold text-teal-800">
          Total Savings :
        </p>
        <p className="lg:text-xl md: text-lg">
          {projectLoading ? 'Loading' : project?.savings}
        </p>
      </div>
    </div>
  )
}

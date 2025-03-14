import 'chartist/dist/index.css'
import { LineChart, FixedScaleAxis } from 'chartist'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store'
import { useProjectById } from '../../../apis/Project/useProjects'
import { useMonthlyExpenses } from '../../../apis/Expenses/useExpenses'

export default function BudgetVsExpense() {
  const { defaultProjectId } = useSelector((state: RootState) => state.user)
  const { data: project, isLoading: projectLoading } =
    useProjectById(defaultProjectId)
  const { data: monthlyExpenses, isLoading: monthlyExpensesLoading } =
    useMonthlyExpenses(defaultProjectId)

  function getLastDayOfMonth(dateString: string | undefined) {
    if (dateString) {
      const date = new Date(dateString)

      // Move to the first day of the next month
      date.setMonth(date.getMonth() + 1)
      date.setDate(0) // Move back to the last day of the previous month

      return date.toISOString() // Returns in ISO format}
    }
  }
  interface Expense {
    date: string
    amount: number
  }

  const chart = useCallback(() => {
    function getExpenseData(expenses: Expense[]) {
      let sum = 0
      const sumArray = []
      for (let i = 0; i < expenses.length; i++) {
        sum += expenses[i].amount
        sumArray.push({ x: new Date(expenses[i].date), y: sum })
      }
      return sumArray
    }
    new LineChart(
      '#linechart',
      {
        series: [
          {
            name: 'Budget',
            data: [
              {
                x: new Date(monthlyExpenses[0]?.date),
                y: project?.budget,
              },
              {
                x: new Date(getLastDayOfMonth(monthlyExpenses[0]?.date) || ''),
                y: project?.budget,
              },
            ],
          },
          {
            name: 'Expenses',
            data: getExpenseData(monthlyExpenses),
          },
        ],
      },

      {
        high: project?.budget + 20000,
        // low: -10,
        axisX: {
          type: FixedScaleAxis,
          divisor: 5,
          labelInterpolationFnc: (value) =>
            new Date(value).toLocaleString(undefined, {
              month: 'short',
              day: 'numeric',
            }),
        },
      }
    )
  }, [monthlyExpenses, project?.budget])
  if (projectLoading) return <div>Loading...</div>
  if (monthlyExpensesLoading) return <div>Loading...</div>
  if (project?.budgetTimeframe !== 'Monthly') return <div>No Data</div>
  return (
    <div id="linechart" ref={chart} style={{ height: '98%', width: '100%' }} />
  )
}

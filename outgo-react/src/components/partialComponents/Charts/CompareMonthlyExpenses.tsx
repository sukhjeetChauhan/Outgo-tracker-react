import { useCallback } from 'react'
import 'chartist/dist/index.css'
import { BarChart } from 'chartist'
import { useYearlyExpenses } from '../../../apis/Expenses/useExpenses'
import { RootState } from '../../../Redux/store'
import { useSelector } from 'react-redux'

export default function CompareMonthlyExpenses() {
  const { defaultProjectId } = useSelector((state: RootState) => state.user)
  const { data: yearlyExpenses, isLoading: expenseLoading } =
    useYearlyExpenses(defaultProjectId)

  const chart = useCallback(() => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]

    interface Expense {
      date: string
      amount: number
    }

    interface ChartData {
      labels: string[]
      series: number[]
    }

    function sortData(expenses: Expense[]): ChartData {
      const monthlyExpenses = months.reduce(
        (acc: { [key: string]: number }, month) => {
          acc[month] = 0
          return acc
        },
        {}
      )
      for (let i = 0; i < expenses?.length; i++) {
        const monthIndex = new Date(expenses[i].date).getMonth() // Get the month index from the date

        monthlyExpenses[months[monthIndex]] += expenses[i].amount // Add the amount to the corresponding month
      }

      const data: ChartData = {
        labels: Object.keys(monthlyExpenses),
        series: Object.values(monthlyExpenses),
      }

      return data
    }

    new BarChart('#chart', sortData(yearlyExpenses), {
      distributeSeries: true,
    })
  }, [yearlyExpenses])

  if (expenseLoading) return <div>Loading...</div>
  return <div id="chart" ref={chart} style={{ height: '98%', width: '100%' }} />
}

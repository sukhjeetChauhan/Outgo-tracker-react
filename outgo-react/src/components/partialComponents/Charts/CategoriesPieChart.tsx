import 'chartist/dist/index.css'
import { PieChart, PieChartOptions, ResponsiveOptions } from 'chartist'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store'
import { useMonthlyExpenses } from '../../../apis/Expenses/useExpenses'
import { Expense } from '../../../apis/Expenses/ExpensesRepository'

export default function CategoryPieChart() {
  const { defaultProjectId } = useSelector((state: RootState) => state.user)
  const { data: monthlyExpenses, isLoading: monthlyExpensesLoading } =
    useMonthlyExpenses(defaultProjectId)
  const chart = useCallback(() => {
    const categories: { [key: string]: string[] } = {
      Essentials: ['Food', 'Groceries', 'Rent', 'Bills'],
      Leisure: ['Entertainment', 'Shopping'],
      Transportation: ['Car', 'Transport'],
      Business: ['Business'],
      Health: ['Health'],
      Other: ['Other'],
    }

    function sortCategoryData(expenses: Expense[]) {
      const ExpensesSum = monthlyExpenses?.reduce(
        (a: number, c: Expense) => a + c.amount,
        0
      )

      const categoryExpenses = Object.keys(categories).reduce(
        (acc: { [key: string]: number }, category) => {
          acc[category] = 0 // Initialize each category with 0
          return acc
        },
        {}
      )
      for (let i = 0; i < expenses?.length; i++) {
        const category = expenses[i].category // assigning the category value from individual expense
        for (const key in categories as { [key: string]: string[] }) {
          if (categories[key].includes(category)) { // checking if the category of the expense is in the categories object
            categoryExpenses[key] += expenses[i].amount // adding the amount of the expense to the corresponding category
          }
        }
      }

      const data = {
        labels: Object.keys(categoryExpenses),
        series: Object.values(categoryExpenses).map((value) =>
          Math.floor((value / ExpensesSum) * 100)
        ),
      }

      return data
    }

    const data = sortCategoryData(monthlyExpenses)

    console.log(data)

    const options: PieChartOptions = {
      labelInterpolationFnc: (value: string) => value,
      // labelPosition: 'inside',
    }

    const responsiveOptions: ResponsiveOptions<PieChartOptions> = [
      [
        'screen and (min-width: 640px)',
        {
          chartPadding: 30,
          labelOffset: 100,
          labelDirection: 'explode',
          labelInterpolationFnc: (value) => value,
        },
      ],
      [
        'screen and (min-width: 1024px)',
        {
          labelOffset: 80,
          chartPadding: 20,
        },
      ],
    ]

    new PieChart('#piechart', data, options, responsiveOptions)
  }, [monthlyExpenses])

  if (monthlyExpensesLoading) return <div>Loading...</div>

  return (
    <div id="piechart" ref={chart} style={{ height: '90%', width: '100%' }} />
  )
}

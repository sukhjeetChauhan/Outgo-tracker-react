import { useCallback } from 'react'
import 'chartist/dist/index.css'
import { BarChart } from 'chartist'

export default function CompareMonthlyExpenses() {
  const chart = useCallback(() => {
    new BarChart(
      '#chart',
      {
        labels: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        series: [20, 60, 120, 200, 180, 20, 10],
      },
      {
        distributeSeries: true,
      }
    )
  }, [])

  return (
    <div id="chart" ref={chart} style={{ height: '100%', width: '100%' }} />
  )
}

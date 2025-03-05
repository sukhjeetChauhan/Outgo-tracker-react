import 'chartist/dist/index.css'
import { PieChart, PieChartOptions, ResponsiveOptions } from 'chartist'
import { useCallback } from 'react'

export default function CategoryPieChart() {
  const chart = useCallback(() => {
    const data = {
      labels: ['Bananas', 'Apples', 'Grapes'],
      series: [20, 15, 40],
    }

    const options: PieChartOptions = {
      labelInterpolationFnc: (value) => String(value),
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
  }, [])

  return (
    <div id="piechart" ref={chart} style={{ height: '100%', width: '100%' }} />
  )
}

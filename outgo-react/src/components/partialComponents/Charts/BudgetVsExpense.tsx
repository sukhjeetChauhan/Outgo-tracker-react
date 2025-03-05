import 'chartist/dist/index.css'
import { LineChart, FixedScaleAxis } from 'chartist'
import { useCallback } from 'react'

export default function BudgetVsExpense() {
  const chart = useCallback(() => {
    new LineChart(
      '#linechart',
      {
        series: [
          {
            name: 'series-1',
            data: [
              { x: new Date(143134652600), y: 53 },
              { x: new Date(143234652600), y: 40 },
              { x: new Date(143340052600), y: 45 },
              { x: new Date(143366652600), y: 40 },
              { x: new Date(143410652600), y: 20 },
              { x: new Date(143508652600), y: 32 },
              { x: new Date(143569652600), y: 18 },
              { x: new Date(143579652600), y: 11 },
            ],
          },
          {
            name: 'series-2',
            data: [
              { x: new Date(143134652600), y: 53 },
              { x: new Date(143234652600), y: 35 },
              { x: new Date(143334652600), y: 30 },
              { x: new Date(143384652600), y: 30 },
              { x: new Date(143568652600), y: 10 },
            ],
          },
        ],
      },
      {
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
  }, [])
  return (
    <div id="linechart" ref={chart} style={{ height: '100%', width: '100%' }} />
  )
}

import { useSelector } from 'react-redux'
import { RootState } from '../Redux/store'
import { useYearlyIncome } from '../apis/Income/useIncome'

export default function Income() {
  const { defaultProjectId } = useSelector((state: RootState) => state.user)
  const { data: income, isLoading, isError } = useYearlyIncome(defaultProjectId)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching Income</div>
  if (income) console.log(income)

  return (
    <div>
      <h1>Income</h1>
    </div>
  )
}

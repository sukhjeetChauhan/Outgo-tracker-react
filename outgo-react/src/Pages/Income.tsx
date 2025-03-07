import { useSelector } from 'react-redux'
import { RootState } from '../Redux/store'
import { useYearlyIncome } from '../apis/Income/useIncome'
import DataTable from '../components/partialComponents/DataTable'

export default function Income() {
  const { defaultProjectId } = useSelector((state: RootState) => state.user)
  const { data: income, isLoading, isError } = useYearlyIncome(defaultProjectId)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching Income</div>
  if (income) console.log(income)

  return (
    <div className="mt-20 p-4 w-full h-full ">
      <div className="flex flex-col items-start justify-center rounded-lg w-full h-full overflow-hidden">
        <div className="flex-1 flex flex-col gap-4 p-4 bg-white w-full rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-teal-800">
            Income Details
          </h2>
          <DataTable data={income} />
        </div>
      </div>
    </div>
  )
}

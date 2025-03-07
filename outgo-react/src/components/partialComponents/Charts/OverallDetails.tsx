export default function OverallDetails() {
  return (
    <div className="flex flex-col gap-4 w-3/4">
      <div className="flex items-center justify-between">
        <p className="text-xl font-semibold text-red-400">
          Total Monthly Expenditure :
        </p>
        <p>0</p>
      </div>
      <div>
        <p className="text-xl font-semibold text-yellow-500">Total Income :</p>
      </div>
      <div>
        <p className="text-xl font-semibold text-teal-800">Total Savings :</p>
      </div>
    </div>
  )
}

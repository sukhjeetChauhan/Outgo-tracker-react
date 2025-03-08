import { useState } from 'react'
import { Expense } from '../../apis/Expenses/ExpensesRepository'
import { Income } from '../../apis/Income/IncomeRepository'

interface DataTableProps {
  data: Expense[] | Income[]
  itemsPerPage?: number
}

const DataTable = ({ data, itemsPerPage = 8 }: DataTableProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(data.length / itemsPerPage)

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = data.slice(startIndex, endIndex)

  if (data.length === 0) {
    return (
      <div className="text-center text-xl text-teal-800">No data available</div>
    )
  }

  return (
    <div className="w-full">
      {/* Render Items */}
      <ul className="">
        {currentItems.map((data, index) => (
          <li key={index} className="py-[5px] border-b-2 border-gray-300">
            <div className="flex justify-between items-center px-4">
              <span className="flex-1 text-center text-base lg:text-lg border-r-2 border-gray-300 py-2">
                {data.name}
              </span>
              <span className="flex-1 text-center text-base lg:text-lg border-l-2 border-r-2 border-gray-300 py-2">
                {data.amount}
              </span>
              <span className="flex-1 text-center text-base lg:text-lg border-l-2 border-r-2 border-gray-300 py-2">
                {new Date(data.date).toLocaleDateString('en-GB')}
              </span>
              {'category' in data && (
                <span className="flex-1 text-center text-base lg:text-lg border-l-2 border-r-2 border-gray-300 py-2">
                  {(data as Expense).category}
                </span>
              )}
              {data.timeframe && (
                <span className="flex-1 text-center text-base lg:text-lg border-l-2 border-r-2 border-gray-300 py-2">
                  {data.timeframe}
                </span>
              )}
              {'expenseType' in data && (
                <span className="flex-1 text-center text-base lg:text-lg border-l-2 border-r-2 border-gray-300 py-2">
                  {(data as Expense).expenseType}
                </span>
              )}
              {'incomeType' in data && (
                <span className="flex-1 text-center text-base lg:text-lg border-l-2 border-r-2 border-gray-300 py-2">
                  {(data as Income).incomeType}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div className="flex gap-2 justify-center mt-4">
        <button
          className="px-3 py-1 cursor-pointer bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        <button
          className="px-3 py-1  cursor-pointer bg-gray-300 rounded disabled:opacity-50"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )
}
export default DataTable

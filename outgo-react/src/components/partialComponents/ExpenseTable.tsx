import { useState } from 'react'

const ExpenseTable = ({ expenses, itemsPerPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(expenses.length / itemsPerPage)

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = expenses.slice(startIndex, endIndex)

  return (
    <div className="w-full">
      {/* Render Items */}
      <ul className="list-disc pl-5">
        {currentItems.map((expenses, index) => (
          <li key={index} className="py-1">
            {expenses.name}
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div className="flex gap-2 justify-center mt-4">
        <button
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        <button
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
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
export default ExpenseTable

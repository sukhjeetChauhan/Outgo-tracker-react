import ExpenseDashboardButton from '../components/partialComponents/buttons/ExpenseDashboardButton'
import IncomeDashboardButton from '../components/partialComponents/buttons/IncomeDashboadButton'
import BudgetVsExpense from '../components/partialComponents/Charts/BudgetVsExpense'
import CategoryPieChart from '../components/partialComponents/Charts/CategoriesPieChart'
import CompareMonthlyExpenses from '../components/partialComponents/Charts/CompareMonthlyExpenses'
import OverallDetails from '../components/partialComponents/Charts/OverallDetails'

import AddNewProjectModal from '../components/partialComponents/Modals/AddNewProjectModal'

interface DashboardProps {
  showAddProjectModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  setExpenseForm: React.Dispatch<React.SetStateAction<boolean>>
  setIncomeForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Dashboard({
  showAddProjectModal,
  setShowModal,
  setExpenseForm,
  setIncomeForm,
}: // firstName,
// lastName,
DashboardProps) {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-5px)] gap-4 w-full p-4 relative overflow-y-auto">
      {showAddProjectModal && <AddNewProjectModal />}

      <div className="border-b-2 border-gray-200 w-full h-24 rounded bg-teal-100 flex items-center justify-center">
        <div className="flex justify-around w-full items-center px-4">
          <ExpenseDashboardButton
            showForm={setExpenseForm}
            setShowModal={setShowModal}
          />
          <IncomeDashboardButton
            showForm={setIncomeForm}
            setShowModal={setShowModal}
          />
        </div>
      </div>
      <div className="w-full flex-1 flex flex-col gap-4 overflow-y-auto">
        <div className="flex flex-col gap-4 md:flex-row flex-1">
          <div className="bg-white rounded p-2 flex-1 flex flex-col items-center justify-center">
            <CompareMonthlyExpenses />
            <h3 className="text-xs">Compare total monthly expense</h3>
          </div>
          <div className="bg-white rounded p-2 flex-1 flex flex-col items-center justify-center">
            <BudgetVsExpense />
            <h3 className="text-xs">Budget vs Expense</h3>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:flex-row flex-1">
          <div className="bg-white rounded p-2 flex-1 flex flex-col items-center justify-center">
            <CategoryPieChart />
            <h3 className="text-xs">Compare Categories expenditure</h3>
          </div>
          <div className="bg-white rounded p-2 flex-1 flex flex-col items-center justify-center">
            <OverallDetails />
          </div>
        </div>
      </div>
    </div>
  )
}

import ExpenseDashboardButton from '../components/partialComponents/buttons/ExpenseDashboardButton'
import IncomeDashboardButton from '../components/partialComponents/buttons/IncomeDashboadButton'
import AddNewProjectModal from '../components/partialComponents/Modals/AddNewProjectModal'
import ProjectsList from '../components/partialComponents/ProjectsList'
import UserLabelDashboard from '../components/partialComponents/userComponents/UserLabelDashboard'

interface DashboardProps {
  showAddProjectModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  setExpenseForm: React.Dispatch<React.SetStateAction<boolean>>
  setIncomeForm: React.Dispatch<React.SetStateAction<boolean>>
  firstName: string
  lastName: string
}

export default function Dashboard({
  showAddProjectModal,
  setShowModal,
  setExpenseForm,
  setIncomeForm,
  firstName,
  lastName,
}: DashboardProps) {
  return (
    <>
      {showAddProjectModal && <AddNewProjectModal />}
      <div className="border-b-2 border-gray-200 w-full h-24 flex items-center justify-between px-4">
        <ProjectsList />

        <UserLabelDashboard firstName={firstName} lastName={lastName} />
      </div>
      <div className="border-b-2 border-gray-200 w-full h-24 rounded bg-teal-100 mb-2 flex items-center justify-center">
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
      <div className="w-full flex-1 grid grid-cols-[1fr_1fr] gap-4">
        <div className="bg-white rounded"></div>
        <div className="bg-white rounded"></div>
        <div className="bg-white rounded"></div>
        <div className="bg-white rounded"></div>
      </div>
    </>
  )
}

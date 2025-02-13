import { useMsal } from '@azure/msal-react'
import { useDispatch, useSelector } from 'react-redux'
import LoginButton from '../components/userComponents/LoginButton'
// import PasswordReset from '../components/userComponents/PasswordReset'
import { fetchUser } from '../Redux/Slices/userSlice'
import { RootState, AppDispatch } from '../Redux/store'
import { useEffect, useState } from 'react'
import LogoutButton from '../components/userComponents/LogoutButton'
import Menubar from '../components/Menubar'
import ProjectsList from '../components/partialComponents/ProjectsList'
import UserLabelDashboard from '../components/userComponents/UserLabelDashboard'
import IncomeDashboardButton from '../components/partialComponents/buttons/IncomeDashboadButton'
import ExpenseDashboardButton from '../components/partialComponents/buttons/ExpenseDashboardButton'
import FormModal from '../components/partialComponents/Modals/FormModal'
import IncomeForm from '../components/partialComponents/Forms/AddIncomeForm'
// import fetchData from '../assets/apis/fetchapi'

export default function Home() {
  const { instance, accounts } = useMsal()
  const dispatch = useDispatch<AppDispatch>()
  const { firstName, lastName } = useSelector((state: RootState) => state.user)
  const [retractMenu, setRetractMenu] = useState(false)

  useEffect(() => {
    dispatch(fetchUser({ accounts, instance }))
  }, [dispatch, accounts, instance])

  // if (status === 'loading') return <p>Loading user...</p>
  // if (status === 'failed') return <p>Error fetching user</p>

  return (
    <div className="w-full min-h-screen bg-gray-200">
      <FormModal>
        <IncomeForm />
      </FormModal>
      <div className="flex w-full mx-auto">
        <div>
          <div className="bg-teal-300 h-screen flex flex-col items-center ">
            <div className="h-24">
              <h2 className="text-white font-semibold text-2xl flex items-center justify-center h-full">
                Outgo
              </h2>
            </div>
            <div className="flex-1 border-t-2 border-gray-200 relative">
              <Menubar retractMenu={retractMenu} />
              <button
                className="px-[7px] py-[1px] rounded-full bg-white text-teal-300 text-3xl font-bold absolute -right-4 -top-4 text-center"
                onClick={() => setRetractMenu(!retractMenu)}
              >
                {retractMenu ? '>' : '<'}
              </button>
            </div>
            <div className="border-t-2 border-gray-200 flex flex-col gap-4 items-center p-4 my-4 w-full">
              <LoginButton />
              <LogoutButton />
            </div>
          </div>
        </div>
        <div className="min-h-screen flex-1 flex flex-col items-center p-4">
          <div className="border-b-2 border-gray-200 w-full h-24 flex items-center justify-between px-4">
            <ProjectsList />
            <UserLabelDashboard firstName={firstName} lastName={lastName} />
          </div>
          <div className="border-b-2 border-gray-200 w-full h-24 rounded bg-teal-100 mb-2 flex items-center justify-center">
            <div className="flex justify-around w-full items-center px-4">
              <ExpenseDashboardButton />
              <IncomeDashboardButton />
            </div>
          </div>
          <div className="w-full flex-1 grid grid-cols-[1fr_1fr] gap-4">
            <div className="bg-white rounded"></div>
            <div className="bg-white rounded"></div>
            <div className="bg-white rounded"></div>
            <div className="bg-white rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

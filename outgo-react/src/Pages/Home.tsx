import { useMsal } from '@azure/msal-react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../Redux/Slices/userSlice'
import { RootState, AppDispatch } from '../Redux/store'
import { useEffect, useState } from 'react'
import LogoutButton from '../components/partialComponents/userComponents/LogoutButton'
import Menubar from '../components/Menubar'
import FormModal from '../components/partialComponents/Modals/FormModal'
import AddIncomeForm from '../components/partialComponents/Forms/AddIncomeForm'
import AddExpenseForm from '../components/partialComponents/Forms/AddExpenseFrom'
import {
  useCreateUser,
  // useUpdateUser,
  useUsersById,
} from '../apis/Users/useUsers'
import { setDefaultProjectId } from '../Redux/Slices/userSlice'
import Dashboard from './Dashboard'
import { useLocation, Outlet } from 'react-router-dom'
import ProjectDashboardName from '../components/partialComponents/projectPartials/ProjectDashboardName'
import UserLabelDashboard from '../components/partialComponents/userComponents/UserLabelDashboard'

export default function Home() {
  const { instance, accounts } = useMsal() // Get the MSAL instance and accounts

  const dispatch = useDispatch<AppDispatch>()
  const { id, firstName, lastName } = useSelector(
    (state: RootState) => state.user // Get user details from Redux store
  )
  const [retractMenu, setRetractMenu] = useState(false) // State to control the retractable menu
  const [showModal, setShowModal] = useState(false) // State to control the modal visibility
  const [IncomeForm, setIncomeForm] = useState(false) // State to control the income form visibility
  const [ExpenseForm, setExpenseForm] = useState(false) // State to control the expense form visibility
  const [showAddProjectModal, SetShowAddProjectModal] = useState(false) // State to control the add project modal visibility
  const [showMenu, setShowMenu] = useState(false) // State to show/hide menu for smaller screens.

  const location = useLocation()
  // const { mutate: updateUser } = useUpdateUser()

  useEffect(() => {
    dispatch(fetchUser({ accounts, instance }))
  }, [dispatch, accounts, instance]) // Fetch user details when component mounts or accounts/instance change

  const { data: user, isLoading: userLoading } = useUsersById(
    id as unknown as string
  )
  const { mutate: createUser } = useCreateUser()
  // dispatch(setDefaultProjectId(null)) // to fix production errors
  // if (id) {
  //   updateUser({
  //     id: id,
  //     user: {
  //       id: id,
  //       firstName: firstName,
  //       lastName: lastName,
  //       email: '',
  //       phoneNumber: '',
  //       defaultProjectId: null,
  //     },
  //   })
  // }

  useEffect(() => {
    // Check if user exists and has a default project Id, if not prompt to add a project
    if (id) {
      if (user) {
        if (user.defaultProjectId === null) {
          console.log('User has no default project')
          dispatch(setDefaultProjectId(null)) // Reset default project ID in Redux store
          SetShowAddProjectModal(true) // prompt to add a project
        } else {
          dispatch(setDefaultProjectId(user.defaultProjectId))
        }
      } else {
        if (!userLoading) {
          console.log('User not found')

          // This block runs if the user is not found in the database
          const newUser = {
            id: id,
            firstName: firstName,
            lastName: lastName,
            email: '',
            phoneNumber: '',
            defaultProjectId: null,
          }
          createUser(newUser, {
            onSuccess: (data) => {
              console.log('User created', data)
              SetShowAddProjectModal(true)
            },
            onError: (error) => {
              console.log('Error creating user', error)
            },
          })
        }
      }
    }
  }, [user, id, firstName, lastName, createUser, userLoading, dispatch])

  return (
    <div className="w-full min-h-screen bg-gray-200">
      {showModal && (
        <FormModal>
          {IncomeForm && (
            <AddIncomeForm
              setShowModal={setShowModal}
              setIncomeForm={setIncomeForm}
            />
          )}
          {ExpenseForm && (
            <AddExpenseForm
              setShowModal={setShowModal}
              setExpenseForm={setExpenseForm}
            />
          )}
        </FormModal>
      )}
      <div className="flex w-full">
        <div
          className={`border-r-2 border-gray-200 shadow-inner absolute sm:static ${
            showMenu ? 'left-0' : '-left-100'
          } z-900 transition-all duration-300 ease-in-out`}
        >
          <div className="bg-teal-400 h-screen flex flex-col items-center ">
            <div className="h-20 bg-teal-500 w-full">
              <h2 className="text-white font-semibold text-2xl flex items-center justify-center h-full">
                Outgo
              </h2>
            </div>
            <div className="flex-1 border-t-2 border-gray-200 relative">
              <Menubar retractMenu={retractMenu} />
              <button
                className="px-[7px] py-[1px] rounded-full bg-white text-teal-300 text-3xl font-bold absolute -right-4 -top-4 text-center z-900 hidden sm:block"
                onClick={() => setRetractMenu(!retractMenu)}
              >
                {retractMenu ? '>' : '<'}
              </button>
            </div>
            <div className="border-t-2 border-gray-200 flex flex-col gap-4 items-center p-4 my-4 w-full">
              <LogoutButton />
            </div>
          </div>
        </div>
        <div className="min-h-screen flex-1 flex flex-col items-center relative">
          <div className="border-b-2 border-gray-200 w-full h-20 flex items-center justify-between px-4 bg-teal-500 absolute top-0 left-0 right-0 z-99">
            <ProjectDashboardName />
            <img
              src="/menu.png"
              alt="Hamburger menu"
              className="w-16 h-16 sm:hidden z-900"
              onClick={() => setShowMenu(!showMenu)}
            />
            <UserLabelDashboard firstName={firstName} lastName={lastName} />
          </div>
          {location.pathname == '/' ? (
            <Dashboard
              showAddProjectModal={showAddProjectModal}
              setShowModal={setShowModal}
              setExpenseForm={setExpenseForm}
              setIncomeForm={setIncomeForm}
            />
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  )
}

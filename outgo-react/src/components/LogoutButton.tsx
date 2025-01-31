import { useMsal } from '@azure/msal-react'
import { useDispatch } from 'react-redux'
import { logout } from '../Redux/Slices/userSlice'

export default function LogoutButton() {
  const { instance } = useMsal()
  const dispatch = useDispatch()

  const handleLogout = () => {
    instance.logoutPopup()
    dispatch(logout())
  }

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => {
        handleLogout()
      }}
    >
      Logout
    </button>
  )
}

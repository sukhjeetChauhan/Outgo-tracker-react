import { useMsal } from '@azure/msal-react'
import { useDispatch } from 'react-redux'
import { logout } from '../../../Redux/Slices/userSlice'

export default function LogoutButton() {
  const { instance } = useMsal()
  const dispatch = useDispatch()

  const handleLogout = () => {
    instance.logoutPopup()
    dispatch(logout())
  }

  return (
    <button
      className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded w-full"
      onClick={() => {
        handleLogout()
      }}
    >
      Logout
    </button>
  )
}

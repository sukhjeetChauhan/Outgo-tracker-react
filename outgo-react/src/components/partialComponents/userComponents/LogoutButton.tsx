import { useMsal } from '@azure/msal-react'
import { useDispatch } from 'react-redux'
import { logout } from '../../../Redux/Slices/userSlice'
// import { useNavigate } from 'react-router-dom'

export default function LogoutButton() {
  const { instance } = useMsal()
  const dispatch = useDispatch()
  // const navigate = useNavigate()

  const handleLogout = async () => {
    await instance.logoutRedirect({
      postLogoutRedirectUri: window.location.origin + '/login', // Ensure redirect after logout
    })
    dispatch(logout()) // Clear Redux FIRST
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

import { useMsal } from '@azure/msal-react'
import LoginButton from '../components/partialComponents/userComponents/LoginButton'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Login = () => {
  const { accounts } = useMsal()
  const navigate = useNavigate()

  useEffect(() => {
    if (accounts.length > 0) {
      console.log('User is logged in:', accounts[0])
      navigate('/') // Redirect to homepage if logged in
    }
  }, [accounts, navigate])

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <LoginButton />
    </div>
  )
}

export default Login

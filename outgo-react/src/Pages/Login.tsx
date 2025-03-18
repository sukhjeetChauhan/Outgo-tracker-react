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
    <div className="flex flex-col sm:flex-row h-screen w-screen items-center justify-center">
      <div className="h-3/5 sm:h-full w-full sm:w-3/5 bg-teal-400 flex flex-col items-center justify-center gap-12 sm:gap-20">
        <h2 className=" text-3xl sm:text-5xl font-bold text-white">
          Welcome to Outgo Tracker
        </h2>
        <img
          className="w-7/8 sm:w-4/6 sm:h-96 rounded-lg overflow-hidden"
          src="/LoginPagePic.jpg"
          alt="illustration depicting managing expenses"
        />
      </div>

      <div className="flex flex-col items-center justify-center  h-2/5 sm:h-screen w-full sm:w-2/5 gap-8">
        <h2 className="text-2xl sm:text-3xl font-bold  text-teal-500 mb-4">
          Lets get your Expenses sorted!
        </h2>
        <LoginButton />
      </div>
    </div>
  )
}

export default Login

import { useMsal } from '@azure/msal-react'
import LoginButton from '../components/LoginButton'
import PasswordReset from '../components/PasswordReset'
import fetchData from '../assets/apis/fetchapi'

export default function Home() {
  const { instance, accounts } = useMsal()

  const handleLogout = () => {
    instance.logoutPopup()
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-4xl text-center text-blue-500 font-bold mt-10">
        Welcome to Outgo
      </h1>
      {accounts.length > 0 ? (
        <div>
          <p>Welcome, {accounts[0].name}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <LoginButton />
      )}
      <PasswordReset />
      <button onClick={() => fetchData(instance, accounts)}>Click</button>
    </div>
  )
}

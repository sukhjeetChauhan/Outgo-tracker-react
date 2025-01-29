import { useMsal } from '@azure/msal-react'
import LoginButton from '../components/LoginButton'

export default function Home() {
  const { instance, accounts } = useMsal()

  const handleLogout = () => {
    instance.logoutPopup()
  }

  console.log(accounts)
  return (
    <>
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
    </>
  )
}

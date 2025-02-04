import { useMsal } from '@azure/msal-react'

export default function LoginButton() {
  const { instance } = useMsal()

  const handleLogin = () => {
    instance.loginPopup().catch((error) => {
      console.error('Login failed:', error)
    })
  }

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => {
        handleLogin()
      }}
    >
      Login
    </button>
  )
}

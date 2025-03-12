import { useMsal } from '@azure/msal-react'

export default function LoginButton() {
  const { instance } = useMsal()

  const handleLogin = () => {
    instance.loginRedirect().catch((error) => {
      console.error('Login failed:', error)
    })
  }

  return (
    <button
      className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded w-48 cursor-pointer"
      onClick={() => {
        handleLogin()
      }}
    >
      Login
    </button>
  )
}

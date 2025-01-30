import { useMsal } from '@azure/msal-react'
import { passwordResetAuthority } from '../authentication/authConfig'

export default function LoginButton() {
  const { instance } = useMsal()

  const handlePasswordReset = () => {
    instance.loginRedirect({
      authority: passwordResetAuthority,
      scopes: [],
    })
  }

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => {
        handlePasswordReset()
      }}
    >
      Reset Password
    </button>
  )
}

import { useMsal } from '@azure/msal-react'
import { passwordResetAuthority } from '../../../authentication/authConfig'

export default function PasswordReset() {
  const { instance } = useMsal()

  const handlePasswordReset = () => {
    instance.loginRedirect({
      authority: passwordResetAuthority,
      scopes: [],
    })
  }

  return (
    <button
      className="bg-white hover:bg-teal-100 text-teal-500 hover:text-teal-700 font-bold py-2 px-4 rounded cursor-pointer"
      onClick={() => {
        handlePasswordReset()
      }}
    >
      Reset Password
    </button>
  )
}

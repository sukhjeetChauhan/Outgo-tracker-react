import { useMsal } from '@azure/msal-react'
import { useDispatch, useSelector } from 'react-redux'
import LoginButton from '../components/LoginButton'
import PasswordReset from '../components/PasswordReset'
import { fetchUser } from '../Redux/Slices/userSlice'
import { RootState, AppDispatch } from '../Redux/store'
import { useEffect } from 'react'
import LogoutButton from '../components/LogoutButton'
// import fetchData from '../assets/apis/fetchapi'

export default function Home() {
  const { instance, accounts } = useMsal()
  const dispatch = useDispatch<AppDispatch>()
  const { id, firstName, lastName } = useSelector(
    (state: RootState) => state.user
  )

  useEffect(() => {
    dispatch(fetchUser({ accounts, instance }))
  }, [dispatch, accounts, instance])

  if (status === 'loading') return <p>Loading user...</p>
  if (status === 'failed') return <p>Error fetching user</p>

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-4xl text-center text-blue-500 font-bold mt-10">
        Welcome to Outgo
      </h1>
      {accounts.length > 0 ? (
        <div>
          <div>
            <p>{`Id: ${id}`}</p>
            <p>Welcome, {`${firstName} ${lastName}`}</p>
          </div>
          <LogoutButton />
        </div>
      ) : (
        <LoginButton />
      )}
      <PasswordReset />
      {/* <button onClick={() => GetUserInfo(accounts, instance)}>Click</button> */}
    </div>
  )
}

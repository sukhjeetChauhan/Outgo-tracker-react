import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import GetUserInfo from '../../authentication/ADB2Chelpers/getUserInfo' // Import your API function
import { AccountInfo, IPublicClientApplication } from '@azure/msal-browser'

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async ({
    accounts,
    instance,
  }: {
    accounts: AccountInfo[]
    instance: IPublicClientApplication
  }) => {
    const userInfo = await GetUserInfo(accounts, instance)
    if (!userInfo) throw new Error('User not found')
    return userInfo
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    firstName: '',
    lastName: '',
    status: 'idle',
    error: null as string | null,
  },
  reducers: {
    logout: (state) => {
      state.id = null
      state.firstName = ''
      state.lastName = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.id = action.payload.id
        state.firstName = action.payload.firstName
        state.lastName = action.payload.lastName
        state.status = 'succeeded'
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Failed to fetch user'
      })
  },
})

export const { logout } = userSlice.actions
export default userSlice.reducer

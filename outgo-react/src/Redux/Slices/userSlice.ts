import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import GetUserInfo from '../../authentication/ADB2Chelpers/getUserInfo'
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

interface UserState {
  id: string | null
  firstName: string
  lastName: string
  status: string
  defaultProjectId: number | null
  error: string | null
}

const initialState: UserState = {
  id: null,
  firstName: '',
  lastName: '',
  status: 'idle',
  defaultProjectId: null,
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.id = null
      state.firstName = ''
      state.lastName = ''
      state.defaultProjectId = null
    },
    setDefaultProjectId: (state, action: PayloadAction<number | null>) => {
      state.defaultProjectId = action.payload
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

export const { logout, setDefaultProjectId } = userSlice.actions
export default userSlice.reducer

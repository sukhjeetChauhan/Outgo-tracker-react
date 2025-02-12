import { IPublicClientApplication, AccountInfo } from '@azure/msal-browser'

// const apiUrl = 'http://localhost:5298/api'

export interface ReturnType {
  token: string
  tokenOptions: {
    headers: {
      Authorization: string
    }
    withCredentials: boolean
  }
}

type Instance = IPublicClientApplication
type Account = AccountInfo

const fetchBackendToken = async (
  instance: Instance,
  accounts: Account[]
): Promise<ReturnType | string> => {
  try {
    const response = await instance.acquireTokenSilent({
      scopes: [
        'https://Outgoorg.onmicrosoft.com/b59a8e85-5b1a-4530-8c77-ada60c7f62ce/user.read',
      ],
      account: accounts[0],
    })

    const token = response.accessToken

    const tokenOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true, // 🔹 Important for CORS
    }

    return { token, tokenOptions }
  } catch (error) {
    console.error('Error fetching data:', error)
    return `Error fetching data: ${error}`
  }
}

export default fetchBackendToken

import { IPublicClientApplication, AccountInfo } from '@azure/msal-browser'

const apiUrl = 'http://localhost:5298/api'

type Instance = IPublicClientApplication
type Account = AccountInfo

const fetchData = async (
  instance: Instance,
  accounts: Account[]
): Promise<void> => {
  try {
    const response = await instance.acquireTokenSilent({
      scopes: [
        'https://Outgoorg.onmicrosoft.com/b59a8e85-5b1a-4530-8c77-ada60c7f62ce/user.read',
      ],
      account: accounts[0],
    })

    const token = response.accessToken
    console.log('Token:', token)

    const apiResponse = await fetch(`${apiUrl}/protected`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include', // 🔹 Important for CORS
    })

    const data = await apiResponse.json()
    console.log(data)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

export default fetchData

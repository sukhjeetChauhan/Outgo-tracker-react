import { AccountInfo, IPublicClientApplication } from '@azure/msal-browser'

const GetUserInfo = async (
  accounts: AccountInfo[],
  instance: IPublicClientApplication
) => {
  if (accounts.length === 0) return

  try {
    const response = await instance.acquireTokenSilent({
      scopes: ['openid', 'profile'], // 🔹 Ensures we get ID Token claims
      account: accounts[0],
    })

    const idToken = response.idToken // 🔹 Get the ID Token
    console.log('ID Token:', idToken)

    // Decode JWT Token
    const decodedToken = JSON.parse(atob(idToken.split('.')[1]))

    const id = decodedToken.sub
    const firstName = decodedToken.given_name
    const lastName = decodedToken.family_name

    return { id, firstName, lastName }
  } catch (error) {
    console.error('Error getting user info:', error)
  }
}

export default GetUserInfo

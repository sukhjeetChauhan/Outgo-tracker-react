import { AccountInfo, IPublicClientApplication } from '@azure/msal-browser'

const GetUserInfo = async (
  accounts: AccountInfo[],
  instance: IPublicClientApplication
) => {
  try {
    // 🔹 Ensure MSAL is initialized
    if (!instance.getActiveAccount()) {
      await instance.initialize()
    }

    // 🔹 Use the passed `accounts` argument if available, otherwise get from instance
    const account =
      accounts.length > 0 ? accounts[0] : instance.getAllAccounts()[0]

    if (!account) {
      console.error('No active accounts found.')
      return null
    }

    const response = await instance.acquireTokenSilent({
      scopes: ['openid', 'profile'], // 🔹 Ensures we get ID Token claims
      account: account,
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
    return null
  }
}

export default GetUserInfo

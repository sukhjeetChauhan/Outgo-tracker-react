import {
  AccountInfo,
  IPublicClientApplication,
  InteractionRequiredAuthError,
} from '@azure/msal-browser'

const GetUserInfo = async (
  accounts: AccountInfo[],
  instance: IPublicClientApplication
) => {
  try {
    // Ensure MSAL is initialized properly
    if (!instance.getActiveAccount()) {
      await instance.initialize()
    }

    // Get the account from passed arguments or from instance
    const account =
      accounts.length > 0 ? accounts[0] : instance.getAllAccounts()[0]

    if (!account) {
      console.warn('No active accounts found. Redirecting to login.')
      await instance.loginRedirect({ scopes: ['openid', 'profile'] }) // 🚀 Interactive login as a fallback
      return null
    }

    try {
      // Attempt to acquire token silently
      const response = await instance.acquireTokenSilent({
        scopes: ['openid', 'profile'],
        account: account,
      })

      const idToken = response.idToken
      console.log('ID Token:', idToken)

      // Decode JWT Token
      const decodedToken = JSON.parse(atob(idToken.split('.')[1]))

      const id = decodedToken.sub
      const firstName = decodedToken.given_name
      const lastName = decodedToken.family_name

      return { id, firstName, lastName }
    } catch (error) {
      // Handle session expiration by triggering login again
      if (error instanceof InteractionRequiredAuthError) {
        console.warn('Session expired. Re-authenticating...')
        await instance.loginPopup({ scopes: ['openid', 'profile'] }) // 🚀 Prompt login
        return null
      }
      throw error
    }
  } catch (error) {
    console.error('Error getting user info:', error)
    return null
  }
}

export default GetUserInfo

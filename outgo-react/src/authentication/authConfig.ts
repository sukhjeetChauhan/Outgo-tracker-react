import { PublicClientApplication, LogLevel } from '@azure/msal-browser'

export const baseUrl = import.meta.env.VITE_BASE_FRONTEND_URL
const clientID = import.meta.env.VITE_AD_B2C_CLIENTID
const authority = import.meta.env.VITE_AD_B2C_AUTHORITY
const knownAuthorities = import.meta.env.VITE_AD_B2C_KnownAuthority
const passwordResetAuth = import.meta.env.VITE_AD_B2C_PasswordResetAuthority

const msalConfig = {
  auth: {
    clientId: `${clientID}`, // Found in Azure AD B2C > App Registrations
    authority: `${authority}`, // Replace with your SignUpSignIn flow
    redirectUri: `${baseUrl}/`, // Change this based on your environment
    knownAuthorities: [`${knownAuthorities}`],
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: true, // Set to `true` if you face issues in IE11
  },
  system: {
    loggerOptions: {
      loggerCallback: (_: LogLevel, message: string) => {
        console.log(message)
      },
      logLevel: LogLevel.Info,
      piiLoggingEnabled: false,
    },
  },
}

// Define a separate authority for password reset
export const passwordResetAuthority = `${passwordResetAuth}`

// Create MSAL instance
export const msalInstance = new PublicClientApplication(msalConfig)

export const initializeMsal = async () => {
  await msalInstance.initialize() // Ensure MSAL is initialized before use
}

import { PublicClientApplication, LogLevel } from '@azure/msal-browser'

const msalConfig = {
  auth: {
    clientId: 'e1e219ab-2f9f-4349-bdf9-7fc6600e177f', // Found in Azure AD B2C > App Registrations
    authority:
      'https://Outgoorg.b2clogin.com/Outgoorg.onmicrosoft.com/B2C_1_SignUpSignIn', // Replace with your SignUpSignIn flow

    redirectUri: 'http://localhost:5173/', // Change this based on your environment
    knownAuthorities: ['Outgoorg.b2clogin.com'],
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

// 🔹 Define a separate authority for password reset
export const passwordResetAuthority =
  'https://Outgoorg.b2clogin.com/Outgoorg.onmicrosoft.com/B2C_1_passReset'

// Create MSAL instance
export const msalInstance = new PublicClientApplication(msalConfig)

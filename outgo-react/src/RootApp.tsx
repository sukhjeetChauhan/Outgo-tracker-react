import { useEffect, useState } from 'react'
import { initializeMsal, msalInstance } from './authentication/authConfig'
import { MsalProvider } from '@azure/msal-react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './Redux/store'
import App from './App'

const RootApp = () => {
  const [isMsalReady, setIsMsalReady] = useState(false)

  useEffect(() => {
    initializeMsal().then(() => setIsMsalReady(true))
  }, [])

  if (!isMsalReady) {
    return <div>Loading authentication...</div>
  }

  return (
    <MsalProvider instance={msalInstance}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </MsalProvider>
  )
}

export default RootApp

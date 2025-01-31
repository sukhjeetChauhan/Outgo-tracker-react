import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { msalInstance } from './authentication/authConfig.ts'
import { MsalProvider } from '@azure/msal-react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './Redux/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <MsalProvider instance={msalInstance}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </MsalProvider>
    </BrowserRouter>
  </StrictMode>
)

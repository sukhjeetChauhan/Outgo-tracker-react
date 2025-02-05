import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { msalInstance } from './authentication/authConfig.ts'
import { MsalProvider } from '@azure/msal-react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './Redux/store.ts'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <MsalProvider instance={msalInstance}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <App />
            </PersistGate>
          </Provider>
        </MsalProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
)

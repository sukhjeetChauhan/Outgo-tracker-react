import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { msalInstance } from './authentication/authConfig.ts'
import { MsalProvider } from '@azure/msal-react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <MsalProvider instance={msalInstance}>
        <App />
      </MsalProvider>
    </BrowserRouter>
  </StrictMode>
)

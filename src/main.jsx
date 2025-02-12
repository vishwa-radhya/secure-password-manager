import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import '@fontsource/poppins'
import { UserAuthProvider } from './contexts/user-auth.context.jsx'
import { ToastProvider } from './contexts/toast-context.context.jsx'
import { GlobalDataProvider } from './contexts/global-data.context.jsx'

createRoot(document.getElementById('root')).render(
  <UserAuthProvider>
  <GlobalDataProvider>
  <ToastProvider>
  <BrowserRouter>
  <StrictMode>
    <App />
  </StrictMode>
  </BrowserRouter>
  </ToastProvider>
  </GlobalDataProvider>
  </UserAuthProvider>,
)

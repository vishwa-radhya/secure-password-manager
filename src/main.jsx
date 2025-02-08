import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import '@fontsource/poppins'
import { UserAuthProvider } from './contexts/user-auth.context.jsx'

createRoot(document.getElementById('root')).render(
  <UserAuthProvider>
  <BrowserRouter>
  <StrictMode>
    <App />
  </StrictMode>
  </BrowserRouter>
  </UserAuthProvider>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AppProvider } from './context/AppContext.tsx'
export const authservice = "http://localhost:5001"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="12678720443-52qpi8u5umeo9jnupq4qnvmn54sio09d.apps.googleusercontent.com">
      <AppProvider>
        <App />
      </AppProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)

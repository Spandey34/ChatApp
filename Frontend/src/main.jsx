import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthProvider.jsx'
import { BrowserRouter } from 'react-router-dom'
import { SelectedUserContext, SelectedUserProvider } from './context/SelectedUserProvider.jsx'
import { MessageProvider } from './context/MessageProvider.jsx'
import { LoadingProvider } from './context/LoadingProvider.jsx'
import { SocketProvider } from './context/SocketContext.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter >
   <SelectedUserProvider>
    <LoadingProvider>
      <AuthProvider>
      <MessageProvider>
        <SocketProvider >
          <App />
        </SocketProvider>
      </MessageProvider> 
    </AuthProvider>
    </LoadingProvider>
   </SelectedUserProvider>
  </BrowserRouter>
  
)

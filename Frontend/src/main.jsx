import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import ViewContextProvider from './context/ViewContextProvider'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ViewContextProvider>
      <App />
    </ViewContextProvider>
  </StrictMode>,
)

import { Theme } from '@radix-ui/themes'
import "@radix-ui/themes/styles.css"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import ViewContextProvider from './context/ViewContextProvider'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ViewContextProvider>
      <Theme>
        <App />
      </Theme>
    </ViewContextProvider>
  </StrictMode>,
)

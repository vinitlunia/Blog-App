import { createRoot } from 'react-dom/client'
import './index.css'
import App from '../src/App'
import { BrowserRouter } from 'react-router-dom'
import  AuthProvider  from "./context/AuthProvider";



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
)
  
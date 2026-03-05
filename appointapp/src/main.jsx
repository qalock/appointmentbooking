import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import 'mdbootstrap/css/mdb.css';
import 'mdbootstrap/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RouterApp from './Routes'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterApp/>
  </StrictMode>,
)

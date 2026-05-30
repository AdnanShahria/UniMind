import React from 'react'
import ReactDOM from 'react-dom/client'
import IndexApp from './apps/IndexApp.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <IndexApp />
  </React.StrictMode>,
)

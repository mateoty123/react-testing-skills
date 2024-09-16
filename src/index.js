import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import i18n from './i18n'
import './index.css'
import { createRoot } from 'react-dom/client'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <App />
  </StrictMode>
)

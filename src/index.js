import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import './styles/null.scss'
import './styles/main.scss'
import App from './App'

const root = ReactDOM.createRoot( document.getElementById( 'root' ) )
root.render(
   <BrowserRouter>
      <App/>
   </BrowserRouter>
)


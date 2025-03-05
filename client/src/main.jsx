import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Router from './routes/routes.jsx'
import { ApolloProvider } from '@apollo/client'
import { Client } from './Apollo/ApolloClient.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={Client}>
      <BrowserRouter>
        <Router/>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>
)

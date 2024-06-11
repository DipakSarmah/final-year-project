import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'

import './styles/tailwind.css'
import './styles/custom.css'
// import { AppContextProvider } from './context/AppContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
})
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <AppContextProvider> */}
      <App />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      {/* </AppContextProvider> */}
    </QueryClientProvider>
  </React.StrictMode>
)

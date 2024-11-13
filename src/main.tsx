import React from 'react'
import './index.css'
import AppRoutes from './AppRoutes'
import store from './app/store/store'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { Toaster } from '@/components/ui/toaster'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_AUTH_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <Routes>
              <Route path="/*" element={<AppRoutes />} />
            </Routes>
            <Toaster />
          </Provider>
        </QueryClientProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)

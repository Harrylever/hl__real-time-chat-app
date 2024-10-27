import React from 'react'
import './index.css'
import AppRoutes from './AppRoutes'
import store from './app/store/store'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { Toaster } from '@/components/ui/toaster'
import { AuthRouteController } from './components/tools'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Provider store={store}>
          <AuthRouteController>
            <Routes>
              <Route path="/*" element={<AppRoutes />} />
            </Routes>
          </AuthRouteController>
          <Toaster />
        </Provider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)

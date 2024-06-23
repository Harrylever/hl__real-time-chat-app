import React from 'react'
import './index.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import AppRoutes from './AppRoutes'
import store from './app/store/store'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { Toaster } from '@/components/ui/toaster'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
  //  SocketClient
  AuthRouteController,
} from './components/tools'

AOS.init({
  duration: 800,
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthRouteController>
          {/* <SocketClient /> */}
          <Routes>
            <Route path="/*" element={<AppRoutes />} />
          </Routes>
        </AuthRouteController>
        <Toaster />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import AppRoutes from './AppRoutes';
import { Provider } from 'react-redux';
import store from './app/store/store';
import AuthRouteController from './components/tools/AuthRouteController';
import { GoogleOAuthProvider } from '@react-oauth/google';

AOS.init({
  duration: 800,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_KEY}>
      <BrowserRouter>
        <Provider store={store}>
          <AuthRouteController />
          <Routes>
            <Route path="/*" element={<AppRoutes />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)


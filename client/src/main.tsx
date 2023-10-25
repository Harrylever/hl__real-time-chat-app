import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import AppRoutes from './AppRoutes';
import { Provider } from 'react-redux';
import store from './app/store/store';

AOS.init({
  duration: 800,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/*" element={<AppRoutes />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)


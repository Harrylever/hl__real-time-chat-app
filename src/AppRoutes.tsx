import Layout from './components/layout/Layout'
import { Routes, Route } from 'react-router-dom'
import {
  Landing,
  LoginView,
  NotFoundView,
  RegisterView,
  ApplicationView,
  Terms,
} from './views'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Landing />} />
        <Route path="app" element={<ApplicationView />} />
        <Route path="register" element={<RegisterView />} />
        <Route path="login" element={<LoginView />} />
        <Route path="terms" element={<Terms />} />
      </Route>
      <Route path="*" element={<NotFoundView />} />
    </Routes>
  )
}

import Layout from './components/layout/Layout'
import { Routes, Route, Navigate } from 'react-router-dom'
import {
  Landing,
  AppView,
  LoginView,
  NotFoundView,
  RegisterView,
  Terms,
} from './views'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Landing />} />
        <Route path="app" element={<AppView />} />
        <Route path="app/*" element={<Navigate to="/app" replace />} />
        <Route path="auth/register" element={<RegisterView />} />
        <Route path="auth/login" element={<LoginView />} />
        <Route path="terms" element={<Terms />} />
      </Route>
      <Route path="*" element={<NotFoundView />} />
    </Routes>
  )
}

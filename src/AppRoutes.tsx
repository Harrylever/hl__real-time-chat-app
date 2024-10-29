import Layout from './components/layout/Layout'
import { Routes, Route } from 'react-router-dom'
import {
  Landing,
  AppView,
  LoginView,
  NotFoundView,
  RegisterView,
  Terms,
} from './views'
import { useAppSelector } from './app'

export default function AppRoutes() {
  const { user } = useAppSelector((state) => state.userReduce)

  return (
    <Routes>
      <Route path="/" element={<Layout user={user} />}>
        <Route path="" element={<Landing user={user} />} />
        <Route path="app" element={<AppView user={user} />} />
        <Route path="auth/register" element={<RegisterView />} />
        <Route path="auth/login" element={<LoginView />} />
        <Route path="terms" element={<Terms />} />
      </Route>
      <Route path="*" element={<NotFoundView />} />
    </Routes>
  )
}

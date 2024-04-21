import Layout from './components/layout/Layout';
import { Routes, Route } from 'react-router-dom';
import {
  Landing,
  ChatView,
  LoginView,
  NotFoundView,
  RegisterView,
} from './views';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Landing />} />
        <Route path="app" element={<ChatView />} />
        <Route path="register" element={<RegisterView />} />
        <Route path="login" element={<LoginView />} />
      </Route>
      <Route path="*" element={<NotFoundView />} />
    </Routes>
  );
}

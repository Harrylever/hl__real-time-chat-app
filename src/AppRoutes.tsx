import { Routes, Route } from 'react-router-dom';
import { ChatView, RegisterView, LoginView, NotFoundView } from './views';
import Layout from './components/layout/Layout';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<ChatView />} />
        <Route path="register" element={<RegisterView />} />
        <Route path="login" element={<LoginView />} />
      </Route>
      <Route path="*" element={<NotFoundView />} />
    </Routes>
  );
}

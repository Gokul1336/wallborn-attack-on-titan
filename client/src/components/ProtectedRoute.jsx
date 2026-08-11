import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function ProtectedRoute({ children }) {
  const { status } = useAuthStore();

  if (status === 'loading' || status === 'idle') {
    return <div className="container" style={{ padding: '80px 0' }}>Checking access...</div>;
  }

  if (status !== 'authenticated') {
    return <Navigate to="/login" replace />;
  }

  return children;
}

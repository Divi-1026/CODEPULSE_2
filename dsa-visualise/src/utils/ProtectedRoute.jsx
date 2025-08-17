// utils/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = document.cookie.includes("token"); // OR from localStorage

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

// client/src/components/ProtectedRoute.tsx
import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  user: { username: string; password: string } | null; // Define user type as an object or null
  children: ReactNode; // Define children prop for wrapped components
  onLogout: () => void; // Define onLogout as a function with no arguments and no return value
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ user, children, onLogout }) => {
  if (!user) {
    return <Navigate to="/login" replace />;  // `replace` prevents going back to protected route after login
  }

  return (
    <div>
      <button onClick={onLogout}>Logout</button> {/* Add an onLogout prop */}
      {children}
    </div>
  );
};

export default ProtectedRoute;

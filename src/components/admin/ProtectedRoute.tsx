import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useDeviceVerification } from '@/hooks/useDeviceVerification';
import { Loader2 } from 'lucide-react';

const ProtectedRoute: React.FC = () => {
  const { user, userRole, loading: authLoading } = useAuth();
  const { isVerified, loading: deviceLoading } = useDeviceVerification();

  if (authLoading || deviceLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!userRole) {
    return <Navigate to="/admin/device-verify" replace />;
  }

  if (!isVerified) {
    return <Navigate to="/admin/device-verify" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

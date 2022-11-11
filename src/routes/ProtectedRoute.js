import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Spinner from '../components/app/Spinner';
import useAuth from '../hooks/useAuth';

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  if (loading) {
    return <Spinner />;
  }
  if (!loading) {
    if (!user) {
      return <Outlet />;
    }
    return <Navigate to={'/'} />;
  }
}

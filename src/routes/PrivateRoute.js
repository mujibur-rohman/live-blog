import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Spinner from '../components/app/Spinner';
import useAuth from '../hooks/useAuth';

export default function PrivateRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  } else if (!loading) {
    if (user) {
      return <Outlet />;
    }
    return <Navigate to={'/login'} />;
  }
}

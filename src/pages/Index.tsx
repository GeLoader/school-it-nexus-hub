
import React, { useState } from 'react';
import LoginPage from '@/components/LoginPage';
import AdminDashboard from '@/components/AdminDashboard';
import UserDashboard from '@/components/UserDashboard';

const Index = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (role: 'admin' | 'user', userData: any) => {
    setUser({ ...userData, role });
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (user.role === 'admin') {
    return <AdminDashboard user={user} onLogout={handleLogout} />;
  }

  return <UserDashboard user={user} onLogout={handleLogout} />;
};

export default Index;

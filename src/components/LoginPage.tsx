
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Monitor, Users } from 'lucide-react';

interface LoginPageProps {
  onLogin: (role: 'admin' | 'user', userData: any) => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [adminCredentials, setAdminCredentials] = useState({ username: '', password: '' });
  const [userCredentials, setUserCredentials] = useState({ username: '', password: '' });

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, accept any credentials
    onLogin('admin', { username: adminCredentials.username, role: 'admin' });
  };

  const handleUserLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, accept any credentials
    onLogin('user', { username: userCredentials.username, role: 'user' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center">
            <Monitor className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl">School IT Support System</CardTitle>
          <CardDescription>Access your IT support dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="admin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="admin" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Admin
              </TabsTrigger>
              <TabsTrigger value="user" className="flex items-center gap-2">
                <Monitor className="h-4 w-4" />
                User
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="admin">
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-username">Username</Label>
                  <Input
                    id="admin-username"
                    type="text"
                    placeholder="Enter admin username"
                    value={adminCredentials.username}
                    onChange={(e) => setAdminCredentials({ ...adminCredentials, username: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password">Password</Label>
                  <Input
                    id="admin-password"
                    type="password"
                    placeholder="Enter admin password"
                    value={adminCredentials.password}
                    onChange={(e) => setAdminCredentials({ ...adminCredentials, password: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login as Admin
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="user">
              <form onSubmit={handleUserLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="user-username">Username</Label>
                  <Input
                    id="user-username"
                    type="text"
                    placeholder="Enter your username"
                    value={userCredentials.username}
                    onChange={(e) => setUserCredentials({ ...userCredentials, username: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-password">Password</Label>
                  <Input
                    id="user-password"
                    type="password"
                    placeholder="Enter your password"
                    value={userCredentials.password}
                    onChange={(e) => setUserCredentials({ ...userCredentials, password: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login as User
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;

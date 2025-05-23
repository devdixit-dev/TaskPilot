
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Mock users for demo purposes
  const mockUsers = [
    {
      id: '1',
      email: 'admin@company.com',
      password: 'admin123',
      name: 'John Admin',
      role: 'admin' as const,
      companyName: 'TechCorp Inc.',
      contactPerson: 'John Admin'
    },
    {
      id: '2',
      email: 'manager@company.com',
      password: 'manager123',
      name: 'Sarah Manager',
      role: 'manager' as const
    },
    {
      id: '3',
      email: 'employee@company.com',
      password: 'employee123',
      name: 'Mike Employee',
      role: 'employee' as const
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = mockUsers.find(u => u.email === email && u.password === password);
      
      if (user) {
        const { password: _, ...userData } = user;
        login(userData);
        
        toast({
          title: "Login successful!",
          description: `Welcome back, ${user.name}!`,
        });

        // Redirect based on role
        switch (user.role) {
          case 'admin':
            navigate('/admin/dashboard');
            break;
          case 'manager':
            navigate('/manager/dashboard');
            break;
          case 'employee':
            navigate('/employee/dashboard');
            break;
        }
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary-light flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="font-playfair font-bold text-2xl text-primary">TP</span>
          </div>
          <h1 className="font-playfair font-bold text-3xl text-white">Welcome Back</h1>
          <p className="text-blue-100 mt-2">Sign in to your TaskPilot account</p>
        </div>

        <Card className="shadow-2xl border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-primary">Login</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 bg-primary hover:bg-primary-light font-semibold"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium text-center mb-2">Demo Credentials:</p>
              <div className="text-xs space-y-1">
                <p><strong>Admin:</strong> admin@company.com / admin123</p>
                <p><strong>Manager:</strong> manager@company.com / manager123</p>
                <p><strong>Employee:</strong> employee@company.com / employee123</p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Need to register account?{' '}
                <Link to="/admin-signup" className="text-primary hover:underline font-medium">
                  Sign up here
                </Link>
              </p>
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary hover:underline">
                ← Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;

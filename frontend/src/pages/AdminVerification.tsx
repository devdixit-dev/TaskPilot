
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const AdminVerification = () => {
  const [otp, setOtp] = useState('');
  const correctOTP = '123456';
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);

    if (!otp) {
      toast({
        title: "Otp field is required for verification",
        description: "OTP do not match",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      const checkOTP = correctOTP === otp

      if(checkOTP) {
        toast({
          title: "Account verified successfully!",
          description: `Welcome to TaskPilot Admin 🫡!`,
        });

        navigate('/login');
      }
      else{
        toast({
          title: "Account not verified!",
          description: `Please check your OTP or your entered email once again`,
        });

        navigate('#');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify your account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary-light flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <Card className="shadow-2xl border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-primary">Company Verification</CardTitle>
            <CardDescription className="text-center">
              Enter 6 digit OTP that we sent you on your registered email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Verification OTP</Label>
                <Input
                  id="verify-otp"
                  name="verify-otp"
                  type="text"
                  placeholder="Enter your otp here"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 bg-primary hover:bg-primary-light font-semibold mt-6"
                disabled={loading}
              >
                {loading ? 'Verifying Account...' : 'Verify Account'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Sign in here
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

export default AdminVerification;
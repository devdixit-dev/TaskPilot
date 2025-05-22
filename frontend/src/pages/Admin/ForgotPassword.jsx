import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react'

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [otp, setOtp] = useState('');
  const correctOTP = '123456';

  const handleEmailVerification = (e) => {
    e.preventDefault();

    if (!email || email.length < 6) {
      toast.error('Please enter a valid email');
      return;
    }

    const toastId = toast.loading('Verifying email...');
    setTimeout(() => {
      toast.update(toastId, {
        render: 'Verification code sent to your email!',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      });
      setEmailSent(true);
    }, 2000);
  };

  const handleOtpVerification = (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      toast.error('Please enter a 6-digit OTP');
      return;
    }

    const toastId = toast.loading('Verifying OTP...');
    setTimeout(() => {
      if (otp === correctOTP) {
        toast.update(toastId, {
          render: 'OTP verified successfully!',
          type: 'success',
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
        });
      } else {
        toast.update(toastId, {
          render: 'Invalid OTP!',
          type: 'error',
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
        });
      }
    }, 2000);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-1/3.5 py-8 px-8 rounded-lg border border-[#242424]">
        <div className="px-4">
          <h2 className="text-3xl tracking-wider mb-2">Forgot Password</h2>
          <p className="mb-2">Enter your email below for verification</p>
        </div>
        <div className="rounded-md p-4">
          <form onSubmit={emailSent ? handleOtpVerification : handleEmailVerification}>
            <div className="flex flex-col gap-2 mb-4">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                minLength={6}
                placeholder="Enter your email"
                className="min-w-[380px] bg-black py-2.5 px-4.5 rounded-md border border-[#242424] outline-0"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={emailSent}
              />
            </div>

            {emailSent && (
              <div className="flex flex-col gap-2 mb-4">
                <label htmlFor="otp">Verification OTP</label>
                <input
                  type="text"
                  name="otp"
                  maxLength={6}
                  placeholder="Enter your OTP"
                  className="min-w-[380px] bg-black py-2.5 px-4.5 rounded-md border border-[#242424] outline-0"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            )}

            <div className="w-full flex justify-center border-b border-[#242424] pb-6">
              <button
                type="submit"
                className="py-2 px-6 rounded-md bg-white text-black cursor-pointer transition-all duration-300 hover:outline hover:opacity-70"
              >
                {emailSent ? 'Submit OTP' : 'Send verification mail'}
              </button>
            </div>

            <div className="flex justify-center mt-4 gap-2">
              <p>Remember Password ?</p>
              <a href="/admin/auth" className="cursor-pointer text-blue-500">Login</a>
            </div>

            <ToastContainer theme="dark" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

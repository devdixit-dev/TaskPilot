import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AdminAuth = () => {
  const navigate = useNavigate();

  const [active, setActive] = useState('signup');
  const [users, setUsers] = useState([]);

  const [name, setName] = useState('');
  const [orgName, setOrgName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (active === 'signup') {
      if (!name || !orgName || !email || !password) {
        return toast.error('all fields are required')
      }
      const newUser = {
        name,
        orgName,
        email,
        password
      }

      const toastId = toast.loading('Registering user...');
      setTimeout(() => {
        toast.update(toastId, {
          render: 'Sign up successfull',
          type: 'success',
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
        });
        setUsers([...users, newUser]);
        console.log(users);
        setName('')
        setOrgName('')
        setEmail('')
        setPassword('')
      }, 3000);
    }
    else {
      if (!email || !password) {
        return toast.error('all fields are required')
      }

      const toastId = toast.loading('Verifying account...');
      setTimeout(() => {
        toast.update(toastId, {
          render: 'Logged in successfully',
          type: 'success',
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
        });
        setEmail('');
        setPassword('');
        navigate('/admin-dashboard')
      }, 3000);
    }
  }

  useEffect(() => {
    console.log("Active tab changed to:", active);
  }, [active]);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-1/3.5 py-8 px-8 rounded-lg border-1 border-[#242424]">
        <div className="px-4">
          <h2 className="text-3xl tracking-wider mb-2">{active === 'signup' ? 'Sign Up' : 'Login'}</h2>
          <p className="mb-2">{active === 'signup' ? 'Enter your email below to create your account' : 'Enter your email and password for login'}</p>
        </div>
        <div className="rounded-md p-4">
          <div className="flex justify-between gap-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                setActive('signup');
              }}
              className={`py-2 px-16 rounded-md cursor-pointer transition-all duration-400 border-1 border-[#242424] ${active === 'signup' ? 'bg-[#242424] scale-105' : 'bg-black'}`}>Sign Up</button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setActive('login');
              }}
              className={`py-2 px-16 rounded-md cursor-pointer transition-all duration-400 border-1 border-[#242424] ${active === 'login' ? 'bg-[#242424] scale-105' : 'bg-black'}`}>Login</button>
          </div>

          <div className="mt-6">
            <form onSubmit={handleSignUp}>
              {active === 'signup' ?
                <>
                  <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" minLength={6} placeholder="Enter your full name" className="bg-black py-2.5 px-4.5 rounded-md border-1 border-[#242424] outline-0" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>

                  <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="name">Organization Name</label>
                    <input type="text" name="name" minLength={6} placeholder="Enter your organization name" className="bg-black py-2.5 px-4.5 rounded-md border-1 border-[#242424] outline-0" value={orgName} onChange={(e) => setOrgName(e.target.value)} required />
                  </div>
                </>
                :
                null
              }
              <div className="flex flex-col gap-2 mb-4">
                <label htmlFor="email">Organization Email</label>
                <input type="email" name="email" minLength={6} placeholder="Enter your organization email" className="bg-black py-2.5 px-4.5 rounded-md border-1 border-[#242424] outline-0" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" minLength={6} placeholder="Enter your password" className="bg-black py-2.5 px-4.5 rounded-md border-1 border-[#242424] outline-0" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className="w-full flex justify-center border-b-1 border-[#242424] pb-6">
                <button type="submit" className={`py-2 px-12 rounded-md bg-white text-black cursor-pointer transition-all duration-300 hover:outline-1 hover:opacity-70`}>{active === 'signup' ? 'Sign Up' : 'Login'}</button>
              </div>

              {
                active === 'signup' ?
                  <div className="flex justify-center mt-4 gap-2">
                    <p>Already have an account ?</p>
                    <button onClick={(e) => {
                      e.preventDefault();
                      setActive('login');
                    }} className="cursor-pointer text-blue-500">Login</button>
                  </div>
                  :
                  <div>
                    <div>
                      <div className="flex justify-center mt-4 gap-2 text-sm">
                        <p>Forgot Password ?</p>
                        <a href="/forgot-password" className="cursor-pointer text-blue-500">Change password</a>
                      </div>
                    </div>
                    <div className="flex justify-center mt-4 gap-2">
                      <p>Don't have an account ?</p>
                      <button onClick={(e) => {
                        e.preventDefault();
                        setActive('signup');
                      }} className="cursor-pointer text-blue-500">Sign Up</button>
                    </div>
                  </div>
              }
              <ToastContainer theme="dark" />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminAuth;
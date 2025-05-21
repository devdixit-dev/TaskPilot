import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';

const AuthPage = () => {

  const [active, setActive] = useState('signup');

  useEffect(() => {
    const notify = () => toast('Hello, there !');
    notify();
    console.log("Active tab changed to:", active);
  }, [active]);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-1/3.5 py-10 px-8 rounded-lg bg-black">
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
            <form action="">
              {active === 'signup' ?
                <div className="flex flex-col gap-2 mb-4">
                  <label htmlFor="name">Name</label>
                  <input type="text" name="name" minLength={6} placeholder="Enter your full name" className="bg-black py-2.5 px-4.5 rounded-md border-1 border-[#242424] outline-0" />
                </div>
                :
                null
              }
              <div className="flex flex-col gap-2 mb-4">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" minLength={6} placeholder="Enter your email address" className="bg-black py-2.5 px-4.5 rounded-md border-1 border-[#242424] outline-0" />
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" minLength={6} placeholder="Enter your password" className="bg-black py-2.5 px-4.5 rounded-md border-1 border-[#242424] outline-0" />
              </div>
              <div className="w-full flex justify-center">
                <button className={`py-2 px-12 rounded-md bg-white text-black cursor-pointer transition-all duration-300 hover:outline-1 hover:opacity-70`}>{active === 'signup' ? 'Sign Up' : 'Login'}</button>
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
                  <div className="flex justify-center mt-4 gap-2">
                    <p>Don't have an account ?</p>
                    <button onClick={(e) => {
                      e.preventDefault();
                      setActive('signup');
                    }} className="cursor-pointer text-blue-500">Sign Up</button>
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

export default AuthPage
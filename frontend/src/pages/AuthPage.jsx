import { useState, useEffect } from "react";

const AuthPage = () => {

  const [active, setActive] = useState('signup');

  useEffect(() => {
    console.log("Active tab changed to:", active);
  }, [active]);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-1/3.5 py-10 px-8 rounded-lg bg-black">
        <div className="text-center">
          <h2 className="text-3xl tracking-wider mb-2">{active === 'signup' ? 'Sign Up' : 'Login'}</h2>
          <p className="mb-2">{active === 'signup' ? '[ Create your account ]' : '[ Welcome back ]'}</p>
        </div>
        <div className="mt-4 bg-[#242424] rounded-md p-4">
          <div className="flex justify-between">
            <button
              onClick={(e) => {
                e.preventDefault();
                setActive('signup');
                console.log(active)
              }}
              className={`py-2 px-16 rounded-md cursor-pointer transition-all duration-400 ${active === 'signup' ? 'bg-transparent scale-105' : 'bg-black'}`}>Sign Up</button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setActive('login');
                console.log(active);
              }}
              className={`py-2 px-16 rounded-md cursor-pointer transition-all duration-400 ${active === 'login' ? 'bg-transparent scale-105' : 'bg-black'}`}>Login</button>
          </div>
          
          <div className="mt-6">
            <form action="">
              {active === 'signup' ? 
              <div className="flex flex-col gap-2 mb-4">
                <label htmlFor="username">Username</label>
                <input type="text" minLength={6} placeholder="Enter your username" className="bg-black py-2.5 px-4.5 rounded-md" />
              </div>
              :
              null
              }
              <div className="flex flex-col gap-2 mb-4">
                <label htmlFor="email">Email</label>
                <input type="email" minLength={6} placeholder="Enter your email address" className="bg-black py-2.5 px-4.5 rounded-md" />
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <label htmlFor="password">Password</label>
                <input type="password" minLength={6} placeholder="Enter your password" className="bg-black py-2.5 px-4.5 rounded-md" />
              </div>
              <div className="w-full flex justify-center">
                <button className={`py-2 px-12 rounded-md bg-black cursor-pointer transition-all duration-300 hover:outline-1`}>{active === 'signup' ? 'Sign Up': 'Login'}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
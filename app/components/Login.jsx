"use client"
import React, { useEffect, useState } from 'react'
import { LoginUser } from '../lib/api';
import { useRouter } from 'next/navigation';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[loading, setLoading] = useState(false);
    const [error, setError] = useState('')

    const router = useRouter()

    const handleLogin = async(e) =>{
        e.preventDefault();
        setLoading(true);
        setError('');

        try{
            const data = await LoginUser(email, password);
            localStorage.setItem("list", JSON.stringify(data));
            router.push("/");
            console.log("Logged in success")
        } catch(err){
            setError(err);
        }finally{
            setLoading(false);
        }
    }
  return (
    <div className='p-4 w-xl min-h-screen'>
        <form onSubmit={handleLogin} className='flex flex-col gap-4 justify-center'>
            <input type="email" placeholder='Enter email' className='border border-gray-500 p-4 rounded-md' onChange={(e) => setEmail(e.target.value)} />
              <input type="password" placeholder='Enter password' className='border border-gray-500 p-4 rounded-md' onChange={(e) => setPassword(e.target.value)} />

              {error && <p className='text-red-500 text-sm'>{error}</p>}

              <button type='submit' disabled={loading} className='border bg-green-400 text-white p-4 w-[130px]'>{loading ? 'Loading ...' : 'Login'}</button>
        </form>
    </div>
  )
}

export default Login
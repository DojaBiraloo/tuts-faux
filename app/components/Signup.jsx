"use client"

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { SignupUser } from '../lib/api';

const Signup = () => {
    const[firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[middleName, setMiddleName] = useState('');
    const[gender, setGender] = useState('');
    const[sex, setSex] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false);

    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await SignupUser(firstName, middleName, lastName, gender, sex, email, password)
            setSuccess(true);
            console.log("Signed up")
             router.push("/login");
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false)
        }

        

    }
   const inputClass =
  'w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200';

return (
  <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10'>
    <div className='w-full max-w-lg rounded-2xl bg-white p-8 shadow-lg'>
      <h1 className='text-2xl font-semibold text-gray-900'>Create your account</h1>
      <p className='mt-1 mb-6 text-sm text-gray-500'>Fill in your details to get started.</p>

      <form onSubmit={handleSignup} className='flex flex-col gap-4'>
        {/* <input
          type='text'
          value={username}
          className={inputClass}
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)}
        /> */}

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
          <input
            type='text'
            value={firstName}
            className={inputClass}
            placeholder='First name'
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type='text'
            value={middleName}
            className={inputClass}
            placeholder='Middle name'
            onChange={(e) => setMiddleName(e.target.value)}
          />
          <input
            type='text'
            value={lastName}
            className={inputClass}
            placeholder='Last name'
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className={`${inputClass} ${gender === '' ? 'text-gray-400' : ''}`}
          >
            <option value=''>Select gender</option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
            <option value='Polygender'>Polygender</option>
            <option value='Non-binary'>Non-binary</option>
            <option value='Other'>Other</option>
          </select>

          <select
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            className={`${inputClass} ${sex === '' ? 'text-gray-400' : ''}`}
          >
            <option value=''>Select sex</option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
          </select>
        </div>

        <input
          type='email'
          value={email}
          className={inputClass}
          placeholder='Email address'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          value={password}
          className={inputClass}
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className='rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600'>{error}</p>
        )}

        <button
          disabled={loading}
          type='submit'
          className='mt-2 w-full rounded-lg bg-green-500 px-4 py-3 font-medium text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60'
        >
          {loading ? 'Creating account...' : 'Sign up'}
        </button>
      </form>
    </div>
  </div>
);
}

export default Signup
'use client'

import React from 'react'
import { useState, useEffect } from 'react';
import FormAuth from '../_components/FormAuth'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebaseClient';
import { useRouter } from 'next/navigation';
import { setCookie, getCookie } from 'cookies-next';
import Swal from 'sweetalert2';

function page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  //   cegah login jika sudah login
    useEffect(() => {
        const token = getCookie('token');
        if (token) {
            router.replace('/dashboard');
          }
    }, [])


  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const token = await user.getIdToken();

    // Simpan token di cookie agar bisa diakses middleware
    setCookie('token', token, {
      maxAge: 60 * 60 * 24, // 1 hari
      path: '/',
    });

    router.push('/dashboard');
  } catch (err: any) {
    Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'password atau email salah',
        confirmButtonText: 'OK'
    })
  } finally {
    setLoading(false);
  }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  return (
    <FormAuth
      email={email}
      password={password}
      loading={loading}
      error={error}
      onChange={handleChange}
      onSubmit={handleSubmit}
      title="Welcome Back!"
      buttonText="Login"
      alternateText="Don't have an account?"
      alternateLink="/register"
      alternateLinkText="Register"
      showNameField={false}
    />
  )
}

export default page
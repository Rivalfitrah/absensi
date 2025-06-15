// app/register/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '@/lib/firebaseClient';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import FormAuth from '../_components/FormAuth';
import { getCookie, setCookie } from 'cookies-next'; 
import Swal from 'sweetalert2';


export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

//   cegah login jika sudah login
    useEffect(() => {
        const token = getCookie('token');
        if (token) {
            router.replace('/dashboard');
        }
    })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { email, password, name } = form;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name,
        email,
        role: 'user',
        createdAt: new Date().toISOString()
      });

    const token = await user.getIdToken();
    setCookie('token', token, {
      maxAge: 60 * 60 * 24,
      path: '/',
    });

      router.push('/dashboard');
    } catch (err: any) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: err.message || 'An error occurred during registration.',
        confirmButtonText: 'OK'
      })
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormAuth
    name={form.name}
    email={form.email}
    password={form.password}
    loading={loading}
    error={error}
    onChange={handleChange}
    onSubmit={handleSubmit}
    title="Welcome!"
    buttonText="Register"
    alternateText="Already have an account?"
    alternateLink="/login"
    alternateLinkText="Login"
    showNameField={true}
    />

  );
}

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie('token');

    if (!token) {
      router.push('/login');
    }
  }, []);

  return <div>page dashboard</div>;
}

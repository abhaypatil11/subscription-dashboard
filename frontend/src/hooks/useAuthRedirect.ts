import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function useAuthRedirect() {
  const router = useRouter();

  useEffect(() => {
  if (typeof window !== 'undefined') {
    console.log('Checking token...');
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found, redirecting to login');
      router.replace('/login');
    }
  }
}, []);
}

// src/utils/withAuth.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent: any) => {
  const AuthenticatedComponent = (props: any) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isChecking, setIsChecking] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.replace('/login');
      } else {
        setIsAuthenticated(true);
      }
      setIsChecking(false);
    }, []);

    if (isChecking) {
      return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-700">
          <p>Checking authentication...</p>
        </main>
      );
    }

    if (!isAuthenticated) return null;

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;

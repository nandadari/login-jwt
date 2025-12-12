
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // mengecek status autentikasi
  useEffect(() => {
    //mengambil token jwt
    const token = localStorage.getItem('jwt_token');
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, [pathname]);

  // fungsi login user
  const login = async (token: string) => {
    localStorage.setItem('jwt_token', token);
    setIsAuthenticated(true);
    router.push('/dashboard');
  };

  // fungsi logout 
  const logout = () => {
    localStorage.removeItem('jwt_token');
    setIsAuthenticated(false);
    if (pathname !== '/login') {
      router.push('/');
    }
  };

  return { 
    isAuthenticated, 
    isLoading, 
    login, 
    logout 
  };
}
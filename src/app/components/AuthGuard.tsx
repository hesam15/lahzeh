'use client';
import { useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_ENDPOINTS, apiHelpers } from '@/app/config/api';

const publicPaths = ['/login', '/register', '/verify', '/forgot-password', '/inactive'];

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    // Guard clause for null pathname
    if (!pathname) {
      setIsLoading(false);
      return;
    }

    // Allow access to public paths
    if (publicPaths.includes(pathname)) {
      const token = Cookies.get('access_token');
      if (!token) {
        setIsLoading(false);
        return;
      }

      // Check token validity for /login, /register, /verify
      try {
        const response = await axios.get(API_ENDPOINTS.userMe(), apiHelpers.getRequestConfig(token));

        // Redirect authenticated users from /login or /register to /
        if (['/login', '/register'].includes(pathname)) {
          router.push('/');
          setIsLoading(false);
          return;
        }

        // Redirect verified users from /verify to /
        const verified = response.data?.data?.verified;
        if (verified && pathname === '/verify') {
          router.push('/');
          setIsLoading(false);
          return;
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Authentication error:', error);
        // Clear invalid token
        Cookies.remove('access_token');
        // Redirect to /login if not already there
        if (pathname !== '/login') {
          router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
        } else {
          setIsLoading(false);
        }
      }
      return;
    }

    // For non-public paths, check authentication
    const token = Cookies.get('access_token');
    if (!token) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    try {
      const response = await axios.get(API_ENDPOINTS.userMe(), apiHelpers.getRequestConfig(token));

      const verified = response.data?.data?.verified;
      if (!verified && pathname !== '/verify') {
        router.push(`/verify?redirect=${encodeURIComponent(pathname)}`);
        return;
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Authentication error:', error);
      // Clear invalid token
      Cookies.remove('access_token');
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [pathname, router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
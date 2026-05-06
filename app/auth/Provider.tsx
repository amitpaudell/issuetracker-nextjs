'use client';
import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren } from 'react';

const AuthProvider = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <SessionProvider>{children}</SessionProvider>
    </div>
  );
};

export default AuthProvider;

import { Metadata } from 'next';
import Link from 'next/link';
import { LoginForm } from '@/components/auth/login-form';
import { FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Login - LeaseLight',
  description: 'Login to your LeaseLight account',
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <Link
          href="/"
          className="flex items-center space-x-2 mb-8"
        >
          <FileText className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">LeaseLight</span>
        </Link>
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>
          <LoginForm />
          <div className="text-center text-sm">
            <p>
              Don't have an account?{' '}
              <Link href="/signup" className="font-medium text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
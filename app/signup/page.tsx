import { Metadata } from 'next';
import Link from 'next/link';
import { SignUpForm } from '@/components/auth/signup-form';
import { FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sign Up - LeaseLight',
  description: 'Create your LeaseLight account',
};

export default function SignUpPage() {
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
            <h1 className="text-2xl font-bold">Create an account</h1>
            <p className="text-muted-foreground">
              Enter your information to get started with LeaseLight
            </p>
          </div>
          <SignUpForm />
          <div className="text-center text-sm">
            <p>
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
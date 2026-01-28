"use client";

import LoadingSpinner from '@/components/LoadingSpinner';
import ResetPasswordForm from '@/components/ResetPasswordInput';
import SuccessMessage from '@/components/SuccessMessage';
import { auth } from '@/lib/firebase';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function ResetPasswordPage() {
  return (
    <React.Suspense fallback={<LoadingSpinner />}> 
      <ResetPasswordContent />
    </React.Suspense>
  );
}

function ResetPasswordContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'verifying'>('verifying');
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');

  const searchParams = useSearchParams();
  const oobCode = searchParams.get('oobCode');

  useEffect(() => {
    if (!oobCode) {
      setStatus('error');
      setErrorMessage('Invalid or missing reset code.');
      return;
    }

    verifyPasswordResetCode(auth, oobCode)
      .then((verifiedEmail: string) => {
        setEmail(verifiedEmail);
        setStatus('idle');
      })
      .catch((error: unknown) => {
        setStatus('error');
        if (error instanceof Error) {
          setErrorMessage(error.message || 'Invalid or expired action code.');
        } else {
          setErrorMessage('Invalid or expired action code.');
        }
      });
  }, [oobCode]);

  const handleSubmit = async (e: React.FormEvent, newPassword: string, confirmPassword: string) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!oobCode) return;

    setIsLoading(true);
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setStatus('success');
    } catch (error: unknown) {
      setStatus('error');
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'verifying') {
    return <LoadingSpinner />;
  }

  if (status === 'success') {
    return <SuccessMessage />;
  }

  return (
    <ResetPasswordForm
      email={email}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      errorMessage={errorMessage}
      isError={status === 'error'}
    />
  );
}
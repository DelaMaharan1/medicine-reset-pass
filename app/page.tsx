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
  const mode = searchParams.get('mode');

  useEffect(() => {
    // Log all incoming parameters for debugging
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    console.log("Full Search Params:", params);
    console.log("Current Full URL:", window.location.href);

    // If no code is present, show error immediately
    if (!oobCode || !mode) {
      console.error("Missing oobCode or mode. Params received:", params);
      setStatus('error');
      setErrorMessage('Invalid link: Missing reset code (oobCode) or mode parameter.');
      return;
    }

    // Identify what mode we are in
    if (mode !== 'resetPassword') {
      console.error("Invalid mode:", mode);
      setStatus('error');
      setErrorMessage(`Invalid operation mode: ${mode}. Expected 'resetPassword'.`);
      return;
    }

    console.log("Verifying code:", oobCode, "Mode:", mode);

    verifyPasswordResetCode(auth, oobCode)
      .then((verifiedEmail: string) => {
        console.log("Email verified:", verifiedEmail);
        setEmail(verifiedEmail);
        setStatus('idle');
      })
      .catch((error: unknown) => {
        const err = error as { code?: string; message?: string };
        console.error("Error verifying code:", err);
        setStatus('error');
        // Firebase Auth Error Codes handling
        // https://firebase.google.com/docs/reference/js/auth#autherrorcodes
        if (err.code === 'auth/expired-action-code') {
          setErrorMessage('The password reset link has expired. Please request a new one.');
        } else if (err.code === 'auth/invalid-action-code') {
          setErrorMessage('The password reset link is invalid. It may have been used already.');
        } else if (err.code === 'auth/user-disabled') {
          setErrorMessage('The user corresponding to this reset link has been disabled.');
        } else if (err.code === 'auth/user-not-found') {
          setErrorMessage('User not found.');
        } else {
          setErrorMessage(err.message || 'Invalid or expired action code.');
        }
      });
  }, [oobCode, mode, searchParams]);

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
      const err = error as { code?: string; message?: string };
      console.error("Error confirming reset:", err);
      setStatus('error');
      if (err.code === 'auth/expired-action-code') {
        setErrorMessage('The password reset link has expired. Please request a new one.');
      } else if (err.code === 'auth/invalid-action-code') {
        setErrorMessage('The password reset link is invalid. It may have been used already.');
      } else if (err.code === 'auth/weak-password') {
        setErrorMessage('The password is too weak.');
      } else {
        setErrorMessage(err.message || 'An unknown error occurred.');
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
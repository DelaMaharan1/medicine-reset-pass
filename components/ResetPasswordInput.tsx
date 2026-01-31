import Image from 'next/image';
import React from 'react';
import { FiEye, FiEyeOff, FiLock } from 'react-icons/fi';

interface ResetPasswordFormProps {
    email: string;
    onSubmit: (e: React.FormEvent, newPass: string, confirmPass: string) => void;
    isLoading: boolean;
    errorMessage: string;
    isError: boolean;
}

export default function ResetPasswordForm({ email, onSubmit, isLoading, errorMessage, isError }: ResetPasswordFormProps) {
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(e, newPassword, confirmPassword);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0b0b0b] px-4">
            <div className="w-full max-w-md rounded-2xl bg-white dark:bg-[#121212] shadow-md border border-gray-200 dark:border-gray-800">

                {/* Header */}
                <div className="flex justify-center py-8">
                    <div className="w-20 h-20 rounded-full bg-white dark:bg-black 
                         flex items-center justify-center 
                         shadow-md transition">
                        <div className="relative w-10 h-10">
                            <Image
                                src="/icon.png"
                                alt="MediTrack Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="px-8 pb-8">
                    <div className="text-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Reset Password
                        </h2>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            For {email}
                        </p>
                        {isError && (
                            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-lg">
                                {errorMessage}
                            </div>
                        )}
                    </div>

                    {!isError && (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    New Password
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                        <FiLock className="text-gray-400 dark:text-gray-500" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] px-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:text-white"
                                        required
                                        minLength={6}
                                        placeholder="Enter new password"
                                    />
                                    <button
                                        type="button"
                                        onClick={toggleShowPassword}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                                    >
                                        {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                        <FiLock className="text-gray-400 dark:text-gray-500" />
                                    </div>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] px-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:text-white"
                                        required
                                        minLength={6}
                                        placeholder="Confirm new password"
                                    />
                                    <button
                                        type="button"
                                        onClick={toggleShowConfirmPassword}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                                    >
                                        {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full mt-2 rounded-lg bg-primary py-3 text-sm font-semibold text-white hover:opacity-90 transition flex justify-center shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <span className="animate-pulse">Processing...</span>
                                ) : (
                                    "Reset Password"
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
import Image from 'next/image';
import Link from 'next/link';

export default function SuccessMessage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0b0b0b] px-4">
            <div className="w-full max-w-md rounded-2xl bg-white dark:bg-[#121212] shadow-md border border-gray-200 dark:border-gray-800 p-8 text-center">

                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-green-600 dark:text-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Password Reset!
                </h2>

                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Your password has been successfully updated. You can now log in with your new password.
                </p>

                <Link
                    href="projectfindal://"
                    className="w-full block rounded-lg bg-primary py-3 text-sm font-semibold text-white hover:opacity-90 transition shadow-lg shadow-primary/25"
                >
                    Back to App
                </Link>
            </div>
        </div>
    );
}

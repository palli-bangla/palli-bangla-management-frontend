'use client';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center shadow-xl">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Something Went Wrong
        </h2>
        <p className="text-gray-600 mb-4">
          We encountered an error in the application. Here are the details:
        </p>
        <div className="bg-gray-100 text-gray-800 p-4 rounded-lg text-left mb-6">
          <pre className="whitespace-pre-wrap text-red-500 break-words text-sm">
            {error.message}
          </pre>
        </div>
        <Button
          onClick={() => reset()}
          className="px-4 py-2  text-white rounded-lg shadow focus:ring-4 focus:ring-indigo-300 focus:outline-none"
        >
          Try Again
        </Button>
      </div>
    </div>
  );
}

'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RotateCcw, Home } from 'lucide-react'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('App Error:', error)
  }, [error])

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="p-4 rounded-2xl glass-panel-sharp bg-white/80 dark:bg-neutral-900/80 border border-neutral-300 dark:border-neutral-800 shadow-2xs mb-4">
        <AlertTriangle className="w-10 h-10 text-rose-500" />
      </div>
      <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
        Something unexpected occurred
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-md mb-6">
        {error?.message || 'An unknown error occurred while loading this view.'}
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => reset()}
          className="px-4 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-xs font-semibold text-neutral-700 dark:text-neutral-200 flex items-center gap-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" /> Try Again
        </button>
        <Link
          href="/"
          className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-950 font-semibold text-xs flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Home className="w-4 h-4" /> Go Home
        </Link>
      </div>
    </div>
  )
}

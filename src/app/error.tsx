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
      <div className="p-4 rounded-2xl glass-panel-sharp border border-neutral-300 shadow-2xs mb-4">
        <AlertTriangle className="w-10 h-10 text-amber-500" />
      </div>
      <h2 className="text-xl font-bold text-neutral-900 mb-2">Something unexpected occurred</h2>
      <p className="text-neutral-500 text-sm max-w-md mb-6">
        {error?.message || 'An unknown error occurred while loading this view.'}
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => reset()}
          className="px-4 py-2 rounded-xl bg-white border border-neutral-300 text-xs font-semibold text-neutral-700 flex items-center gap-2 hover:bg-neutral-100 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" /> Try Again
        </button>
        <Link
          href="/"
          className="px-4 py-2 rounded-xl bg-neutral-900 text-white font-semibold text-xs flex items-center gap-2 hover:bg-neutral-800 transition-colors"
        >
          <Home className="w-4 h-4" /> Go Home
        </Link>
      </div>
    </div>
  )
}


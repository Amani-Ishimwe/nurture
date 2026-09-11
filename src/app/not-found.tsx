'use client'

import Link from 'next/link'
import { ArrowLeft, Compass } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="p-4 rounded-2xl glass-panel-sharp border border-neutral-300 shadow-2xs mb-4">
        <Compass className="w-10 h-10 text-neutral-900 animate-pulse" />
      </div>
      <h2 className="text-xl font-bold text-neutral-900 mb-2">Sprint Landmark Not Found</h2>
      <p className="text-neutral-500 text-sm max-w-md mb-6">
        The page or sprint resource you requested does not exist or has moved.
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 rounded-xl bg-white border border-neutral-300 text-xs font-semibold text-neutral-700 flex items-center gap-2 hover:bg-neutral-100 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>
        <Link
          href="/"
          className="px-4 py-2 rounded-xl bg-neutral-900 text-white font-semibold text-xs transition-opacity hover:bg-neutral-800"
        >
          Current Sprint Hub
        </Link>
      </div>
    </div>
  )
}


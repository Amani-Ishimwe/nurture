import { ErrorComponent, Link, useRouter } from '@tanstack/react-router'
import type { ErrorComponentProps } from '@tanstack/react-router'
import { AlertTriangle, RotateCcw, Home } from 'lucide-react'

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter()
  console.error('DefaultCatchBoundary Error:', error)

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="p-4 rounded-2xl glass-panel border-neon-purple/40 glow-purple-sm mb-4">
        <AlertTriangle className="w-10 h-10 text-neon-purple" />
      </div>
      <h2 className="text-xl font-bold mb-2">Something unexpected occurred</h2>
      <p className="text-zinc-400 text-sm max-w-md mb-6">
        {error?.message || 'An unknown error occurred while loading this view.'}
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => router.invalidate()}
          className="px-4 py-2 rounded-xl glass-panel border-white/20 text-xs font-semibold flex items-center gap-2 hover:border-neon-green hover:text-neon-green transition-colors"
        >
          <RotateCcw className="w-4 h-4" /> Try Again
        </button>
        <Link
          to="/"
          className="px-4 py-2 rounded-xl bg-neon-green text-black font-semibold text-xs flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <Home className="w-4 h-4" /> Go Home
        </Link>
      </div>
    </div>
  )
}


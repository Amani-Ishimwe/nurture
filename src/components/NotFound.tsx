import { Link } from '@tanstack/react-router'
import { ArrowLeft, Compass } from 'lucide-react'

export function NotFound({ children }: { children?: React.ReactNode }) {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="p-4 rounded-2xl glass-panel border-neon-green/30 glow-green-sm mb-4">
        <Compass className="w-10 h-10 text-neon-green animate-pulse" />
      </div>
      <h2 className="text-xl font-bold mb-2">Sprint Landmark Not Found</h2>
      <div className="text-zinc-400 text-sm max-w-md mb-6">
        {children || <p>The page or sprint resource you requested does not exist or has moved.</p>}
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 rounded-xl glass-panel border-white/20 text-xs font-semibold flex items-center gap-2 hover:border-neon-green hover:text-neon-green transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>
        <Link
          to="/"
          className="px-4 py-2 rounded-xl bg-neon-green text-black font-semibold text-xs transition-opacity hover:opacity-90"
        >
          Current Sprint Hub
        </Link>
      </div>
    </div>
  )
}


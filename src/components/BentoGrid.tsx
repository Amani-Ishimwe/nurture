import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ReflectionCardItem } from '../types/sprint'
import { ReflectionCard } from './ReflectionCard'
import { Sparkles, Layers, PenTool, BookOpen } from 'lucide-react'

interface BentoGridProps {
  cards: ReflectionCardItem[]
  onReact: (cardId: string, reactionType: 'amen' | 'fire' | 'insight' | 'heart') => void
  onAddComment: (cardId: string, commentText: string) => void
  onOpenMediaModal: (card: ReflectionCardItem) => void
  onOpenComposer: () => void
}

export const BentoGrid: React.FC<BentoGridProps> = ({
  cards,
  onReact,
  onAddComment,
  onOpenMediaModal,
  onOpenComposer,
}) => {
  if (cards.length === 0) {
    return (
      <div className="py-16 text-center max-w-md mx-auto px-4">
        <div className="w-14 h-14 rounded-2xl glass-panel border-[#2CFF05]/40 text-[#2CFF05] flex items-center justify-center mx-auto mb-4 glow-green-sm">
          <Layers className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">No Reflections Found</h3>
        <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
          There are no cards matching this filter or search query. Be the first to share your
          meditation on today's study theme!
        </p>
        <button
          onClick={onOpenComposer}
          className="px-5 py-2.5 rounded-xl bg-[#2CFF05] text-black font-bold text-xs inline-flex items-center gap-2 glow-green-sm hover:scale-105 active:scale-95 transition-all"
        >
          <PenTool className="w-4 h-4 text-black" />
          <span>Post First Reflection</span>
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Bento Grid layout with responsive columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
        <AnimatePresence mode="popLayout">
          {cards.map((card) => (
            <ReflectionCard
              key={card.id}
              card={card}
              onReact={onReact}
              onAddComment={onAddComment}
              onOpenMediaModal={onOpenMediaModal}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Floating Bottom Quick Action */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenComposer}
          className="px-5 py-3 rounded-2xl bg-[#2CFF05] text-black font-bold text-xs sm:text-sm flex items-center gap-2.5 glow-green-md shadow-2xl tracking-wide border border-black/20"
        >
          <Sparkles className="w-4 h-4 text-black" />
          <span>Contribute Reflection</span>
        </motion.button>
      </div>
    </div>
  )
}


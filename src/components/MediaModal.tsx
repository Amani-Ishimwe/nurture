import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Video, Film, Headphones, Check, Share2 } from 'lucide-react'
import { ReflectionCardItem } from '../types/sprint'

interface MediaModalProps {
  card: ReflectionCardItem | null
  onClose: () => void
}

export const MediaModal: React.FC<MediaModalProps> = ({ card, onClose }) => {
  const [copied, setCopied] = React.useState(false)

  if (!card) return null

  const handleShare = () => {
    if (navigator.clipboard && card.mediaUrl) {
      navigator.clipboard.writeText(card.mediaUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-lg"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl glass-panel rounded-3xl border border-white/20 glow-purple-sm z-10 shadow-2xl overflow-hidden my-auto"
        >
          {/* Header Bar */}
          <div className="p-4 sm:p-5 flex items-center justify-between border-b border-white/10 bg-zinc-950/60">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#BF00FF]/20 border border-[#BF00FF]/40 text-[#BF00FF]">
                {card.mediaType === 'youtube' ? (
                  <Video className="w-5 h-5" />
                ) : card.mediaType === 'reel' ? (
                  <Film className="w-5 h-5" />
                ) : (
                  <Headphones className="w-5 h-5" />
                )}
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#BF00FF]">
                  {card.mediaType === 'youtube'
                    ? 'YouTube Sermon Archive'
                    : card.mediaType === 'reel'
                      ? 'Community Behind-The-Scenes Reel'
                      : 'Podcast Stream'}
                </p>
                <h4 className="text-base sm:text-lg font-bold text-white line-clamp-1">
                  {card.mediaTitle || 'Sprint Multimedia Resource'}
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2 rounded-xl glass-panel text-zinc-300 hover:text-white hover:border-[#2CFF05]/40 transition-colors"
                title="Copy Link"
              >
                {copied ? <Check className="w-4 h-4 text-[#2CFF05]" /> : <Share2 className="w-4 h-4" />}
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Media Player Area */}
          <div className="relative bg-black aspect-video w-full flex items-center justify-center overflow-hidden">
            {card.mediaType === 'youtube' && card.mediaEmbedId ? (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${card.mediaEmbedId}?autoplay=1`}
                title={card.mediaTitle || 'YouTube Video'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center">
                {card.mediaThumbnail && (
                  <img
                    src={card.mediaThumbnail}
                    alt={card.mediaTitle}
                    className="absolute inset-0 w-full h-full object-cover opacity-30 filter blur-sm"
                  />
                )}
                <div className="relative z-10 p-6 rounded-2xl glass-panel max-w-md border-white/20">
                  <div className="w-14 h-14 rounded-2xl bg-[#BF00FF]/30 border border-[#BF00FF] flex items-center justify-center mx-auto mb-4 text-[#BF00FF] glow-purple-sm">
                    {card.mediaType === 'reel' ? <Film className="w-7 h-7" /> : <Headphones className="w-7 h-7" />}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">{card.mediaTitle}</h4>
                  <p className="text-xs text-zinc-400 mb-4">{card.mediaArtist || 'Nurture Media Stream'}</p>
                  {card.mediaUrl && (
                    <a
                      href={card.mediaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#BF00FF] text-white text-xs font-bold hover:bg-[#cf26ff] transition-all glow-purple-sm"
                    >
                      Open in External App <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Content & Metadata footer */}
          <div className="p-5 bg-zinc-950/80 border-t border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={card.author.avatar}
                  alt={card.author.name}
                  className="w-7 h-7 rounded-full object-cover border border-white/20"
                />
                <span className="text-xs font-medium text-zinc-300">
                  Shared by <span className="text-white font-semibold">{card.author.name}</span> ({card.author.role})
                </span>
              </div>
              <span className="text-xs text-zinc-500">{card.createdAt}</span>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed">{card.content}</p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {card.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[#BF00FF]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}


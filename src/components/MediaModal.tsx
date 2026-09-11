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
          className="relative w-full max-w-3xl glass-card-sharp rounded-2xl border border-neutral-300 dark:border-neutral-800 z-10 shadow-2xl overflow-hidden my-auto bg-white dark:bg-neutral-900"
        >
          {/* Header Bar */}
          <div className="p-4 sm:p-5 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-950/70">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700">
                {card.mediaType === 'youtube' ? (
                  <Video className="w-5 h-5" />
                ) : card.mediaType === 'reel' ? (
                  <Film className="w-5 h-5" />
                ) : (
                  <Headphones className="w-5 h-5" />
                )}
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  {card.mediaType === 'youtube'
                    ? 'YouTube Sermon Archive'
                    : card.mediaType === 'reel'
                      ? 'Community Behind-The-Scenes Reel'
                      : 'Podcast Stream'}
                </p>
                <h4 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white line-clamp-1">
                  {card.mediaTitle || 'Sprint Multimedia Resource'}
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer"
                title="Copy Link"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
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
                <div className="relative z-10 p-6 rounded-2xl glass-card-sharp max-w-md border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80">
                  <div className="w-14 h-14 rounded-2xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 flex items-center justify-center mx-auto mb-4 text-neutral-900 dark:text-white shadow-xs">
                    {card.mediaType === 'reel' ? <Film className="w-7 h-7" /> : <Headphones className="w-7 h-7" />}
                  </div>
                  <h4 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">{card.mediaTitle}</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">{card.mediaArtist || 'Nurture Media Stream'}</p>
                  {card.mediaUrl && (
                    <a
                      href={card.mediaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 text-xs font-bold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all shadow-xs"
                    >
                      Open in External App <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Content & Metadata footer */}
          <div className="p-5 bg-white dark:bg-neutral-950/80 border-t border-neutral-200 dark:border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={card.author.avatar}
                  alt={card.author.name}
                  className="w-7 h-7 rounded-full object-cover border border-neutral-300 dark:border-neutral-700"
                />
                <span className="text-xs font-medium text-neutral-600 dark:text-neutral-300">
                  Shared by <span className="text-neutral-900 dark:text-white font-semibold">{card.author.name}</span> ({card.author.role})
                </span>
              </div>
              <span className="text-xs text-neutral-400 dark:text-neutral-500">{card.createdAt}</span>
            </div>

            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">{card.content}</p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {card.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300"
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

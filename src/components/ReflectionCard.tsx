import React, { useState, useEffect } from 'react'
import {
  Pin,
  Flame,
  Lightbulb,
  Heart,
  ShieldCheck,
  MessageSquare,
  Share2,
  Bookmark,
  Play,
  Pause,
  Film,
  Headphones,
  Video,
  Mic,
  Send,
  MoreHorizontal,
  EyeOff,
  Trash2,
  Check,
  ChevronDown,
  ChevronUp,
  Volume2
} from 'lucide-react'
import { ReflectionCardItem, Comment } from '../types/sprint'

interface ReflectionCardProps {
  card: ReflectionCardItem
  isAdminMode: boolean
  onReact: (cardId: string, reactionType: 'amen' | 'inspiring' | 'heart') => void
  onAddComment: (cardId: string, commentText: string) => void
  onTogglePin?: (cardId: string) => void
  onToggleHide?: (cardId: string) => void
  onOpenMediaModal: (card: ReflectionCardItem) => void
}

export const ReflectionCard: React.FC<ReflectionCardProps> = ({
  card,
  isAdminMode,
  onReact,
  onAddComment,
  onTogglePin,
  onToggleHide,
  onOpenMediaModal,
}) => {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false)
  const [commentInput, setCommentInput] = useState('')
  const [copied, setCopied] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [adminMenuOpen, setAdminMenuOpen] = useState(false)

  // Voice playback simulation
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [audioProgress, setAudioProgress] = useState(0)

  // Spotify simulation
  const [isPlayingSpotify, setIsPlayingSpotify] = useState(false)
  const [spotifyProgress, setSpotifyProgress] = useState(30)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isPlayingAudio) {
      timer = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false)
            return 0
          }
          return prev + 5
        })
      }, 400)
    }
    return () => clearInterval(timer)
  }, [isPlayingAudio])

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentInput.trim()) return
    onAddComment(card.id, commentInput.trim())
    setCommentInput('')
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}#${card.id}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (card.isHidden && !isAdminMode) {
    return null
  }

  return (
    <article
      className={`rounded-xl glass-card-sharp border transition-all duration-200 overflow-hidden ${
        card.isPinned
          ? 'border-neutral-900 ring-1 ring-neutral-800 shadow-xs'
          : card.isHidden
            ? 'border-dashed border-red-300 bg-red-50/30 opacity-75'
            : 'border-neutral-300 shadow-2xs hover:border-neutral-400'
      }`}
    >
      {/* Pinned by Chief Usher Header Banner */}
      {card.isPinned && (
        <div className="px-4 py-1.5 bg-neutral-900 text-white flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <Pin className="w-3.5 h-3.5 fill-current text-white rotate-45" />
            <span>Pinned by Chief Usher</span>
          </div>
          <span className="text-[10px] font-mono text-neutral-300 font-medium">Highlight</span>
        </div>
      )}

      {/* Hidden Moderation Notice */}
      {card.isHidden && (
        <div className="px-4 py-1 bg-red-100 text-red-800 text-[11px] font-semibold flex items-center justify-between">
          <span>This post is currently hidden from public member feed.</span>
          <span className="font-mono uppercase text-[9px]">Admin Only</span>
        </div>
      )}

      <div className="p-4 sm:p-5 space-y-3.5">
        {/* Author Bar */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={card.author.avatar}
              alt={card.author.name}
              className="w-9 h-9 rounded-full object-cover border border-neutral-200 shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-neutral-900 truncate">
                  {card.author.name}
                </span>
                {card.author.isCurrentUser && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-neutral-100 text-neutral-800 font-bold font-mono border border-neutral-200">
                    You
                  </span>
                )}
              </div>
              <p className="text-[11px] text-neutral-400 truncate">
                {card.author.role} • {card.createdAt}
              </p>
            </div>
          </div>

          {/* Type Chip & Admin Options Menu */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Tag Badge */}
            {card.type === 'scripture' ? (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-neutral-100 text-neutral-800 border border-neutral-200">
                Scripture
              </span>
            ) : card.type === 'voice' ? (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-neutral-100 text-neutral-800 border border-neutral-200">
                Voice Memo
              </span>
            ) : card.type === 'media' ? (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-neutral-100 text-neutral-800 border border-neutral-200">
                {card.mediaType?.toUpperCase() || 'MEDIA'}
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-neutral-100 text-neutral-700 border border-neutral-200">
                Reflection
              </span>
            )}

            {/* Admin Action Trigger */}
            {isAdminMode && (
              <div className="relative">
                <button
                  onClick={() => setAdminMenuOpen(!adminMenuOpen)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
                  title="Admin Moderation"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>

                {adminMenuOpen && (
                  <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-neutral-200 rounded-xl shadow-lg p-1 z-20 space-y-0.5 text-xs">
                    {onTogglePin && (
                      <button
                        onClick={() => {
                          onTogglePin(card.id)
                          setAdminMenuOpen(false)
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 hover:bg-neutral-100 text-neutral-700 cursor-pointer"
                      >
                        <Pin className="w-3.5 h-3.5" />
                        <span>{card.isPinned ? 'Unpin Post' : 'Pin to Top'}</span>
                      </button>
                    )}
                    {onToggleHide && (
                      <button
                        onClick={() => {
                          onToggleHide(card.id)
                          setAdminMenuOpen(false)
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 hover:bg-rose-50 text-rose-600 cursor-pointer"
                      >
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>{card.isHidden ? 'Unhide' : 'Hide Post'}</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Content Body Based on Type */}

        {/* 1. SCRIPTURE */}
        {card.type === 'scripture' && (
          <div className="space-y-2">
            <div className="p-3.5 rounded-xl bg-neutral-50 border-l-4 border-l-neutral-900 border border-neutral-200 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-900">
                  {card.scriptureReference}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white border border-neutral-200 text-neutral-600">
                  {card.bibleVersion || 'NIV'}
                </span>
              </div>
              <blockquote className="text-sm sm:text-base font-serif italic text-neutral-800 leading-relaxed pt-0.5">
                "{card.content}"
              </blockquote>
            </div>
          </div>
        )}

        {/* 2. REFLECTION */}
        {card.type === 'reflection' && (
          <div className="space-y-1.5">
            {card.title && (
              <h4 className="text-sm sm:text-base font-bold text-neutral-900 tracking-tight leading-snug">
                {card.title}
              </h4>
            )}
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
              {card.content}
            </p>
          </div>
        )}

        {/* 3. MEDIA LINK */}
        {card.type === 'media' && (
          <div className="space-y-2.5">
            {/* YouTube video thumbnail preview */}
            {card.mediaType === 'youtube' && (
              <div
                onClick={() => onOpenMediaModal(card)}
                className="group relative aspect-video w-full rounded-xl overflow-hidden cursor-pointer bg-neutral-900 border border-neutral-200"
              >
                {card.mediaThumbnail && (
                  <img
                    src={card.mediaThumbnail}
                    alt={card.mediaTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-11 h-11 rounded-full bg-neutral-900 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="font-semibold line-clamp-1">{card.mediaTitle}</span>
                  {card.mediaDuration && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/70">
                      {card.mediaDuration}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Spotify Mini Player */}
            {card.mediaType === 'spotify' && (
              <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={card.mediaThumbnail || 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=250&q=80'}
                      alt={card.mediaTitle}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => setIsPlayingSpotify(!isPlayingSpotify)}
                      className="absolute inset-0 bg-black/30 text-white flex items-center justify-center hover:bg-black/50 cursor-pointer"
                    >
                      {isPlayingSpotify ? (
                        <Pause className="w-4 h-4 fill-current" />
                      ) : (
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      )}
                    </button>
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold uppercase text-emerald-700 flex items-center gap-1">
                      <Headphones className="w-3 h-3" /> Spotify Audio
                    </span>
                    <h5 className="text-xs font-bold text-neutral-900 truncate">
                      {card.mediaTitle}
                    </h5>
                    <p className="text-[11px] text-neutral-500 truncate">{card.mediaArtist}</p>
                  </div>
                </div>

                <div className="w-full bg-neutral-200 h-1 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full rounded-full"
                    style={{ width: `${spotifyProgress}%` }}
                  />
                </div>
              </div>
            )}

            {card.content && (
              <p className="text-xs text-neutral-600 leading-relaxed">{card.content}</p>
            )}
          </div>
        )}

        {/* 4. VOICE MEMO */}
        {card.type === 'voice' && (
          <div className="space-y-2">
            {card.title && (
              <h5 className="text-xs font-bold text-neutral-900">{card.title}</h5>
            )}

            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center gap-3">
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="w-9 h-9 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white flex items-center justify-center shadow-xs shrink-0 transition-colors cursor-pointer"
                aria-label={isPlayingAudio ? 'Pause' : 'Play'}
              >
                {isPlayingAudio ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                )}
              </button>

              {/* Sound Wave Bars */}
              <div className="flex-1 flex items-center gap-1 h-7">
                {(card.waveformSample || [25, 45, 75, 90, 80, 60, 40, 65, 88, 95, 70, 50]).map(
                  (val, idx) => {
                    const barProgress = (idx / 12) * 100
                    const isPassed = isPlayingAudio && audioProgress >= barProgress

                    return (
                      <div
                        key={idx}
                        style={{ height: `${val}%` }}
                        className={`flex-1 rounded-full transition-colors ${
                          isPassed ? 'bg-neutral-900' : isPlayingAudio ? 'bg-neutral-500' : 'bg-neutral-300'
                        }`}
                      />
                    )
                  }
                )}
              </div>

              <span className="text-[11px] font-mono text-neutral-500 shrink-0">
                {card.voiceDurationSeconds || 45}s
              </span>
            </div>

            {card.voiceTranscript && (
              <p className="text-[11px] text-neutral-500 italic bg-neutral-50 p-2 rounded-lg border border-neutral-100">
                "{card.voiceTranscript}"
              </p>
            )}
          </div>
        )}

        {/* Tags Row */}
        {card.tags && card.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {card.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600 hover:text-neutral-900 border border-neutral-200/60"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Interactive Reaction & Comment Bar */}
        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between gap-2">
          {/* Reaction Pills: Amen (Emerald), Inspiring (Amber), Heart (Rose) */}
          <div className="flex items-center gap-1.5">
            {/* Amen Reaction */}
            <button
              onClick={() => onReact(card.id, 'amen')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                card.userReactions.amen
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold shadow-xs'
                  : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
              }`}
              title="Amen - In agreement"
            >
              <ShieldCheck className={`w-3.5 h-3.5 ${card.userReactions.amen ? 'text-emerald-600' : 'text-neutral-500'}`} />
              <span>{card.reactions.amen}</span>
            </button>

            {/* Inspiring Reaction */}
            <button
              onClick={() => onReact(card.id, 'inspiring')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                card.userReactions.inspiring
                  ? 'bg-amber-50 border-amber-300 text-amber-800 font-bold shadow-xs'
                  : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
              }`}
              title="Inspiring - Kingdom Insight"
            >
              <Lightbulb className={`w-3.5 h-3.5 ${card.userReactions.inspiring ? 'text-amber-500' : 'text-neutral-500'}`} />
              <span>{card.reactions.inspiring}</span>
            </button>

            {/* Heart Reaction */}
            <button
              onClick={() => onReact(card.id, 'heart')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                card.userReactions.heart
                  ? 'bg-rose-50 border-rose-300 text-rose-800 font-bold shadow-xs'
                  : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
              }`}
              title="Heart - Encouraged"
            >
              <Heart className={`w-3.5 h-3.5 ${card.userReactions.heart ? 'text-rose-600 fill-current' : 'text-neutral-500'}`} />
              <span>{card.reactions.heart}</span>
            </button>
          </div>

          {/* Right Actions: Discussion & Share */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsCommentsOpen(!isCommentsOpen)}
              className={`px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer ${
                isCommentsOpen ? 'bg-neutral-100 text-neutral-900 font-semibold' : 'text-neutral-500 hover:bg-neutral-100'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{card.comments.length}</span>
              {isCommentsOpen ? (
                <ChevronUp className="w-3 h-3 text-neutral-400" />
              ) : (
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              )}
            </button>

            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                isBookmarked ? 'text-amber-500' : 'text-neutral-400 hover:text-neutral-700'
              }`}
              title="Bookmark post"
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
            </button>

            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
              title="Copy share link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Expandable Inline Discussion Thread */}
        {isCommentsOpen && (
          <div className="pt-3 border-t border-neutral-100 space-y-3">
            <div className="flex items-center justify-between text-xs text-neutral-500 font-semibold">
              <span>Discussion Thread ({card.comments.length})</span>
              <span className="text-[10px] font-normal">Live team replies</span>
            </div>

            {/* Comments List */}
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {card.comments.length > 0 ? (
                card.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200/70 space-y-1"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <img
                          src={comment.author.avatar}
                          alt={comment.author.name}
                          className="w-4 h-4 rounded-full object-cover"
                        />
                        <span className="font-bold text-neutral-900 text-[11px]">
                          {comment.author.name}
                        </span>
                      </div>
                      <span className="text-[10px] text-neutral-400 font-mono">
                        {comment.createdAt}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-700 pl-5 leading-relaxed">
                      {comment.content}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-neutral-400 text-center py-2">
                  No replies yet. Start the conversation below!
                </p>
              )}
            </div>

            {/* Inline Comment Input */}
            <form onSubmit={handleCommentSubmit} className="flex items-center gap-2 pt-1">
              <input
                type="text"
                placeholder="Write a reply or team prayer..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
              />
              <button
                type="submit"
                disabled={!commentInput.trim()}
                className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold disabled:opacity-40 transition-colors shadow-xs cursor-pointer"
              >
                <Send className="w-3 h-3" />
              </button>
            </form>
          </div>
        )}
      </div>
    </article>
  )
}

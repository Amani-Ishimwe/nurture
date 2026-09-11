import React, { useState } from 'react'
import {
  FileText,
  Headphones,
  Flame,
  Award,
  Download,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  Video,
  ExternalLink,
  BookOpen,
  Clock,
  Sparkles,
  TrendingUp,
  Share2
} from 'lucide-react'
import { Sprint, PinnedResource } from '../types/sprint'
import { mockAuthors, initialReflectionCards } from '../data/mockSprintData'

interface RightUtilityRailProps {
  sprint: Sprint
  pinnedResources: PinnedResource[]
  onOpenResource: (resource: PinnedResource) => void
}

export const RightUtilityRail: React.FC<RightUtilityRailProps> = ({
  sprint,
  pinnedResources,
  onOpenResource,
}) => {
  const [upvotes, setUpvotes] = useState(24)
  const [hasUpvoted, setHasUpvoted] = useState(false)

  const topContributors = [...mockAuthors].sort((a, b) => (b.streakDays || 0) - (a.streakDays || 0))
  const discussionCards = initialReflectionCards.slice(0, 3)

  const handleUpvote = () => {
    setUpvotes(prev => hasUpvoted ? prev - 1 : prev + 1)
    setHasUpvoted(!hasUpvoted)
  }

  return (
    <aside className="w-80 shrink-0 sticky top-18 h-[calc(100vh-5.5rem)] flex flex-col gap-4 px-4 py-4 glass-panel-sharp border border-neutral-300 dark:border-neutral-800 rounded-xl overflow-y-auto select-none shadow-2xs transition-colors">

      {/* SECTION 1: Featured Sprint of the Day */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-neutral-900 dark:text-white tracking-tight">
            Featured study of the week!
          </span>
          <a
            href={sprint.liveSyncMeetingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-semibold text-neutral-800 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white flex items-center gap-0.5 transition-colors"
          >
            Live Huddle <ChevronRight className="w-3 h-3" />
          </a>
        </div>

        <div className="p-3.5 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md hover:bg-white/95 dark:hover:bg-neutral-900/95 hover:border-neutral-400 dark:hover:border-neutral-700 transition-all flex items-start gap-3 shadow-2xs">
          {/* Icon Badge */}
          <div className="w-11 h-11 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 flex items-center justify-center shrink-0 shadow-xs transition-colors">
            <BookOpen className="w-5 h-5" />
          </div>

          {/* Sprint Info */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700">
                Week {sprint.sprintNumber}
              </span>
              <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-medium">Sprint Active</span>
            </div>
            <p className="text-xs font-bold text-neutral-900 dark:text-white leading-snug truncate mt-0.5">
              {sprint.themeTitle}
            </p>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 line-clamp-2 leading-relaxed">
              {sprint.anchorScripture}
            </p>
            {/* Live sync pill (Green semantic active state) */}
            <div className="mt-2 flex items-center gap-1.5 text-[10px] text-emerald-800 dark:text-emerald-300 font-semibold bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-md px-2 py-0.5 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Huddle · {sprint.liveSyncTime}
            </div>
          </div>

          {/* Upvote Counter Button */}
          <button
            onClick={handleUpvote}
            className={`flex flex-col items-center justify-center gap-0.5 shrink-0 px-2 py-2 rounded-xl border transition-all cursor-pointer ${
              hasUpvoted
                ? 'bg-neutral-900 dark:bg-white border-neutral-900 dark:border-white text-white dark:text-neutral-950 shadow-xs'
                : 'bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-600 hover:text-neutral-900 dark:hover:text-white'
            }`}
            title="Amen / Upvote sprint theme"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
            <span className="text-[11px] font-bold font-mono">{upvotes}</span>
          </button>
        </div>
      </div>

      {/* SECTION 2: Active Discussions */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1.5 tracking-tight">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Active Discussions
          </span>
          <span className="text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 font-mono">
            {discussionCards.length} active
          </span>
        </div>

        <div className="space-y-2">
          {discussionCards.map((card) => (
            <div
              key={card.id}
              className="p-3 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md hover:border-neutral-400 dark:hover:border-neutral-700 hover:bg-white/95 dark:hover:bg-neutral-900/95 transition-all space-y-1.5 shadow-2xs"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <img
                    src={card.author.avatar}
                    alt={card.author.name}
                    className="w-6 h-6 rounded-full object-cover border border-neutral-200 dark:border-neutral-700 shrink-0"
                  />
                  <span className="text-xs font-semibold text-neutral-900 dark:text-white truncate">
                    {card.author.name}
                  </span>
                </div>
                <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono shrink-0">{card.createdAt}</span>
              </div>

              <p className="text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-snug line-clamp-1">
                {card.title || card.content}
              </p>

              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                {card.content}
              </p>

              <div className="flex items-center justify-between pt-1 border-t border-neutral-100 dark:border-neutral-800 text-[11px]">
                <span className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white font-semibold flex items-center gap-1 cursor-pointer">
                  <MessageSquare className="w-3 h-3" />
                  {card.comments.length > 0 ? `${card.comments.length} replies` : 'Reply →'}
                </span>
                {card.isPinned && (
                  <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 font-mono">
                    PINNED
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: Activity Pulse Leaderboard */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1.5 tracking-tight">
            <Award className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300" />
            Activity Pulse
          </span>
          <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 px-2 py-0.5 rounded-full font-mono">
            92% Active
          </span>
        </div>

        <div className="space-y-1.5">
          {topContributors.slice(0, 4).map((author, index) => (
            <div
              key={author.id}
              className="flex items-center gap-2.5 p-2 rounded-lg bg-white/60 dark:bg-neutral-900/60 backdrop-blur-sm border border-neutral-300 dark:border-neutral-800 hover:bg-white/90 dark:hover:bg-neutral-900/90 transition-colors"
            >
              <span className="w-4 text-center font-mono text-[10px] font-bold text-neutral-400 dark:text-neutral-500">
                #{index + 1}
              </span>
              <img
                src={author.avatar}
                alt={author.name}
                className="w-6 h-6 rounded-full object-cover border border-neutral-200 dark:border-neutral-700"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 truncate">{author.name}</p>
                <p className="text-[10px] text-neutral-400 dark:text-neutral-500 truncate">{author.role}</p>
              </div>
              <div className="flex items-center gap-0.5 text-[11px] font-bold font-mono text-neutral-800 dark:text-neutral-200 shrink-0">
                <Flame className="w-3 h-3 fill-current text-amber-500" />
                <span>{author.streakDays || 4}d</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-2 pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400">
          <span>Week Goal: 7-Day Consistency</span>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
        </div>
      </div>

      {/* SECTION 4: Study Guides & Pinned Resources */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400" /> Pinned Resources
          </span>
          <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">Week {sprint.sprintNumber}</span>
        </div>

        <div className="space-y-1.5">
          {pinnedResources.map((res) => {
            const icon =
              res.type === 'pdf' ? (
                <FileText className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300" />
              ) : res.type === 'doc' ? (
                <FileText className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300" />
              ) : (
                <Headphones className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300" />
              )
            return (
              <button
                key={res.id}
                onClick={() => onOpenResource(res)}
                className="w-full text-left p-2.5 rounded-lg bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md border border-neutral-300 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700 hover:bg-white dark:hover:bg-neutral-900 hover:shadow-2xs transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="p-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 group-hover:bg-neutral-200/70 dark:group-hover:bg-neutral-700 transition-colors">
                    {icon}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors truncate">
                      {res.title}
                    </p>
                    <span className="text-[10px] text-neutral-400 dark:text-neutral-500 block truncate">
                      {res.badgeText}
                    </span>
                  </div>
                </div>
                <Download className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-white shrink-0 transition-colors" />
              </button>
            )
          })}
        </div>
      </div>
    </aside>
  )
}

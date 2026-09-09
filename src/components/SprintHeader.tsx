import React, { useState, useEffect } from 'react'
import {
  Sparkles,
  Video,
  Clock,
  BookOpen,
  Layers,
  PenTool,
  Film,
  Headphones,
  Mic,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Archive,
  Search,
  Filter,
  Users,
  Quote,
  Flame,
  Radio
} from 'lucide-react'
import { Sprint, ContentType } from '../types/sprint'

interface SprintHeaderProps {
  sprint: Sprint
  selectedFilter: ContentType | 'all'
  onSelectFilter: (filter: ContentType | 'all') => void
  selectedTag: string | null
  onSelectTag: (tag: string | null) => void
  searchQuery: string
  onSearchChange: (q: string) => void
  filterCounts: Record<ContentType | 'all', number>
  onOpenLiveSync: () => void
  onOpenVaults: () => void
  onOpenComposer: () => void
}

export const SprintHeader: React.FC<SprintHeaderProps> = ({
  sprint,
  selectedFilter,
  onSelectFilter,
  selectedTag,
  onSelectTag,
  searchQuery,
  onSearchChange,
  filterCounts,
  onOpenLiveSync,
  onOpenVaults,
  onOpenComposer,
}) => {
  // Live ticking countdown to the evening sync (8:00 PM EST)
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 })

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return { hours: 23, minutes: 59, seconds: 59 }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const tagsList = ['#Leadership', '#Servanthood', '#Worship', '#Hospitality', '#Excellence', '#Prayer']

  const filterButtons: Array<{ id: ContentType | 'all'; label: string; icon: React.ReactNode }> = [
    { id: 'all', label: 'All Feed', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'scripture', label: 'Scriptures', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'reflection', label: 'Reflections', icon: <PenTool className="w-3.5 h-3.5" /> },
    { id: 'media', label: 'YouTube & Podcasts', icon: <Film className="w-3.5 h-3.5" /> },
    { id: 'voice', label: 'Voice Notes', icon: <Mic className="w-3.5 h-3.5" /> },
  ]

  return (
    <header className="relative w-full border-b border-white/10 bg-black/60 backdrop-blur-xl">
      {/* Top Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between border-b border-white/5">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-black border border-[#2CFF05]/40 flex items-center justify-center glow-green-sm text-[#2CFF05]">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-black tracking-tight text-white font-sans">
                Nur<span className="text-[#2CFF05]">ture</span>
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#2CFF05]/15 border border-[#2CFF05]/30 text-[#2CFF05]">
                Sprint #{sprint.sprintNumber}
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-medium">Collaborative 7-Day Study Hub</p>
          </div>
        </div>

        {/* Global Quick Actions */}
        <div className="flex items-center gap-2.5">
          {/* Join Live Sync Button */}
          <button
            onClick={onOpenLiveSync}
            className="group relative inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-[#2CFF05] text-black font-bold text-xs sm:text-sm tracking-tight transition-all duration-200 hover:bg-[#3bf919] hover:shadow-[0_0_20px_rgba(44,255,5,0.4)] active:scale-95"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
            </span>
            <Video className="w-4 h-4 text-black" />
            <span className="hidden sm:inline">Join Live Sync</span>
            <span className="sm:hidden">Sync</span>
            <span className="hidden md:inline text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-black/15">
              Google Meet
            </span>
          </button>

          {/* Vaults & Archives Trigger */}
          <button
            onClick={onOpenVaults}
            className="p-2 sm:px-3 sm:py-2 rounded-xl glass-panel text-zinc-300 hover:text-white hover:border-white/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
            title="Browse past sprint archives and engagement analytics"
          >
            <Archive className="w-4 h-4 text-[#BF00FF]" />
            <span className="hidden sm:inline">Vaults & Stats</span>
          </button>
        </div>
      </div>

      {/* Main Sprint Hero Hub */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left Column: Current Study Theme & Metadata (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-[11px] font-bold tracking-widest uppercase text-[#2CFF05] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#2CFF05]" />
                  Active 7-Day Sprint Focus
                </span>
                <span className="text-zinc-600">•</span>
                <span className="text-xs text-zinc-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                  {sprint.startDate} - {sprint.endDate}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-none mb-2">
                {sprint.themeTitle}
              </h1>

              <p className="text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed">
                {sprint.themeSubtitle}
              </p>
            </div>

            {/* Central Anchor Scripture Card */}
            <div className="p-4 sm:p-5 rounded-2xl glass-panel border-l-4 border-l-[#2CFF05] border-t-white/10 border-r-white/10 border-b-white/10 relative overflow-hidden glow-green-sm">
              <Quote className="absolute right-3 top-3 w-16 h-16 text-white/5 pointer-events-none" />
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#2CFF05]/15 border border-[#2CFF05]/30 text-[#2CFF05]">
                  Anchor Scripture
                </span>
                <span className="text-xs font-semibold text-white tracking-wide">
                  {sprint.anchorReference}
                </span>
              </div>
              <blockquote className="text-sm sm:text-base text-zinc-200 font-serif italic leading-relaxed">
                "{sprint.anchorScripture}"
              </blockquote>
            </div>
          </div>

          {/* Right Column: Day Progress Stepper & Live Countdown Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            {/* Live Countdown Card */}
            <div className="p-4 rounded-2xl glass-panel border border-white/15 bg-zinc-950/70 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#2CFF05]/15 border border-[#2CFF05]/30 text-[#2CFF05]">
                  <Clock className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    Live Sync Countdown
                  </p>
                  <p className="text-xs text-zinc-300 font-medium">Tonight @ 8:00 PM EST</p>
                </div>
              </div>

              {/* Ticking Numbers */}
              <div className="flex items-center gap-1.5 font-mono">
                <div className="text-center bg-black/60 border border-white/10 px-2 py-1 rounded-lg">
                  <span className="text-sm sm:text-base font-bold text-white">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="block text-[8px] text-zinc-500 uppercase">hrs</span>
                </div>
                <span className="text-zinc-600 font-bold">:</span>
                <div className="text-center bg-black/60 border border-white/10 px-2 py-1 rounded-lg">
                  <span className="text-sm sm:text-base font-bold text-white">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="block text-[8px] text-zinc-500 uppercase">min</span>
                </div>
                <span className="text-zinc-600 font-bold">:</span>
                <div className="text-center bg-black/60 border border-[#2CFF05]/30 px-2 py-1 rounded-lg">
                  <span className="text-sm sm:text-base font-bold text-[#2CFF05]">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="block text-[8px] text-[#2CFF05]/70 uppercase">sec</span>
                </div>
              </div>
            </div>

            {/* 7-Day Sprint Timeline Stepper */}
            <div className="p-4 rounded-2xl glass-panel border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#2CFF05]" />
                  Sprint Roadmap: Day {sprint.currentDay} of {sprint.totalDays}
                </span>
                <span className="text-[11px] text-[#2CFF05] font-mono font-semibold">
                  14% Completed
                </span>
              </div>

              {/* 7-Day Grid Steps */}
              <div className="grid grid-cols-7 gap-1.5">
                {sprint.dailyThemes.map((dayItem) => {
                  const isActive = dayItem.day === sprint.currentDay
                  const isCompleted = dayItem.day < sprint.currentDay

                  return (
                    <div
                      key={dayItem.day}
                      title={`Day ${dayItem.day}: ${dayItem.title} (${dayItem.dateLabel})`}
                      className={`group relative p-2 rounded-xl text-center border transition-all cursor-default ${
                        isActive
                          ? 'bg-[#2CFF05]/20 border-[#2CFF05] glow-green-sm text-white'
                          : isCompleted
                            ? 'bg-white/10 border-white/20 text-zinc-300'
                            : 'bg-black/40 border-white/5 text-zinc-600'
                      }`}
                    >
                      <div className="text-[9px] uppercase font-bold tracking-wider">
                        D{dayItem.day}
                      </div>
                      <div className="flex justify-center mt-1">
                        {isActive ? (
                          <span className="w-2 h-2 rounded-full bg-[#2CFF05] animate-ping" />
                        ) : isCompleted ? (
                          <CheckCircle2 className="w-3 h-3 text-[#2CFF05]" />
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="flex items-center justify-between text-[11px] text-zinc-400 bg-black/40 px-3 py-1.5 rounded-xl border border-white/5">
                <span className="truncate">
                  Today's Topic: <strong className="text-white font-semibold">The Servant's Heart</strong>
                </span>
                <span className="text-[10px] text-[#2CFF05] font-mono shrink-0">Mark 10:42-45</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Content Type Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {filterButtons.map((btn) => {
              const count = filterCounts[btn.id]
              const isSelected = selectedFilter === btn.id

              return (
                <button
                  key={btn.id}
                  onClick={() => onSelectFilter(btn.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-white text-black font-bold shadow-md shadow-white/10'
                      : 'glass-panel text-zinc-300 hover:text-white hover:border-white/30'
                  }`}
                >
                  {btn.icon}
                  <span>{btn.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isSelected ? 'bg-black text-white' : 'bg-white/10 text-zinc-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Search and Quick Add Reflection Button */}
          <div className="flex items-center gap-2">
            {/* Search Input */}
            <div className="relative flex-1 md:w-60">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
              <input
                type="text"
                placeholder="Search reflections..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-black/60 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#2CFF05]/50 transition-colors"
              />
            </div>

            {/* Quick Add Button */}
            <button
              onClick={onOpenComposer}
              className="px-4 py-1.5 rounded-xl bg-[#2CFF05] text-black font-bold text-xs flex items-center gap-1.5 glow-green-sm hover:scale-105 active:scale-95 transition-all shrink-0"
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Add Reflection</span>
            </button>
          </div>
        </div>

        {/* Tag Filters Row */}
        <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-[11px] uppercase tracking-wider font-bold text-zinc-500 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Tags:
          </span>
          <button
            onClick={() => onSelectTag(null)}
            className={`px-2.5 py-0.5 rounded-lg text-[11px] font-mono transition-colors ${
              selectedTag === null
                ? 'bg-zinc-700 text-white font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            All
          </button>
          {tagsList.map((tag) => (
            <button
              key={tag}
              onClick={() => onSelectTag(selectedTag === tag ? null : tag)}
              className={`px-2.5 py-0.5 rounded-lg text-[11px] font-mono border transition-all ${
                selectedTag === tag
                  ? 'bg-[#BF00FF]/20 border-[#BF00FF] text-[#BF00FF] font-bold glow-purple-sm'
                  : 'bg-black/30 border-white/5 text-zinc-400 hover:border-white/20 hover:text-zinc-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}


'use client'

﻿import React, { useState, useMemo } from 'react'
import {
  currentSprint as defaultSprint,
  archivedSprints as defaultArchivedSprints,
  initialReflectionCards,
  currentUserChiefUsher,
  initialAnnouncement,
  initialPinnedResources,
  mockMinistries,
} from '../data/mockSprintData'
import {
  Sprint,
  ReflectionCardItem,
  ContentType,
  Comment,
  NavTab,
  CommunityMinistry,
  PinnedResource,
  AnnouncementBanner,
  Author,
  UserProfileSettings,
  WorkspaceConfig,
} from '../types/sprint'
import { LeftSidebar } from '../components/LeftSidebar'
import { RightUtilityRail } from '../components/RightUtilityRail'
import { SprintHeroCard } from '../components/SprintHeroCard'
import { ReflectionComposer } from '../components/ReflectionComposer'
import { ReflectionCard } from '../components/ReflectionCard'
import { AdminCommandCenter } from '../components/AdminCommandCenter'
import { VaultView } from '../components/VaultView'
import { TeamRosterView } from '../components/TeamRosterView'
import { SettingsView } from '../components/SettingsView'
import { MediaModal } from '../components/MediaModal'
import {
  Megaphone,
  X,
  Layers,
  BookOpen,
  PenTool,
  Film,
  Headphones,
  Search,
  CheckCircle,
  Bell,
  Flame,
  Sparkles,
  ChevronDown,
  History,
  Calendar,
  ArrowLeft,
  Clock,
  Archive,
  Settings,
  Sun,
  Moon
} from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

export default SageApp

function SageApp() {
  const { theme, resolvedTheme, toggleTheme } = useTheme()
  // Navigation & Community State
  const [currentTab, setCurrentTab] = useState<NavTab>('feed')
  const [selectedMinistry, setSelectedMinistry] = useState<CommunityMinistry>(mockMinistries[0])
  const [isAdminMode, setIsAdminMode] = useState<boolean>(true)

  // User Profile & Workspace Settings State
  const [userProfile, setUserProfile] = useState<UserProfileSettings>({
    name: currentUserChiefUsher.name,
    role: currentUserChiefUsher.role,
    email: 'marcus.vance@gracecity.org',
    avatar: currentUserChiefUsher.avatar,
    team: currentUserChiefUsher.team,
    bio: 'Serving in the house of God with humility, joy, and excellence. Passionate about creating an atmosphere where every soul feels welcomed as an honored guest.',
    preferredBible: 'ESV',
    reminderTime: '07:00',
    emailDigest: true,
    soundEnabled: true,
    streakGoalDays: 7,
    isWorkspaceOwner: true,
  })

  const [workspaceConfig, setWorkspaceConfig] = useState<WorkspaceConfig>({
    churchName: 'Grace City Community Church',
    slug: 'gracecity',
    themeColor: '#0a0a0a',
    defaultMeetingUrl: 'https://meet.google.com/sage-ushers-sync',
    sprintCadenceDays: 7,
    autoArchiveToVault: true,
    allowAnonymousReflections: true,
    requireAdminApproval: false,
    primaryMinistryFocus: 'Excellence in hospitality, sanctuary stewardship, and prayerful servant leadership.',
    ownerId: currentUserChiefUsher.id,
    ownerName: currentUserChiefUsher.name,
    ownerRole: currentUserChiefUsher.role,
    ownerEmail: 'marcus.vance@gracecity.org',
  })

  // Dynamic Current User derived from UserProfile
  const currentUser: Author = useMemo(() => ({
    ...currentUserChiefUsher,
    name: userProfile.name,
    role: userProfile.role,
    avatar: userProfile.avatar,
    team: userProfile.team,
    isWorkspaceOwner: userProfile.isWorkspaceOwner ?? true,
  }), [userProfile])

  // Sprint & Content Data State
  const [activeSprint, setActiveSprint] = useState<Sprint>(defaultSprint)
  const [archivedSprintsList, setArchivedSprintsList] = useState<Sprint[]>(defaultArchivedSprints)
  const [cards, setCards] = useState<ReflectionCardItem[]>(initialReflectionCards)
  const [announcement, setAnnouncement] = useState<AnnouncementBanner>(initialAnnouncement)
  const [pinnedResources, setPinnedResources] = useState<PinnedResource[]>(initialPinnedResources)

  // History / Week Navigation State
  const [selectedWeek, setSelectedWeek] = useState<number | 'all'>(12)
  const [isWeekDropdownOpen, setIsWeekDropdownOpen] = useState(false)

  // Filter & Search State
  const [feedViewMode, setFeedViewMode] = useState<'all' | 'newest' | 'trending'>('newest')
  const [selectedFilter, setSelectedFilter] = useState<ContentType | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Modals & UI Feedback
  const [activeMediaCard, setActiveMediaCard] = useState<ReflectionCardItem | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [isBannerDismissed, setIsBannerDismissed] = useState(false)

  const allSprintsList = useMemo(() => [defaultSprint, ...archivedSprintsList], [archivedSprintsList])

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  // Switch week handler
  const handleSelectWeek = (weekNum: number | 'all') => {
    setSelectedWeek(weekNum)
    setIsWeekDropdownOpen(false)

    if (weekNum === 'all') {
      setActiveSprint(defaultSprint)
      showToast('Viewing combined history from all weeks')
    } else {
      const foundSprint = allSprintsList.find((s) => s.sprintNumber === weekNum)
      if (foundSprint) {
        setActiveSprint(foundSprint)
        showToast(
          weekNum === 12
            ? 'Viewing Current Sprint (Week 12)'
            : `Switched to Week ${weekNum} Historical Archive`
        )
      }
    }
  }

  const handleReact = (cardId: string, reactionType: 'amen' | 'inspiring' | 'heart') => {
    setCards((prevCards) =>
      prevCards.map((card) => {
        if (card.id !== cardId) return card
        const currentActive = card.userReactions[reactionType]
        const countDelta = currentActive ? -1 : 1
        return {
          ...card,
          reactions: {
            ...card.reactions,
            [reactionType]: Math.max(0, card.reactions[reactionType] + countDelta),
          },
          userReactions: {
            ...card.userReactions,
            [reactionType]: !currentActive,
          },
        }
      })
    )
  }

  const handleAddComment = (cardId: string, commentText: string) => {
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      author: currentUserChiefUsher,
      content: commentText,
      createdAt: 'Just now',
      likes: 0,
      hasLiked: false,
    }
    setCards((prevCards) =>
      prevCards.map((card) => {
        if (card.id !== cardId) return card
        return { ...card, comments: [newComment, ...card.comments] }
      })
    )
    showToast('Reply published to discussion thread')
  }

  const handleAddReflection = (newCard: ReflectionCardItem) => {
    // Attach current selected week number
    const cardWithWeek: ReflectionCardItem = {
      ...newCard,
      sprintNumber: typeof selectedWeek === 'number' ? selectedWeek : 12,
    }
    setCards((prev) => [cardWithWeek, ...prev])
    showToast('Reflection shared with the team!')
  }

  const handleTogglePinCard = (cardId: string) => {
    setCards((prevCards) => {
      const currentPinnedCount = prevCards.filter((c) => c.isPinned).length
      return prevCards.map((card) => {
        if (card.id !== cardId) return card
        if (!card.isPinned && currentPinnedCount >= 3) {
          showToast('Maximum 3 posts can be pinned at once.')
          return card
        }
        const willPin = !card.isPinned
        showToast(willPin ? 'Post pinned to top of feed' : 'Post unpinned')
        return { ...card, isPinned: willPin }
      })
    })
  }

  const handleToggleHideCard = (cardId: string) => {
    setCards((prevCards) =>
      prevCards.map((card) => {
        if (card.id !== cardId) return card
        const willHide = !card.isHidden
        showToast(willHide ? 'Post hidden from member feed' : 'Post unhidden')
        return { ...card, isHidden: willHide }
      })
    )
  }

  const handleUpdateSprint = (updated: Partial<Sprint>) => {
    setActiveSprint((prev) => ({ ...prev, ...updated }))
  }

  const handleArchiveCurrentSprint = () => {
    const archived: Sprint = { ...activeSprint, status: 'archived' }
    setArchivedSprintsList((prev) => [archived, ...prev])
    showToast(`Sprint #${activeSprint.sprintNumber} archived into Vault!`)
    setCurrentTab('vault')
  }

  const handleOpenResource = (res: PinnedResource) => {
    showToast(`Opening ${res.title}...`)
  }

  // Filtered Cards Logic: Filter by Week + Content Filter + Tag + Search + Sort
  const filteredCards = useMemo(() => {
    return cards
      .filter((card) => {
        // Week filter
        if (selectedWeek !== 'all') {
          const cardWeek = card.sprintNumber || 12
          if (cardWeek !== selectedWeek) return false
        }
        // Content filter
        if (selectedFilter !== 'all' && card.type !== selectedFilter) return false
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase()
          const matchContent = card.content.toLowerCase().includes(q)
          const matchAuthor = card.author.name.toLowerCase().includes(q)
          const matchTitle = card.title?.toLowerCase().includes(q) || false
          const matchRef = card.scriptureReference?.toLowerCase().includes(q) || false
          if (!matchContent && !matchAuthor && !matchTitle && !matchRef) return false
        }
        return true
      })
      .sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1
        if (!a.isPinned && b.isPinned) return 1
        if (feedViewMode === 'trending') {
          const totalA = a.reactions.amen + a.reactions.inspiring + a.reactions.heart + a.comments.length
          const totalB = b.reactions.amen + b.reactions.inspiring + b.reactions.heart + b.comments.length
          return totalB - totalA
        }
        return 0
      })
  }, [cards, selectedWeek, selectedFilter, searchQuery, feedViewMode])

  const filterPills: Array<{ id: ContentType | 'all'; label: string; icon: React.ReactNode }> = [
    { id: 'all',        label: 'All',        icon: <Layers   className="w-3.5 h-3.5" /> },
    { id: 'scripture',  label: 'Scriptures', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'reflection', label: 'Reflections',icon: <PenTool  className="w-3.5 h-3.5" /> },
    { id: 'media',      label: 'Videos',     icon: <Film     className="w-3.5 h-3.5" /> },
    { id: 'voice',      label: 'Audio Notes',icon: <Headphones className="w-3.5 h-3.5" /> },
  ]

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#09090b] text-neutral-900 dark:text-neutral-100 font-sans selection:bg-neutral-900 selection:text-white dark:selection:bg-neutral-100 dark:selection:text-neutral-950 transition-colors duration-200">

      {/* ── 1. TOP NAVBAR (Bounded max-width, never touches screen edges) ── */}
      <header className="fixed top-0 left-0 right-0 z-40 h-14 bg-white/80 dark:bg-[#0f0f12]/85 backdrop-blur-xl border-b border-neutral-300 dark:border-neutral-800 shadow-2xs transition-colors">
        <div className="max-w-[1280px] w-full mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-4">
          
          {/* Left: Brand Identity with Sage Logo + Interactive Week Selector */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8.5 h-8.5 rounded-lg overflow-hidden flex items-center justify-center shadow-2xs border border-neutral-200 dark:border-neutral-800 bg-[#F9F8F6] shrink-0 transition-transform">
              <img
                src="/sage.svg"
                alt="Sage Logo"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold tracking-tight text-neutral-950 dark:text-white leading-none">
                Sage
              </h1>

              {/* Interactive Week History Dropdown Trigger */}
              <div className="relative">
                <button
                  onClick={() => setIsWeekDropdownOpen(!isWeekDropdownOpen)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium border transition-all cursor-pointer ${
                    selectedWeek === 12
                      ? 'bg-neutral-100/90 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600'
                      : 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 border-neutral-900 dark:border-white font-bold hover:bg-neutral-800 dark:hover:bg-neutral-100 shadow-2xs'
                  }`}
                  title="Click to browse previous weeks history"
                >
                  <History className={`w-3 h-3 ${selectedWeek === 12 ? 'text-neutral-500 dark:text-neutral-400' : 'text-neutral-300 dark:text-neutral-600'}`} />
                  <span>{selectedWeek === 'all' ? 'All Weeks' : `Week ${selectedWeek}`}</span>
                  {selectedWeek !== 12 && selectedWeek !== 'all' && (
                    <span className="text-[9px] font-sans font-bold uppercase tracking-wider px-1 bg-neutral-800 dark:bg-neutral-200 text-neutral-200 dark:text-neutral-800 rounded">
                      Archive
                    </span>
                  )}
                  <ChevronDown className={`w-3 h-3 ${selectedWeek === 12 ? 'text-neutral-400' : 'text-neutral-300 dark:text-neutral-600'} transition-transform ${isWeekDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Week Selector Popover */}
                {isWeekDropdownOpen && (
                  <div className="absolute left-0 top-full mt-2 w-72 glass-panel-sharp border border-neutral-300 dark:border-neutral-800 rounded-xl shadow-xl p-2 z-50 space-y-1 animate-in fade-in slide-in-from-top-1 bg-white/95 dark:bg-neutral-900/95">
                    <div className="px-2.5 py-1.5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                        Study Sprints History
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
                        {allSprintsList.length} Weeks Available
                      </span>
                    </div>

                    <div className="space-y-0.5 max-h-64 overflow-y-auto pt-1">
                      {allSprintsList.map((sprint) => {
                        const isSelected = selectedWeek === sprint.sprintNumber
                        const isActiveSprint = sprint.sprintNumber === 12

                        return (
                          <button
                            key={sprint.id}
                            onClick={() => handleSelectWeek(sprint.sprintNumber)}
                            className={`w-full text-left p-2 rounded-lg text-xs flex items-start justify-between transition-colors border ${
                              isSelected
                                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-semibold border-neutral-900 dark:border-white shadow-2xs'
                                : 'border-transparent text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:border-neutral-200 dark:hover:border-neutral-700'
                            }`}
                          >
                            <div className="min-w-0 flex-1 pr-2">
                              <div className="flex items-center gap-1.5">
                                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                                  isSelected 
                                    ? 'bg-neutral-800 dark:bg-neutral-200 text-neutral-200 dark:text-neutral-800' 
                                    : isActiveSprint 
                                      ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900' 
                                      : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                                }`}>
                                  W{sprint.sprintNumber}
                                </span>
                                <span className={`font-semibold truncate ${isSelected ? 'text-white dark:text-neutral-950' : 'text-neutral-900 dark:text-neutral-100'}`}>
                                  {sprint.themeTitle.split(':')[1]?.trim() || sprint.themeTitle}
                                </span>
                              </div>
                              <p className={`text-[10px] truncate mt-0.5 ${isSelected ? 'text-neutral-300 dark:text-neutral-600' : 'text-neutral-400 dark:text-neutral-500'}`}>
                                {sprint.startDate} – {sprint.endDate}
                              </p>
                            </div>
                            <span className={`text-[10px] font-mono shrink-0 mt-0.5 ${isSelected ? 'text-neutral-300 dark:text-neutral-600' : 'text-neutral-400 dark:text-neutral-500'}`}>
                              {sprint.totalContributions} posts
                            </span>
                          </button>
                        )
                      })}

                      {/* All Weeks Combined Option */}
                      <button
                        onClick={() => handleSelectWeek('all')}
                        className={`w-full text-left p-2 rounded-lg text-xs flex items-center justify-between transition-colors border ${
                          selectedWeek === 'all'
                            ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-semibold border-neutral-900 dark:border-white shadow-2xs'
                            : 'border-transparent text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:border-neutral-200 dark:hover:border-neutral-700'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <Layers className={`w-3.5 h-3.5 ${selectedWeek === 'all' ? 'text-white dark:text-neutral-950' : 'text-neutral-500 dark:text-neutral-400'}`} />
                          <span>View All Weeks Combined History</span>
                        </div>
                        <span className={`text-[10px] font-mono ${selectedWeek === 'all' ? 'text-neutral-300 dark:text-neutral-600' : 'text-neutral-400 dark:text-neutral-500'}`}>All</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Center: Feed Segmentation Mode (NEWEST / TRENDING / SCRIPTURE) */}
          {currentTab === 'feed' ? (
            <div className="hidden md:flex items-center p-0.5 rounded-lg bg-neutral-200/50 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-300 dark:border-neutral-800">
              <button
                onClick={() => setFeedViewMode('newest')}
                className={`px-3.5 py-1 rounded-md text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                  feedViewMode === 'newest'
                    ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-2xs'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                NEWEST
              </button>
              <button
                onClick={() => setFeedViewMode('trending')}
                className={`px-3.5 py-1 rounded-md text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                  feedViewMode === 'trending'
                    ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-2xs'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                TRENDING
              </button>
              <button
                onClick={() => {
                  setFeedViewMode('all')
                  setSelectedFilter('scripture')
                }}
                className={`px-3.5 py-1 rounded-md text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                  feedViewMode === 'all' && selectedFilter === 'scripture'
                    ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-2xs'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                SCRIPTURE
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center text-xs font-semibold text-neutral-600 dark:text-neutral-400">
              {currentTab === 'vault'
                ? 'Archives & Vault'
                : currentTab === 'roster'
                  ? 'Team Directory'
                  : currentTab === 'admin'
                    ? 'Admin Command Center'
                    : 'Settings & Preferences'}
            </div>
          )}

          {/* Right: Search + Streak + Theme Toggle + Notifications + Profile */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Search Box */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search reflections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-40 lg:w-48 pl-8 pr-7 py-1.5 rounded-lg bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md border border-neutral-300 dark:border-neutral-800 text-xs text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-400 focus:bg-white dark:focus:bg-neutral-900 transition-all shadow-2xs"
              />
              <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] font-mono text-neutral-400 dark:text-neutral-500 bg-neutral-200/80 dark:bg-neutral-800 px-1.5 py-0.2 rounded pointer-events-none">
                /
              </kbd>
            </div>

            {/* Streak Pill (Monochrome state indicator) */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-300 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-bold font-mono shadow-2xs hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700 transition-all cursor-pointer">
              <Flame className="w-3.5 h-3.5 fill-current text-neutral-900 dark:text-neutral-100" />
              <span>5d Streak</span>
            </div>

            {/* Dark/Light Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer"
              title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} theme`}
              aria-label="Toggle light or dark theme"
            >
              {resolvedTheme === 'dark' ? (
                <Sun className="w-4 h-4 text-neutral-100 animate-in spin-in-180 duration-200" />
              ) : (
                <Moon className="w-4 h-4 text-neutral-900 animate-in spin-in-180 duration-200" />
              )}
            </button>

            {/* Notifications Bell (Emerald dot = active notice state) */}
            <button 
              type="button"
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors relative cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-neutral-950" />
            </button>

            {/* Profile Avatar (Click to open Settings) */}
            <button
              type="button"
              onClick={() => {
                setCurrentTab('settings')
                showToast('Opening Personal Profile & Settings')
              }}
              className="relative cursor-pointer group"
              title="Manage Profile & Settings"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover border border-neutral-300 dark:border-neutral-700 ring-2 ring-neutral-200 dark:ring-neutral-800 group-hover:ring-neutral-400 dark:group-hover:ring-neutral-600 transition-all cursor-pointer"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-neutral-950" />
            </button>
          </div>

        </div>
      </header>

      {/* ── 2. FLOATING ANNOUNCEMENT BANNER (Clean Monochrome State) ── */}
      {announcement.isActive && !isBannerDismissed && (
        <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 pt-16">
          <div className="py-2.5 px-4 rounded-xl text-xs font-medium flex items-center justify-between border glass-card-sharp bg-neutral-100/90 dark:bg-neutral-900/90 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-2xs">
            <div className="flex items-center gap-2.5 min-w-0 pr-4">
              <span className="p-1 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shrink-0 border border-neutral-300 dark:border-neutral-700">
                <Megaphone className="w-3.5 h-3.5" />
              </span>
              <span className="truncate text-xs">
                <strong className="text-neutral-950 dark:text-white font-bold mr-1.5">Announcement:</strong>
                <span className="text-neutral-700 dark:text-neutral-300">{announcement.message}</span>
              </span>
            </div>
            <button
              onClick={() => setIsBannerDismissed(true)}
              className="p-1 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors shrink-0 cursor-pointer"
              title="Dismiss announcement"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ── 3. STRUCTURED 3-COLUMN WORKSPACE CONTAINER ── */}
      <div className={`flex items-start justify-center max-w-[1280px] mx-auto px-4 sm:px-6 w-full gap-5 ${
        announcement.isActive && !isBannerDismissed ? 'pt-3' : 'pt-16'
      }`}>

        {/* LEFT SIDEBAR (240px, Sticky Floating Card) */}
        <LeftSidebar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          currentUser={currentUser}
          isAdminMode={isAdminMode}
          onToggleAdminMode={() => {
            setIsAdminMode(!isAdminMode)
            showToast(isAdminMode ? 'Switched to Member View' : 'Admin View Enabled (Chief Usher)')
          }}
          selectedMinistry={selectedMinistry}
          onSelectMinistry={(m) => {
            setSelectedMinistry(m)
            showToast(`Switched community to ${m.name}`)
          }}
        />

        {/* CENTER FEED (Max-w-[660px], Main Feed Stream) */}
        <main className="flex-1 max-w-[660px] min-w-0 py-4 space-y-4">

          {/* VIEW: SPRINT FEED */}
          {currentTab === 'feed' && (
            <>
              {/* HISTORICAL ARCHIVE NOTICE (When viewing a previous week) */}
              {selectedWeek !== 12 && (
                <div className="p-3.5 rounded-xl glass-card-sharp bg-white/90 dark:bg-neutral-900/90 border border-neutral-300 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs animate-in fade-in">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 shrink-0 border border-neutral-200 dark:border-neutral-700">
                      <Archive className="w-4 h-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-neutral-900 dark:text-neutral-100 truncate">
                        {selectedWeek === 'all'
                          ? 'Browsing Combined Sprints History'
                          : `Viewing Historical Sprint #${activeSprint.sprintNumber}: ${activeSprint.themeTitle}`}
                      </p>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                        {selectedWeek === 'all'
                          ? 'All community posts across past and present weeks'
                          : `${activeSprint.startDate} to ${activeSprint.endDate} · ${activeSprint.totalContributions} Contributions`}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSelectWeek(12)}
                    className="px-3.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-950 font-semibold text-xs transition-all shrink-0 flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    <span>Back to Week 12</span>
                    <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                  </button>
                </div>
              )}

              {/* 1. Quick Week Timeline Selector Strip */}
              <div className="p-2.5 rounded-xl glass-card-sharp border border-neutral-300 dark:border-neutral-800 shadow-2xs flex items-center justify-between gap-2 overflow-x-auto">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-neutral-700 dark:text-neutral-300 shrink-0 pl-1">
                  <History className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
                  <span>Weeks:</span>
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto">
                  {allSprintsList.map((sprint) => {
                    const isSelected = selectedWeek === sprint.sprintNumber
                    const isCurrentActive = sprint.sprintNumber === 12

                    return (
                      <button
                        key={sprint.id}
                        onClick={() => handleSelectWeek(sprint.sprintNumber)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap border transition-all flex items-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 border-neutral-900 dark:border-white shadow-2xs'
                            : isCurrentActive
                              ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border-neutral-400 dark:border-neutral-600 hover:bg-neutral-200/80 dark:hover:bg-neutral-700 font-bold'
                              : 'bg-white/80 dark:bg-neutral-900/80 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-950 dark:hover:text-white'
                        }`}
                      >
                        <span>Week {sprint.sprintNumber}</span>
                        {isCurrentActive && (
                          <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-emerald-400' : 'bg-emerald-500'} animate-pulse`} />
                        )}
                      </button>
                    )
                  })}

                  {/* All button */}
                  <button
                    onClick={() => handleSelectWeek('all')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap border transition-all cursor-pointer ${
                      selectedWeek === 'all'
                        ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 border-neutral-900 dark:border-white shadow-2xs'
                        : 'bg-white/80 dark:bg-neutral-900/80 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    All History
                  </button>
                </div>
              </div>

              {/* 2. Inline Peerlist-style Reflection Composer (Top) */}
              <ReflectionComposer
                currentUser={currentUser}
                onAddReflection={handleAddReflection}
              />

              {/* 3. Sprint Hero Card (Progress & Scripture for selected week) */}
              <SprintHeroCard sprint={activeSprint} />

              {/* 4. Filter Pills & Tag Chips Strip */}
              <div className="space-y-2 pt-1">
                {/* Content Type Filter Pills */}
                <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
                  <div className="flex items-center gap-1.5">
                    {filterPills.map((pill) => {
                      const isSelected = selectedFilter === pill.id
                      return (
                        <button
                          key={pill.id}
                          onClick={() => setSelectedFilter(pill.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all border cursor-pointer ${
                            isSelected
                              ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 border-neutral-900 dark:border-white shadow-2xs'
                              : 'bg-white/80 dark:bg-neutral-900/80 glass-card-sharp border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-700 hover:text-neutral-950 dark:hover:text-white hover:bg-white dark:hover:bg-neutral-800'
                          }`}
                        >
                          {pill.icon}
                          <span>{pill.label}</span>
                        </button>
                      )
                    })}
                  </div>

                  <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 whitespace-nowrap hidden sm:inline font-mono">
                    {filteredCards.length} reflections
                  </span>
                </div>
              </div>

              {/* 5. Feed Stream Cards */}
              <div className="space-y-4 pt-1">
                {filteredCards.length > 0 ? (
                  filteredCards.map((card) => (
                    <ReflectionCard
                      key={card.id}
                      card={card}
                      isAdminMode={isAdminMode}
                      onReact={handleReact}
                      onAddComment={handleAddComment}
                      onTogglePin={handleTogglePinCard}
                      onToggleHide={handleToggleHideCard}
                      onOpenMediaModal={(c) => setActiveMediaCard(c)}
                    />
                  ))
                ) : (
                  <div className="p-10 text-center rounded-xl glass-card-sharp border border-neutral-300 dark:border-neutral-800 shadow-2xs space-y-2">
                    <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                      No reflections found for Week {selectedWeek}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      No cards match your filter or search query. Try switching weeks or sharing a reflection!
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* VIEW: VAULT */}
          {currentTab === 'vault' && (
            <VaultView
              currentSprint={activeSprint}
              archivedSprints={archivedSprintsList}
              onSelectSprint={(sprint) => {
                handleSelectWeek(sprint.sprintNumber)
                setCurrentTab('feed')
                showToast(`Viewing Sprint #${sprint.sprintNumber}`)
              }}
            />
          )}

          {/* VIEW: ROSTER */}
          {currentTab === 'roster' && <TeamRosterView />}

          {/* VIEW: ADMIN */}
          {currentTab === 'admin' && (
            <AdminCommandCenter
              currentSprint={activeSprint}
              cards={cards}
              announcement={announcement}
              onUpdateSprint={handleUpdateSprint}
              onUpdateAnnouncement={setAnnouncement}
              onTogglePinCard={handleTogglePinCard}
              onToggleHideCard={handleToggleHideCard}
              onArchiveCurrentSprint={handleArchiveCurrentSprint}
              onShowToast={showToast}
            />
          )}

          {/* VIEW: SETTINGS */}
          {currentTab === 'settings' && (
            <SettingsView
              profile={userProfile}
              workspace={workspaceConfig}
              isAdminMode={isAdminMode}
              onToggleAdminMode={() => {
                setIsAdminMode(!isAdminMode)
                showToast(isAdminMode ? 'Switched to Member View' : 'Workspace Owner (Admin) Access Restored')
              }}
              onUpdateProfile={(updated) => {
                setUserProfile((prev) => ({ ...prev, ...updated }))
              }}
              onUpdateWorkspace={(updated) => {
                setWorkspaceConfig((prev) => ({ ...prev, ...updated }))
              }}
              onShowToast={showToast}
            />
          )}
        </main>

        {/* RIGHT UTILITY RAIL (300px, Sticky Floating Card) */}
        <RightUtilityRail
          sprint={activeSprint}
          pinnedResources={pinnedResources}
          onOpenResource={handleOpenResource}
        />
      </div>

      {/* Media Modal */}
      <MediaModal card={activeMediaCard} onClose={() => setActiveMediaCard(null)} />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-neutral-950/90 backdrop-blur-xl border border-neutral-800 text-white text-xs font-semibold shadow-xl animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  )
}

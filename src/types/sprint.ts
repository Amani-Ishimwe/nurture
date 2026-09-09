export type ContentType = 'scripture' | 'reflection' | 'media' | 'voice'

export type BibleVersion = 'NIV' | 'ESV' | 'KJV' | 'NLT' | 'CSB' | 'NASB'

export type NavTab = 'feed' | 'vault' | 'roster' | 'admin' | 'settings'

export interface UserProfileSettings {
  name: string
  role: string
  email: string
  avatar: string
  team: string
  bio: string
  preferredBible: BibleVersion
  reminderTime: string
  emailDigest: boolean
  soundEnabled: boolean
  streakGoalDays: number
  isWorkspaceOwner?: boolean
}

export interface WorkspaceConfig {
  churchName: string
  slug: string
  themeColor: string
  defaultMeetingUrl: string
  sprintCadenceDays: number
  autoArchiveToVault: boolean
  allowAnonymousReflections: boolean
  requireAdminApproval: boolean
  primaryMinistryFocus: string
  ownerId: string
  ownerName: string
  ownerRole: string
  ownerEmail: string
}

export interface Author {
  id: string
  name: string
  role: string
  avatar: string
  team: string
  isCurrentUser?: boolean
  isWorkspaceOwner?: boolean
  streakDays?: number
  checkinsCount?: number
}

export interface ReactionCounts {
  amen: number
  inspiring: number
  heart: number
}

export interface UserReactions {
  amen: boolean
  inspiring: boolean
  heart: boolean
}

export interface Comment {
  id: string
  author: Author
  content: string
  createdAt: string
  likes: number
  hasLiked?: boolean
}

export interface ReflectionCardItem {
  id: string
  type: ContentType
  sprintNumber?: number
  title?: string
  content: string
  author: Author
  isAnonymous?: boolean
  createdAt: string
  dayNumber: number
  tags: string[]
  reactions: ReactionCounts
  userReactions: UserReactions
  comments: Comment[]
  isPinned?: boolean
  isHidden?: boolean
  // Scripture specific
  scriptureReference?: string
  bibleVersion?: BibleVersion
  // Media specific
  mediaType?: 'youtube' | 'spotify' | 'reel'
  mediaUrl?: string
  mediaEmbedId?: string
  mediaTitle?: string
  mediaDuration?: string
  mediaThumbnail?: string
  mediaArtist?: string
  // Voice memo specific
  voiceDurationSeconds?: number
  voiceTranscript?: string
  waveformSample?: number[]
}

export interface DailyTheme {
  day: number
  title: string
  subtext: string
  dateLabel: string
  isCompleted: boolean
  isCurrent: boolean
}

export interface Sprint {
  id: string
  sprintNumber: number
  themeTitle: string
  themeSubtitle: string
  anchorScripture: string
  anchorReference: string
  startDate: string
  endDate: string
  currentDay: number
  totalDays: number
  status: 'published' | 'draft' | 'archived'
  liveSyncTime: string
  liveSyncMeetingUrl: string
  liveSyncAgenda?: string[]
  dailyThemes: DailyTheme[]
  totalContributions: number
  voiceMemosCount: number
  syncRatePercentage: number
  activeParticipantsCount: number
}

export interface AnnouncementBanner {
  id: string
  message: string
  linkText?: string
  linkUrl?: string
  isActive: boolean
  priority: 'normal' | 'urgent'
  updatedAt: string
}

export interface PinnedResource {
  id: string
  title: string
  type: 'pdf' | 'doc' | 'audio' | 'link'
  description: string
  url: string
  badgeText: string
}

export interface CommunityMinistry {
  id: string
  name: string
  code: string
  memberCount: number
  description: string
}

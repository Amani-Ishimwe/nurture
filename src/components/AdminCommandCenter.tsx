import React, { useState } from 'react'
import {
  Sliders,
  Calendar,
  Video,
  Pin,
  EyeOff,
  Eye,
  Megaphone,
  BarChart3,
  Copy,
  Check,
  Archive,
  Plus,
  Trash2,
  Sparkles,
  BookOpen,
  Clock,
  Send,
  AlertTriangle,
  Users,
  Layers,
  FileText,
  Crown
} from 'lucide-react'
import { Sprint, ReflectionCardItem, AnnouncementBanner } from '../types/sprint'

interface AdminCommandCenterProps {
  currentSprint: Sprint
  cards: ReflectionCardItem[]
  announcement: AnnouncementBanner
  onUpdateSprint: (updated: Partial<Sprint>) => void
  onUpdateAnnouncement: (ann: AnnouncementBanner) => void
  onTogglePinCard: (cardId: string) => void
  onToggleHideCard: (cardId: string) => void
  onArchiveCurrentSprint: () => void
  onShowToast: (msg: string) => void
}

export const AdminCommandCenter: React.FC<AdminCommandCenterProps> = ({
  currentSprint,
  cards,
  announcement,
  onUpdateSprint,
  onUpdateAnnouncement,
  onTogglePinCard,
  onToggleHideCard,
  onArchiveCurrentSprint,
  onShowToast,
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'sprint' | 'meeting' | 'moderation' | 'analytics'>('sprint')

  // Sprint Lifecycle form state
  const [themeTitle, setThemeTitle] = useState(currentSprint.themeTitle)
  const [themeSubtitle, setThemeSubtitle] = useState(currentSprint.themeSubtitle)
  const [anchorScripture, setAnchorScripture] = useState(currentSprint.anchorScripture)
  const [anchorReference, setAnchorReference] = useState(currentSprint.anchorReference)
  const [startDate, setStartDate] = useState(currentSprint.startDate)
  const [endDate, setEndDate] = useState(currentSprint.endDate)
  const [sprintStatus, setSprintStatus] = useState<'published' | 'draft'>(
    currentSprint.status === 'published' ? 'published' : 'draft'
  )

  // Meeting Scheduler form state
  const [meetingUrl, setMeetingUrl] = useState(currentSprint.liveSyncMeetingUrl)
  const [meetingTime, setMeetingTime] = useState(currentSprint.liveSyncTime)
  const [agendaItems, setAgendaItems] = useState<string[]>(
    currentSprint.liveSyncAgenda || [
      '00-10m: Pastoral Welcome & Heart Alignment (Marcus Vance)',
      '10-25m: Breakout: Preparing the Sanctuary as Holy Ground',
      '25-35m: Shared Revelations & Open Prayer for Sunday Services',
    ]
  )
  const [newAgendaItem, setNewAgendaItem] = useState('')

  // Announcement state
  const [annMessage, setAnnMessage] = useState(announcement.message)
  const [annActive, setAnnActive] = useState(announcement.isActive)
  const [annPriority, setAnnPriority] = useState<'normal' | 'urgent'>(announcement.priority)

  // Export summary state
  const [copiedSummary, setCopiedSummary] = useState(false)

  const handleSaveSprint = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdateSprint({
      themeTitle,
      themeSubtitle,
      anchorScripture,
      anchorReference,
      startDate,
      endDate,
      status: sprintStatus,
    })
    onShowToast(`Sprint ${sprintStatus === 'published' ? 'published' : 'saved as draft'} successfully!`)
  }

  const handleSaveMeeting = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdateSprint({
      liveSyncMeetingUrl: meetingUrl,
      liveSyncTime: meetingTime,
      liveSyncAgenda: agendaItems,
    })
    onShowToast('Weekly meeting details updated!')
  }

  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdateAnnouncement({
      ...announcement,
      message: annMessage,
      isActive: annActive,
      priority: annPriority,
      updatedAt: 'Just now',
    })
    onShowToast('Broadcast banner settings updated!')
  }

  const handleAddAgendaItem = () => {
    if (!newAgendaItem.trim()) return
    setAgendaItems([...agendaItems, newAgendaItem.trim()])
    setNewAgendaItem('')
  }

  const handleRemoveAgendaItem = (index: number) => {
    setAgendaItems(agendaItems.filter((_, i) => i !== index))
  }

  const handleExportSummary = () => {
    const pinnedPosts = cards.filter((c) => c.isPinned)
    const summaryMarkdown = `
# 📌 Nurture Weekly Study Recap — ${currentSprint.themeTitle}
**Ministry:** Usher & Hospitality Ministry
**Active Sprint:** Day ${currentSprint.currentDay} of 7 (${currentSprint.startDate} to ${currentSprint.endDate})
**Anchor Verse:** "${currentSprint.anchorScripture}" — *${currentSprint.anchorReference}*

## 👥 Community Engagement Pulse
- **Total Member Reflections Shared:** ${cards.length}
- **Active Team Participation:** ${currentSprint.syncRatePercentage}%
- **Next Live Team Sync:** ${currentSprint.liveSyncTime} (${currentSprint.liveSyncMeetingUrl})

## ⭐ Pinned Highlights from Chief Usher:
${pinnedPosts.map((p) => `- **${p.author.name} (${p.author.role}):** "${p.content.slice(0, 120)}..."`).join('\n')}

---
*Exported directly from Nurture Admin Command Center for Slack/Email broadcast.*
`.trim()

    navigator.clipboard.writeText(summaryMarkdown)
    setCopiedSummary(true)
    onShowToast('Weekly summary copied to clipboard for Slack!')
    setTimeout(() => setCopiedSummary(false), 3000)
  }

  return (
    <div className="w-full space-y-5">
      {/* Top Header */}
      <div className="p-5 sm:p-6 rounded-xl glass-card-sharp border border-neutral-300 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-neutral-100 text-neutral-900 border border-neutral-300 flex items-center gap-1.5 shadow-2xs">
              <Crown className="w-3 h-3 text-amber-500 fill-amber-500" />
              Workspace Owner & Admin Access
            </span>
            <span className="text-xs text-neutral-400 font-mono">Restricted Command Panel</span>
          </div>
          <h2 className="text-xl font-bold text-neutral-900 mt-1">Admin Command Center</h2>
          <p className="text-xs text-neutral-500">
            Manage sprint lifecycles, schedule Google Meet discussions, and moderate team contributions.
          </p>
        </div>

        <button
          onClick={handleExportSummary}
          className="px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors shrink-0 cursor-pointer"
        >
          {copiedSummary ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Copied for Slack!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Export Weekly Summary</span>
            </>
          )}
        </button>
      </div>

      {/* Admin Segmented Nav Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-lg glass-panel-sharp border border-neutral-300 overflow-x-auto">
        <button
          onClick={() => setActiveAdminTab('sprint')}
          className={`flex-1 min-w-[130px] py-2 px-3 rounded-md text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeAdminTab === 'sprint'
              ? 'bg-neutral-900 text-white shadow-xs'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          <Calendar className={`w-3.5 h-3.5 ${activeAdminTab === 'sprint' ? 'text-white' : 'text-neutral-500'}`} />
          <span>Sprint Lifecycle</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('meeting')}
          className={`flex-1 min-w-[130px] py-2 px-3 rounded-md text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeAdminTab === 'meeting'
              ? 'bg-neutral-900 text-white shadow-xs'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          <Video className={`w-3.5 h-3.5 ${activeAdminTab === 'meeting' ? 'text-white' : 'text-neutral-500'}`} />
          <span>Meeting Scheduler</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('moderation')}
          className={`flex-1 min-w-[130px] py-2 px-3 rounded-md text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeAdminTab === 'moderation'
              ? 'bg-neutral-900 text-white shadow-xs'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          <Pin className={`w-3.5 h-3.5 ${activeAdminTab === 'moderation' ? 'text-white' : 'text-neutral-500'}`} />
          <span>Feed Curator & Broadcast</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('analytics')}
          className={`flex-1 min-w-[130px] py-2 px-3 rounded-md text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeAdminTab === 'analytics'
              ? 'bg-neutral-900 text-white shadow-xs'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          <BarChart3 className={`w-3.5 h-3.5 ${activeAdminTab === 'analytics' ? 'text-white' : 'text-neutral-500'}`} />
        </button>
      </div>

      {/* TAB 1: SPRINT LIFECYCLE MANAGER */}
      {activeAdminTab === 'sprint' && (
        <div className="space-y-4">
          <form onSubmit={handleSaveSprint} className="p-5 sm:p-6 rounded-xl glass-card-sharp border border-neutral-300 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-neutral-900">Sprint Lifecycle & Configuration</h3>
                <p className="text-xs text-neutral-500">Edit active study theme or prepare the upcoming sprint.</p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 text-neutral-600">
                Sprint #{currentSprint.sprintNumber}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Theme Title
                </label>
                <input
                  type="text"
                  value={themeTitle}
                  onChange={(e) => setThemeTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Anchor Scripture Reference
                </label>
                <input
                  type="text"
                  value={anchorReference}
                  onChange={(e) => setAnchorReference(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                Theme Subtitle / Pastoral Goal
              </label>
              <input
                type="text"
                value={themeSubtitle}
                onChange={(e) => setThemeSubtitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                Anchor Scripture Verse Text
              </label>
              <textarea
                rows={3}
                value={anchorScripture}
                onChange={(e) => setAnchorScripture(e.target.value)}
                className="w-full p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-serif italic text-neutral-800 focus:outline-none focus:border-neutral-900 focus:bg-white"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                />
              </div>
            </div>

            {/* Publication Controls */}
            <div className="pt-3 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSprintStatus('published')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    sprintStatus === 'published'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold'
                      : 'bg-neutral-100 text-neutral-600'
                  }`}
                >
                  Live & Published
                </button>
                <button
                  type="button"
                  onClick={() => setSprintStatus('draft')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    sprintStatus === 'draft'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300 font-bold'
                      : 'bg-neutral-100 text-neutral-600'
                  }`}
                >
                  Draft Mode
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Archive this sprint and compile all posts into the Vault?')) {
                      onArchiveCurrentSprint()
                    }
                  }}
                  className="px-3.5 py-2 rounded-xl border border-red-200 text-red-700 hover:bg-red-50 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Archive className="w-3.5 h-3.5" />
                  <span>Archive to Vault</span>
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold shadow-xs transition-colors"
                >
                  Save Sprint Settings
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* TAB 2: WEEKLY MEETING SCHEDULER */}
      {activeAdminTab === 'meeting' && (
        <form onSubmit={handleSaveMeeting} className="p-5 sm:p-6 rounded-xl glass-card-sharp border border-neutral-300 shadow-2xs space-y-4">
          <div className="border-b border-neutral-200 pb-3">
            <h3 className="text-sm font-bold text-neutral-900">Weekly Discussion Meeting Scheduler</h3>
            <p className="text-xs text-neutral-500">Configure Google Meet link, scheduled time, and team agenda.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                Google Meet or Zoom URL
              </label>
              <input
                type="url"
                value={meetingUrl}
                onChange={(e) => setMeetingUrl(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white/80 border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white shadow-2xs"
                placeholder="https://meet.google.com/..."
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                Meeting Time / Cadence
              </label>
              <input
                type="text"
                value={meetingTime}
                onChange={(e) => setMeetingTime(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white/80 border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white shadow-2xs"
                placeholder="e.g. 08:00 PM EST Tonight"
                required
              />
            </div>
          </div>

          {/* Agenda items list */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1.5">
              Pinned 30-Minute Agenda & Discussion Questions
            </label>
            <div className="space-y-2 mb-3">
              {agendaItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-white/70 border border-neutral-200 text-xs text-neutral-800 shadow-2xs">
                  <span className="truncate pr-2">{item}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveAgendaItem(idx)}
                    className="text-neutral-400 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newAgendaItem}
                onChange={(e) => setNewAgendaItem(e.target.value)}
                placeholder="Add agenda topic or discussion question..."
                className="flex-1 px-3 py-1.5 rounded-lg bg-white/80 border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 shadow-2xs"
              />
              <button
                type="button"
                onClick={handleAddAgendaItem}
                className="px-3.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Item</span>
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-neutral-200 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              Update Meeting & Agenda
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: CURATOR & MODERATION TOOLS */}
      {activeAdminTab === 'moderation' && (
        <div className="space-y-4">
          {/* Urgent Announcement Banner Broadcast */}
          <form onSubmit={handleSaveAnnouncement} className="p-5 sm:p-6 rounded-xl glass-card-sharp border border-neutral-300 shadow-2xs space-y-3.5">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <div className="flex items-center gap-2">
                <Megaphone className="w-4 h-4 text-amber-600" />
                <h3 className="text-sm font-bold text-neutral-900">Broadcast Urgent Banner Announcement</h3>
              </div>
              <span className="text-[10px] font-mono text-neutral-400">Top of App Banner</span>
            </div>

            <textarea
              rows={2}
              value={annMessage}
              onChange={(e) => setAnnMessage(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/80 border border-neutral-300 text-xs text-neutral-800 focus:outline-none focus:border-neutral-900 focus:bg-white leading-relaxed shadow-2xs"
              placeholder="e.g. Reminder: Usher rehearsal this Saturday at 4 PM..."
              required
            />

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-xs font-semibold text-neutral-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={annActive}
                    onChange={(e) => setAnnActive(e.target.checked)}
                    className="w-4 h-4 rounded text-neutral-900 focus:ring-neutral-900 border-neutral-300 accent-neutral-900"
                  />
                  <span>Show Banner Across Platform</span>
                </label>

                <select
                  value={annPriority}
                  onChange={(e) => setAnnPriority(e.target.value as 'normal' | 'urgent')}
                  className="px-2.5 py-1 rounded-lg bg-white/80 border border-neutral-300 text-xs text-neutral-700 shadow-2xs"
                >
                  <option value="urgent">Urgent Notice</option>
                  <option value="normal">Normal Notice</option>
                </select>
              </div>

              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                Save Announcement
              </button>
            </div>
          </form>

          {/* Post Curation & Pinned Highlights Manager */}
          <div className="p-5 sm:p-6 rounded-xl glass-card-sharp border border-neutral-300 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <div>
                <h3 className="text-sm font-bold text-neutral-900">Feed Post Curation & Moderation</h3>
                <p className="text-xs text-neutral-500">Pin up to 3 standout posts or hide inappropriate content.</p>
              </div>
              <span className="text-xs font-semibold text-neutral-700">
                {cards.filter((c) => c.isPinned).length} of 3 Pinned
              </span>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className={`p-3 rounded-lg border flex items-center justify-between gap-3 text-xs transition-colors ${
                    card.isPinned
                      ? 'bg-neutral-100/90 border-neutral-400'
                      : card.isHidden
                        ? 'bg-rose-50/70 border-rose-200 opacity-60'
                        : 'bg-white/70 border-neutral-200'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-bold text-neutral-900 truncate">
                        {card.author.name}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400">
                        {card.type.toUpperCase()}
                      </span>
                      {card.isPinned && (
                        <span className="text-[10px] font-bold text-neutral-900 bg-neutral-200 px-1.5 rounded border border-neutral-300">
                          Pinned
                        </span>
                      )}
                      {card.isHidden && (
                        <span className="text-[10px] font-bold text-rose-600 bg-white px-1.5 rounded border border-rose-200">
                          Hidden
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-neutral-600 truncate">{card.content}</p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => onTogglePinCard(card.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 border transition-colors cursor-pointer ${
                        card.isPinned
                          ? 'bg-neutral-900 text-white border-neutral-900'
                          : 'bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      <Pin className="w-3 h-3" />
                      <span>{card.isPinned ? 'Pinned' : 'Pin'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onToggleHideCard(card.id)}
                      className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                        card.isHidden
                          ? 'bg-rose-600 text-white border-rose-600'
                          : 'bg-white border-neutral-300 text-neutral-500 hover:text-rose-600 hover:bg-neutral-100'
                      }`}
                      title={card.isHidden ? 'Unhide post' : 'Hide from feed'}
                    >
                      {card.isHidden ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: MEMBER ANALYTICS & INSIGHTS */}
      {activeAdminTab === 'analytics' && (
        <div className="p-5 sm:p-6 rounded-xl glass-card-sharp border border-neutral-300 shadow-2xs space-y-4">
          <div className="border-b border-neutral-200 pb-3">
            <h3 className="text-sm font-bold text-neutral-900">Usher Ministry Engagement Pulse</h3>
            <p className="text-xs text-neutral-500">Live statistics and team member participation rates.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-lg bg-white/70 border border-neutral-300 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-neutral-400">Total Reflections</span>
              <p className="text-2xl font-black text-neutral-900 mt-1">{cards.length}</p>
              <span className="text-[10px] text-emerald-600 font-semibold">+6 today</span>
            </div>

            <div className="p-3.5 rounded-lg bg-white/70 border border-neutral-300 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-neutral-400">Sync Attendance</span>
              <p className="text-2xl font-black text-neutral-900 mt-1">{currentSprint.syncRatePercentage}%</p>
              <span className="text-[10px] text-neutral-400">36 of 42 ushers</span>
            </div>

            <div className="p-3.5 rounded-lg bg-white/70 border border-neutral-300 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-neutral-400">Audio Voice Notes</span>
              <p className="text-2xl font-black text-neutral-900 mt-1">{currentSprint.voiceMemosCount}</p>
              <span className="text-[10px] text-neutral-400">Shared prayers</span>
            </div>

            <div className="p-3.5 rounded-lg bg-white/70 border border-neutral-300 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-neutral-400">Active Streaks</span>
              <p className="text-2xl font-black text-neutral-900 mt-1">28</p>
              <span className="text-[10px] text-neutral-400">3+ days streak</span>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-neutral-100/80 border border-neutral-300 flex items-center justify-between shadow-2xs">
            <div>
              <h4 className="text-xs font-bold text-neutral-900">Export Clean Weekly Report</h4>
              <p className="text-[11px] text-neutral-600 mt-0.5">
                Copies a formatted Markdown recap directly to your clipboard for Slack or email.
              </p>
            </div>
            <button
              onClick={handleExportSummary}
              className="px-3.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer shadow-2xs"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Report</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}


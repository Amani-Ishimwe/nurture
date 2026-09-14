import React, { useState } from 'react'
import {
  User,
  Building2,
  Bell,
  Check,
  Save,
  Shield,
  BookOpen,
  Camera,
  Download,
  Trash2,
  Calendar,
  Video,
  Sparkles,
  Volume2,
  Clock,
  Layers,
  Flame,
  Globe,
  Lock,
  Crown,
  Sun,
  Moon,
  Laptop,
  Palette
} from 'lucide-react'
import { UserProfileSettings, WorkspaceConfig, BibleVersion } from '../types/sprint'
import { useTheme, Theme } from '../context/ThemeContext'

interface SettingsViewProps {
  profile: UserProfileSettings
  workspace: WorkspaceConfig
  isAdminMode?: boolean
  onToggleAdminMode?: () => void
  onUpdateProfile: (updated: Partial<UserProfileSettings>) => void
  onUpdateWorkspace: (updated: Partial<WorkspaceConfig>) => void
  onShowToast: (msg: string) => void
}

const presetAvatars = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
]

export const SettingsView: React.FC<SettingsViewProps> = ({
  profile,
  workspace,
  isAdminMode = true,
  onToggleAdminMode,
  onUpdateProfile,
  onUpdateWorkspace,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'appearance' | 'workspace' | 'notifications'>('profile')
  const { theme, resolvedTheme, setTheme } = useTheme()

  // Profile Form State
  const [name, setName] = useState(profile.name)
  const [role, setRole] = useState(profile.role)
  const [email, setEmail] = useState(profile.email)
  const [avatar, setAvatar] = useState(profile.avatar)
  const [team, setTeam] = useState(profile.team)
  const [bio, setBio] = useState(profile.bio)
  const [preferredBible, setPreferredBible] = useState<BibleVersion>(profile.preferredBible)
  const [streakGoalDays, setStreakGoalDays] = useState(profile.streakGoalDays || 7)

  // Workspace Form State
  const [churchName, setChurchName] = useState(workspace.churchName)
  const [slug, setSlug] = useState(workspace.slug)
  const [defaultMeetingUrl, setDefaultMeetingUrl] = useState(workspace.defaultMeetingUrl)
  const [sprintCadenceDays, setSprintCadenceDays] = useState(workspace.sprintCadenceDays)
  const [autoArchiveToVault, setAutoArchiveToVault] = useState(workspace.autoArchiveToVault)
  const [allowAnonymousReflections, setAllowAnonymousReflections] = useState(workspace.allowAnonymousReflections)
  const [requireAdminApproval, setRequireAdminApproval] = useState(workspace.requireAdminApproval)
  const [primaryMinistryFocus, setPrimaryMinistryFocus] = useState(workspace.primaryMinistryFocus)

  // Notifications Form State
  const [reminderTime, setReminderTime] = useState(profile.reminderTime)
  const [emailDigest, setEmailDigest] = useState(profile.emailDigest)
  const [soundEnabled, setSoundEnabled] = useState(profile.soundEnabled)

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdateProfile({
      name,
      role,
      email,
      avatar,
      team,
      bio,
      preferredBible,
      streakGoalDays,
      reminderTime,
      emailDigest,
      soundEnabled
    })
    onShowToast('Personal profile saved successfully')
  }

  const handleSaveWorkspace = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdateWorkspace({
      churchName,
      slug,
      defaultMeetingUrl,
      sprintCadenceDays,
      autoArchiveToVault,
      allowAnonymousReflections,
      requireAdminApproval,
      primaryMinistryFocus
    })
    onShowToast('Workspace settings updated successfully')
  }

  const handleExportWorkspace = () => {
    const data = {
      workspace: {
        churchName,
        slug,
        primaryMinistryFocus,
        sprintCadenceDays,
        exportedAt: new Date().toISOString()
      },
      profile: {
        name,
        role,
        team
      }
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `sage-${slug}-export.json`
    a.click()
    URL.revokeObjectURL(url)
    onShowToast('Workspace data downloaded')
  }

  const handleSelectTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    onShowToast(`Theme switched to ${newTheme === 'system' ? 'System match' : `${newTheme} mode`}`)
  }

  return (
    <div className="w-full space-y-5">
      {/* Settings Header */}
      <div className="p-5 sm:p-6 rounded-xl glass-card-sharp border border-neutral-300 dark:border-neutral-800 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700 flex items-center gap-1.5 shadow-2xs">
                <Crown className="w-3 h-3 text-neutral-900 dark:text-neutral-100 fill-current" />
                {isAdminMode ? 'Workspace Owner & Admin' : 'Member View (Owner Account)'}
              </span>
              <span className="text-xs text-neutral-400 dark:text-neutral-500 font-mono">Organization Root</span>
            </div>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white mt-1">Platform Settings</h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Customize your leader profile, appearance, devotion habits, and workspace configuration.
            </p>
          </div>

          {onToggleAdminMode && (
            <button
              type="button"
              onClick={onToggleAdminMode}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-2xs ${
                isAdminMode
                  ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white border-neutral-300 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  : 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 border-neutral-900 dark:border-white hover:bg-neutral-800 dark:hover:bg-neutral-100'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>{isAdminMode ? 'Admin Mode: Active' : 'Switch to Admin Mode'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Segmented Sub-navigation Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-lg glass-panel-sharp border border-neutral-300 dark:border-neutral-800 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`flex-1 min-w-30 py-2 px-3 rounded-md text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 shadow-xs'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
          }`}
        >
          <User className={`w-3.5 h-3.5 ${activeTab === 'profile' ? 'text-white dark:text-neutral-950' : 'text-neutral-500 dark:text-neutral-400'}`} />
          <span>Leader Profile</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('appearance')}
          className={`flex-1 min-w-30 py-2 px-3 rounded-md text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'appearance'
              ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 shadow-xs'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
          }`}
        >
          <Palette className={`w-3.5 h-3.5 ${activeTab === 'appearance' ? 'text-white dark:text-neutral-950' : 'text-neutral-500 dark:text-neutral-400'}`} />
          <span>Appearance</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('workspace')}
          className={`flex-1 min-w-30 py-2 px-3 rounded-md text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'workspace'
              ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 shadow-xs'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
          }`}
        >
          <Building2 className={`w-3.5 h-3.5 ${activeTab === 'workspace' ? 'text-white dark:text-neutral-950' : 'text-neutral-500 dark:text-neutral-400'}`} />
          <span>Workspace</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('notifications')}
          className={`flex-1 min-w-30 py-2 px-3 rounded-md text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'notifications'
              ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 shadow-xs'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
          }`}
        >
          <Bell className={`w-3.5 h-3.5 ${activeTab === 'notifications' ? 'text-white dark:text-neutral-950' : 'text-neutral-500 dark:text-neutral-400'}`} />
          <span>Devotion & Alerts</span>
        </button>
      </div>

      {/* ── TAB 1: PERSONAL PROFILE ── */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="p-5 sm:p-6 rounded-xl glass-card-sharp border border-neutral-300 dark:border-neutral-800 shadow-2xs space-y-5">
            <div className="border-b border-neutral-200 dark:border-neutral-800 pb-3">
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Personal Leader Profile</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Your name, role, and bio are shown when you publish study reflections and comments.
              </p>
            </div>

            {/* Account Role & Workspace Authority Card */}
            <div className="p-3.5 rounded-lg bg-neutral-100/90 dark:bg-neutral-900/90 border border-neutral-300 dark:border-neutral-700 flex items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700 flex items-center justify-center shrink-0 shadow-2xs">
                  <Crown className="w-5 h-5 text-neutral-900 dark:text-neutral-100" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">Workspace Owner</h4>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 shadow-2xs">
                      Admin
                    </span>
                    <span className="text-[10px] font-mono text-neutral-600 dark:text-neutral-400 font-semibold">
                      Primary Root Account
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-0.5">
                    As the Workspace Owner, you have full administrative authority across sprint lifecycles, study themes, moderation, and workspace branding.
                  </p>
                </div>
              </div>
            </div>

            {/* Avatar Selector */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-2">
                Profile Avatar
              </label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="relative">
                  <img
                    src={avatar}
                    alt={name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-neutral-300 dark:border-neutral-700 ring-2 ring-neutral-200 dark:ring-neutral-800 shadow-xs"
                  />
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-neutral-900" />
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 shrink-0">Presets:</span>
                    {presetAvatars.map((url, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setAvatar(url)}
                        className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-transform cursor-pointer shrink-0 ${
                          avatar === url ? 'border-neutral-900 dark:border-white scale-105 ring-2 ring-neutral-300 dark:ring-neutral-700' : 'border-neutral-200 dark:border-neutral-700 hover:scale-105'
                        }`}
                      >
                        <img src={url} alt="preset" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="url"
                      value={avatar}
                      onChange={(e) => setAvatar(e.target.value)}
                      placeholder="Or paste custom image URL..."
                      className="w-full max-w-sm px-3 py-1.5 rounded-lg bg-white/80 dark:bg-neutral-900/80 border border-neutral-300 dark:border-neutral-700 text-xs text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-400 shadow-2xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Name & Role Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white/80 dark:bg-neutral-900/80 border border-neutral-300 dark:border-neutral-700 text-xs text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-400 shadow-2xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Ministry Title / Role
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white/80 dark:bg-neutral-900/80 border border-neutral-300 dark:border-neutral-700 text-xs text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-400 shadow-2xs"
                  required
                />
              </div>
            </div>

            {/* Email & Team Assignment */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white/80 dark:bg-neutral-900/80 border border-neutral-300 dark:border-neutral-700 text-xs text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-400 shadow-2xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Primary Ministry Team
                </label>
                <select
                  value={team}
                  onChange={(e) => setTeam(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white/80 dark:bg-neutral-900/80 border border-neutral-300 dark:border-neutral-700 text-xs text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-400 shadow-2xs"
                >
                  <option value="Main Sanctuary Ushers">Main Sanctuary Ushers</option>
                  <option value="First Impressions & Greeters">First Impressions & Greeters</option>
                  <option value="VIP & Pastoral Care">VIP & Pastoral Care</option>
                  <option value="Parking & Outdoor Hospitality">Parking & Outdoor Hospitality</option>
                  <option value="Youth & Campus Ministry">Youth & Campus Ministry</option>
                </select>
              </div>
            </div>

            {/* Pastoral Bio */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                Heart for Ministry / Bio
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Share your spiritual encouragement, heart for God's house, or ministry focus..."
                className="w-full p-3 rounded-lg bg-white/80 dark:bg-neutral-900/80 border border-neutral-300 dark:border-neutral-700 text-xs text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-400 leading-relaxed shadow-2xs"
              />
            </div>

            {/* Bible Translation & Streak Goal */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Preferred Bible Translation
                </label>
                <select
                  value={preferredBible}
                  onChange={(e) => setPreferredBible(e.target.value as BibleVersion)}
                  className="w-full px-3 py-2 rounded-lg bg-white/80 dark:bg-neutral-900/80 border border-neutral-300 dark:border-neutral-700 text-xs text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-400 shadow-2xs"
                >
                  <option value="ESV">ESV — English Standard Version</option>
                  <option value="NIV">NIV — New International Version</option>
                  <option value="KJV">KJV — King James Version</option>
                  <option value="NLT">NLT — New Living Translation</option>
                  <option value="CSB">CSB — Christian Standard Bible</option>
                  <option value="NASB">NASB — New American Standard Bible</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Weekly Devotion Goal (Days)
                </label>
                <select
                  value={streakGoalDays}
                  onChange={(e) => setStreakGoalDays(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-white/80 dark:bg-neutral-900/80 border border-neutral-300 dark:border-neutral-700 text-xs text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-400 shadow-2xs"
                >
                  <option value={7}>7 Days / Week (Full Sprint Cadence)</option>
                  <option value={5}>5 Days / Week (Weekday Focused)</option>
                  <option value={3}>3 Days / Week (Introductory)</option>
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-neutral-900 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-950 text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* ── TAB 2: APPEARANCE & THEME ── */}
      {activeTab === 'appearance' && (
        <div className="p-5 sm:p-6 rounded-xl glass-card-sharp border border-neutral-300 dark:border-neutral-800 shadow-2xs space-y-6">
          <div className="border-b border-neutral-200 dark:border-neutral-800 pb-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Appearance & Theme Preferences</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Switch between crisp monochrome light mode, deep obsidian dark mode, or system automatic sync.
                </p>
              </div>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-full border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
                Active: <strong className="capitalize">{theme}</strong> ({resolvedTheme})
              </span>
            </div>
          </div>

          {/* Theme Selection Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {/* Light Mode Card */}
            <button
              type="button"
              onClick={() => handleSelectTheme('light')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                theme === 'light'
                  ? 'border-neutral-900 dark:border-white bg-neutral-50 dark:bg-neutral-800/80 ring-1 ring-neutral-900 dark:ring-white shadow-xs'
                  : 'border-neutral-300 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 hover:border-neutral-400 dark:hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 flex items-center justify-center border border-neutral-300 dark:border-neutral-700">
                  <Sun className="w-5 h-5 text-neutral-900 dark:text-neutral-100" />
                </div>
                {theme === 'light' && (
                  <span className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-white" />
                )}
              </div>
              <div>
                <h4 className="text-xs font-bold text-neutral-900 dark:text-white">Light Mode</h4>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed">
                  Clean monochrome canvas (#fafafa) with deep graphite text and subtle glass panels.
                </p>
              </div>
            </button>

            {/* Dark Mode Card */}
            <button
              type="button"
              onClick={() => handleSelectTheme('dark')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                theme === 'dark'
                  ? 'border-neutral-900 dark:border-white bg-neutral-50 dark:bg-neutral-800/80 ring-1 ring-neutral-900 dark:ring-white shadow-xs'
                  : 'border-neutral-300 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 hover:border-neutral-400 dark:hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-lg bg-neutral-900 text-white flex items-center justify-center border border-neutral-800">
                  <Moon className="w-5 h-5 text-neutral-200" />
                </div>
                {theme === 'dark' && (
                  <span className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-white" />
                )}
              </div>
              <div>
                <h4 className="text-xs font-bold text-neutral-900 dark:text-white">Dark Mode</h4>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed">
                  Deep obsidian (#09090b) with dark graphite refraction borders and crisp text.
                </p>
              </div>
            </button>

            {/* System Sync Card */}
            <button
              type="button"
              onClick={() => handleSelectTheme('system')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                theme === 'system'
                  ? 'border-neutral-900 dark:border-white bg-neutral-50 dark:bg-neutral-800/80 ring-1 ring-neutral-900 dark:ring-white shadow-xs'
                  : 'border-neutral-300 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 hover:border-neutral-400 dark:hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-lg bg-neutral-200/80 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center justify-center border border-neutral-300 dark:border-neutral-700">
                  <Laptop className="w-5 h-5" />
                </div>
                {theme === 'system' && (
                  <span className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-white" />
                )}
              </div>
              <div>
                <h4 className="text-xs font-bold text-neutral-900 dark:text-white">System Preference</h4>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed">
                  Automatically synchronize with your operating system light and dark schedule.
                </p>
              </div>
            </button>
          </div>

          {/* Theme Information Banner */}
          <div className="p-4 rounded-lg bg-neutral-100/70 dark:bg-neutral-900/60 border border-neutral-300 dark:border-neutral-800 space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-neutral-900 dark:text-neutral-100" />
              <h4 className="text-xs font-bold text-neutral-900 dark:text-white">Zero-Flicker Architecture</h4>
            </div>
            <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Theme preferences are stored locally and injected before browser hydration so page loads never flash unstyled white or dark screens.
            </p>
          </div>
        </div>
      )}

      {/* ── TAB 3: WORKSPACE SETTINGS ── */}
      {activeTab === 'workspace' && (
        <form onSubmit={handleSaveWorkspace} className="space-y-4">
          <div className="p-5 sm:p-6 rounded-xl glass-card-sharp border border-neutral-300 dark:border-neutral-800 shadow-2xs space-y-5">
            <div className="border-b border-neutral-200 dark:border-neutral-800 pb-3">
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Workspace & Community Settings</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Configure your church identity, URL slug, and sprint automation policies.
              </p>
            </div>

            {/* Workspace Owner Card */}
            <div className="p-4 rounded-lg bg-neutral-100/90 dark:bg-neutral-900/90 border border-neutral-300 dark:border-neutral-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative shrink-0">
                  <img
                    src={avatar}
                    alt={name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-neutral-300 dark:border-neutral-700 ring-2 ring-neutral-200 dark:ring-neutral-800 shadow-xs"
                  />
                  <span className="absolute -top-1 -right-1 p-0.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 shadow-xs">
                    <Crown className="w-2.5 h-2.5" />
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 truncate">{name}</h4>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700">
                      Workspace Owner (Admin)
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-600 dark:text-neutral-400 truncate mt-0.5">
                    {email} · Primary Organization Administrator
                  </p>
                </div>
              </div>

              {!isAdminMode && onToggleAdminMode && (
                <button
                  type="button"
                  onClick={onToggleAdminMode}
                  className="px-3 py-1.5 rounded-lg bg-neutral-900 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-semibold shadow-xs transition-colors shrink-0 cursor-pointer flex items-center gap-1.5"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Switch to Admin Mode</span>
                </button>
              )}
            </div>

            {!isAdminMode && (
              <div className="p-3 rounded-lg bg-neutral-100/90 dark:bg-neutral-900/90 border border-neutral-300 dark:border-neutral-700 flex items-center gap-2.5 text-xs text-neutral-800 dark:text-neutral-200 shadow-2xs">
                <Lock className="w-4 h-4 text-neutral-600 dark:text-neutral-400 shrink-0" />
                <span>
                  <strong>Workspace Settings are in view-only mode.</strong> Only the Workspace Owner (Admin) can update organization details and automation policies.
                </span>
              </div>
            )}

            {/* Church Identity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Church / Community Name
                </label>
                <input
                  type="text"
                  value={churchName}
                  onChange={(e) => setChurchName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white/80 dark:bg-neutral-900/80 border border-neutral-300 dark:border-neutral-700 text-xs text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-400 shadow-2xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Workspace URL Slug
                </label>
                <div className="flex items-center">
                  <span className="px-3 py-2 rounded-l-lg bg-neutral-100 dark:bg-neutral-800 border border-r-0 border-neutral-300 dark:border-neutral-700 text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                    sage.app/
                  </span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-3 py-2 rounded-r-lg bg-white/80 dark:bg-neutral-900/80 border border-neutral-300 dark:border-neutral-700 text-xs text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-400 shadow-2xs font-mono"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Ministry Focus */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                Primary Ministry Mission Statement
              </label>
              <input
                type="text"
                value={primaryMinistryFocus}
                onChange={(e) => setPrimaryMinistryFocus(e.target.value)}
                placeholder="e.g. Cultivating excellence, hospitality, and prayerful servant leadership in God's sanctuary."
                className="w-full px-3 py-2 rounded-lg bg-white/80 dark:bg-neutral-900/80 border border-neutral-300 dark:border-neutral-700 text-xs text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-400 shadow-2xs"
              />
            </div>

            {/* Default Live Sync URL */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                Default Live Sync Room (Google Meet or Zoom)
              </label>
              <div className="relative">
                <Video className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="url"
                  value={defaultMeetingUrl}
                  onChange={(e) => setDefaultMeetingUrl(e.target.value)}
                  placeholder="https://meet.google.com/..."
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-white/80 dark:bg-neutral-900/80 border border-neutral-300 dark:border-neutral-700 text-xs text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-400 shadow-2xs"
                />
              </div>
            </div>

            {/* Sprint Automation Policies */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-neutral-900 dark:text-white">Sprint Lifecycle & Automation Rules</h4>

              <div className="space-y-2.5">
                <label className="flex items-start gap-3 p-3 rounded-lg bg-white/70 dark:bg-neutral-900/70 border border-neutral-300 dark:border-neutral-800 cursor-pointer shadow-2xs">
                  <input
                    type="checkbox"
                    checked={autoArchiveToVault}
                    onChange={(e) => setAutoArchiveToVault(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded text-neutral-900 focus:ring-neutral-900 border-neutral-300 accent-neutral-900"
                  />
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-neutral-900 dark:text-white block">
                      Auto-Archive Completed Sprints to Vault
                    </span>
                    <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block">
                      Automatically moves Day 7 study sprints into the searchable Vault repository at midnight.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-lg bg-white/70 dark:bg-neutral-900/70 border border-neutral-300 dark:border-neutral-800 cursor-pointer shadow-2xs">
                  <input
                    type="checkbox"
                    checked={allowAnonymousReflections}
                    onChange={(e) => setAllowAnonymousReflections(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded text-neutral-900 focus:ring-neutral-900 border-neutral-300 accent-neutral-900"
                  />
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-neutral-900 dark:text-white block">
                      Permit Anonymous Reflections
                    </span>
                    <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block">
                      Allow members to share sensitive testimonies and prayer requests anonymously.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-lg bg-white/70 dark:bg-neutral-900/70 border border-neutral-300 dark:border-neutral-800 cursor-pointer shadow-2xs">
                  <input
                    type="checkbox"
                    checked={requireAdminApproval}
                    onChange={(e) => setRequireAdminApproval(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded text-neutral-900 focus:ring-neutral-900 border-neutral-300 accent-neutral-900"
                  />
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-neutral-900 dark:text-white block">
                      Require Chief Usher Approval for Video Highlights
                    </span>
                    <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block">
                      Uploaded sermon clips and media will require a quick leadership check before appearing on the team feed.
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Data Management */}
            <div className="p-4 rounded-lg bg-neutral-100/70 dark:bg-neutral-900/70 border border-neutral-300 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              <div>
                <h4 className="text-xs font-bold text-neutral-900 dark:text-white">Workspace Data Backup & Export</h4>
                <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-0.5">
                  Download a JSON archive containing team reflection archives, sprints, and roster records.
                </p>
              </div>
              <button
                type="button"
                onClick={handleExportWorkspace}
                className="px-3.5 py-1.5 rounded-lg bg-neutral-900 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-950 font-bold text-xs flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON</span>
              </button>
            </div>

            <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-neutral-900 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-950 text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Workspace Settings</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* ── TAB 4: DEVOTION & NOTIFICATIONS ── */}
      {activeTab === 'notifications' && (
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="p-5 sm:p-6 rounded-xl glass-card-sharp border border-neutral-300 dark:border-neutral-800 shadow-2xs space-y-5">
            <div className="border-b border-neutral-200 dark:border-neutral-800 pb-3">
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Devotion Cadence & Notification Habits</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Set up your daily sprint check-in alerts and study reminders.
              </p>
            </div>

            <div className="space-y-3">
              {/* Daily Reminder Time */}
              <div className="p-4 rounded-lg bg-white/70 dark:bg-neutral-900/70 border border-neutral-300 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700 shrink-0">
                    <Clock className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900 dark:text-white">Morning Devotion Check-in Alert</h4>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                      Receive an alert to read the daily scripture passage and anchor verse.
                    </p>
                  </div>
                </div>

                <input
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-xs font-mono text-neutral-900 dark:text-neutral-100 shadow-2xs focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-400"
                />
              </div>

              {/* Weekly Digest Email */}
              <div className="p-4 rounded-lg bg-white/70 dark:bg-neutral-900/70 border border-neutral-300 dark:border-neutral-800 flex items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700 shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900 dark:text-white">Sunday Sprint Recap Digest</h4>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                      Email summary of top member revelations and team prayer points.
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailDigest}
                    onChange={(e) => setEmailDigest(e.target.checked)}
                    className="w-4 h-4 rounded text-neutral-900 focus:ring-neutral-900 border-neutral-300 accent-neutral-900"
                  />
                </label>
              </div>

              {/* Audio & Sound Effects */}
              <div className="p-4 rounded-lg bg-white/70 dark:bg-neutral-900/70 border border-neutral-300 dark:border-neutral-800 flex items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700 shrink-0">
                    <Volume2 className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900 dark:text-white">Micro-Interactions & Audio Cues</h4>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                      Soft acoustic affirmation chime on posting reflections and completing sprints.
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={soundEnabled}
                    onChange={(e) => setSoundEnabled(e.target.checked)}
                    className="w-4 h-4 rounded text-neutral-900 focus:ring-neutral-900 border-neutral-300 accent-neutral-900"
                  />
                </label>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-neutral-900 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-950 text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Notification Preferences</span>
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}

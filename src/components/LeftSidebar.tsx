import React, { useState } from 'react'
import {
  Compass,
  Archive,
  Users,
  Sliders,
  ChevronDown,
  Check,
  Shield,
  Flame,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Settings
} from 'lucide-react'
import { CommunityMinistry, NavTab, Author } from '../types/sprint'
import { mockMinistries } from '../data/mockSprintData'

interface LeftSidebarProps {
  currentTab: NavTab
  onSelectTab: (tab: NavTab) => void
  currentUser: Author
  isAdminMode: boolean
  onToggleAdminMode: () => void
  selectedMinistry: CommunityMinistry
  onSelectMinistry: (m: CommunityMinistry) => void
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  currentTab,
  onSelectTab,
  currentUser,
  isAdminMode,
  onToggleAdminMode,
  selectedMinistry,
  onSelectMinistry,
}) => {
  const [isCommunityDropdownOpen, setIsCommunityDropdownOpen] = useState(false)

  const navItems: Array<{ id: NavTab; label: string; icon: React.ReactNode; badge?: string; adminOnly?: boolean }> = [
    { id: 'feed', label: 'Current Sprint', icon: <Compass className="w-4 h-4" /> },
    { id: 'vault', label: 'Vault & Archives', icon: <Archive className="w-4 h-4" /> },
    { id: 'roster', label: 'Team Roster', icon: <Users className="w-4 h-4" /> },
    { id: 'admin', label: 'Admin Studio', icon: <Sliders className="w-4 h-4" />, badge: 'Admin', adminOnly: true },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ]

  return (
    <aside className="w-60 shrink-0 sticky top-18 h-[calc(100vh-5.5rem)] flex flex-col justify-between glass-panel-sharp border border-neutral-300 dark:border-neutral-800 rounded-xl py-4 px-3 select-none overflow-y-auto shadow-2xs transition-colors">
      {/* Top nav section */}
      <div className="space-y-4">
        {/* Ministry Switcher Card */}
        <div className="relative">
          <button
            onClick={() => setIsCommunityDropdownOpen(!isCommunityDropdownOpen)}
            className="w-full p-2 rounded-lg bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md hover:bg-white dark:hover:bg-neutral-850 border border-neutral-300 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700 text-left flex items-center justify-between transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0 pr-1">
              <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center font-bold text-xs shrink-0">
                {selectedMinistry.code}
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 block leading-none">
                  Active Team
                </span>
                <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 truncate mt-0.5">
                  {selectedMinistry.name}
                </p>
              </div>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 shrink-0 transition-transform ${isCommunityDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isCommunityDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1.5 z-30 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-lg p-1.5 space-y-0.5 animate-in fade-in">
              <span className="text-[10px] uppercase font-bold text-neutral-400 dark:text-neutral-500 px-2 py-1 block">
                Switch Ministry
              </span>
              {mockMinistries.map((ministry) => {
                const isSelected = ministry.id === selectedMinistry.id
                return (
                  <button
                    key={ministry.id}
                    onClick={() => {
                      onSelectMinistry(ministry)
                      setIsCommunityDropdownOpen(false)
                    }}
                    className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-semibold shadow-2xs'
                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isSelected 
                          ? 'bg-neutral-800 dark:bg-neutral-100 text-neutral-200 dark:text-neutral-900' 
                          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                      }`}>
                        {ministry.code}
                      </span>
                      <div className="truncate">
                        <p className="truncate text-xs">{ministry.name}</p>
                        <span className={`text-[10px] font-normal ${isSelected ? 'text-neutral-300 dark:text-neutral-600' : 'text-neutral-400 dark:text-neutral-500'}`}>
                          {ministry.memberCount} members
                        </span>
                      </div>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-white dark:text-neutral-950 shrink-0" />}
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 px-3 mb-1 block">
            Workspace
          </span>
          {Array.from(new Map(navItems.map((item) => [item.id, item])).values()).map((item) => {
            const isActive = currentTab === item.id
            if (item.adminOnly && !isAdminMode) return null
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-semibold shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={isActive ? 'text-white dark:text-neutral-950' : 'text-neutral-500 dark:text-neutral-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                    isActive 
                      ? 'bg-neutral-800 dark:bg-neutral-100 text-neutral-200 dark:text-neutral-900' 
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        {/* Motivational Sprint Widget (Peerlist-style card) */}
        <div className="p-3 rounded-lg bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md border border-neutral-300 dark:border-neutral-800 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 flex items-center gap-1">
              <Flame className="w-3 h-3 fill-current text-neutral-900 dark:text-neutral-100" />
              Week 12 Progress
            </span>
            <span className="text-[10px] font-mono font-bold text-neutral-600 dark:text-neutral-400">Day 4/7</span>
          </div>
          <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 leading-snug">
            Excellence in Hospitality
          </p>
          {/* Progress bar */}
          <div className="w-full h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
            <div className="h-full bg-neutral-900 dark:bg-white rounded-full" style={{ width: '57%' }} />
          </div>
          <p className="text-[10px] text-neutral-500 dark:text-neutral-400 flex items-center justify-between pt-0.5">
            <span>Keep your streak alive</span>
            <span className="text-neutral-900 dark:text-white font-bold font-mono">5d streak</span>
          </p>
        </div>
      </div>

      {/* Bottom Profile & Switcher */}
      <div className="pt-3 border-t border-neutral-200/80 dark:border-neutral-800 space-y-2.5">
        {/* Toggle Admin/Member Mode Button */}
        <button
          onClick={onToggleAdminMode}
          className={`w-full px-2.5 py-1.5 rounded-lg text-[11px] font-medium flex items-center justify-between transition-colors border cursor-pointer ${
            isAdminMode
              ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 border-neutral-900 dark:border-white hover:bg-neutral-800 dark:hover:bg-neutral-100'
              : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border-neutral-300 dark:border-neutral-800 hover:bg-neutral-200/60 dark:hover:bg-neutral-800/80'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <Shield className={`w-3.5 h-3.5 ${isAdminMode ? 'text-white dark:text-neutral-950' : 'text-neutral-500 dark:text-neutral-400'}`} />
            <span>{isAdminMode ? 'Owner: Admin Mode' : 'Member View'}</span>
          </div>
          <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${
            isAdminMode 
              ? 'bg-neutral-800 dark:bg-neutral-100 text-neutral-200 dark:text-neutral-900 border-neutral-700 dark:border-neutral-200' 
              : 'bg-white/80 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400'
          }`}>
            Toggle
          </span>
        </button>

        {/* User Card (Interactive, opens Settings) */}
        <button
          type="button"
          onClick={() => onSelectTab('settings')}
          className="w-full text-left p-2 rounded-lg bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md border border-neutral-300 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700 hover:bg-white dark:hover:bg-neutral-900 flex items-center justify-between shadow-2xs transition-all cursor-pointer group"
          title="Click to manage profile and workspace settings"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative shrink-0">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover border border-neutral-300 dark:border-neutral-700 group-hover:border-neutral-400 dark:group-hover:border-neutral-600 transition-colors shrink-0"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-neutral-900" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-bold text-neutral-900 dark:text-white truncate leading-tight group-hover:text-neutral-950 dark:group-hover:text-neutral-100 transition-colors">
                  {currentUser.name}
                </p>
                {currentUser.isWorkspaceOwner && (
                  <span className="px-1 py-0.2 rounded text-[8px] font-bold uppercase tracking-wider bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 shrink-0">
                    Owner
                  </span>
                )}
              </div>
              <p className="text-[10px] text-neutral-500 dark:text-neutral-400 font-medium truncate">
                {currentUser.role}
              </p>
            </div>
          </div>
          <Settings className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors shrink-0 ml-1" />
        </button>

        {/* Micro footer links */}
        <div className="px-1 text-[10px] text-neutral-400 dark:text-neutral-500 flex items-center justify-between">
          <span>Guidelines</span>
          <span>•</span>
          <span>Resources</span>
          <span>•</span>
          <span className="font-semibold text-neutral-600 dark:text-neutral-400">Nurture</span>
        </div>
      </div>
    </aside>
  )
}

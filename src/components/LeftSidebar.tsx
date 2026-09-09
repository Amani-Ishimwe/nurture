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
  ArrowRight
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
    { id: 'feed',   label: 'Current Sprint', icon: <Compass className="w-4 h-4" /> },
    { id: 'vault',  label: 'Vault & Archives', icon: <Archive className="w-4 h-4" /> },
    { id: 'roster', label: 'Team Roster',     icon: <Users className="w-4 h-4" /> },
    { id: 'admin',  label: 'Admin Studio',    icon: <Sliders className="w-4 h-4" />, badge: 'Admin', adminOnly: true },
  ]

  return (
    <aside className="w-60 shrink-0 sticky top-18 h-[calc(100vh-5.5rem)] flex flex-col justify-between glass-panel-sharp border border-neutral-300 rounded-xl py-4 px-3 select-none overflow-y-auto shadow-2xs">
      {/* Top nav section */}
      <div className="space-y-4">
        {/* Ministry Switcher Card */}
        <div className="relative">
          <button
            onClick={() => setIsCommunityDropdownOpen(!isCommunityDropdownOpen)}
            className="w-full p-2 rounded-lg bg-white/70 backdrop-blur-md hover:bg-white/95 border border-neutral-300 text-left flex items-center justify-between transition-colors group"
          >
            <div className="flex items-center gap-2.5 min-w-0 pr-1">
              <div className="w-8 h-8 rounded-lg bg-orange-100/80 text-orange-800 border border-orange-200 flex items-center justify-center font-bold text-xs shrink-0">
                {selectedMinistry.code}
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block leading-none">
                  Active Team
                </span>
                <p className="text-xs font-semibold text-neutral-800 truncate mt-0.5">
                  {selectedMinistry.name}
                </p>
              </div>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 shrink-0 transition-transform ${isCommunityDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isCommunityDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1.5 z-30 bg-white border border-neutral-200 rounded-xl shadow-lg p-1.5 space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-neutral-400 px-2 py-1 block">
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
                    className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                      isSelected ? 'bg-orange-50 text-orange-950 font-semibold' : 'text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600">
                        {ministry.code}
                      </span>
                      <div className="truncate">
                        <p className="truncate text-xs">{ministry.name}</p>
                        <span className="text-[10px] text-neutral-400 font-normal">
                          {ministry.memberCount} members
                        </span>
                      </div>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-orange-600 shrink-0" />}
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-3 mb-1 block">
            Workspace
          </span>
          {navItems.map((item) => {
            const isActive = currentTab === item.id
            if (item.adminOnly && !isAdminMode) return null
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-neutral-900 text-white font-semibold shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100/80'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={isActive ? 'text-orange-400' : 'text-neutral-500'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-orange-500 text-white' : 'bg-neutral-100 text-neutral-600 border border-neutral-200'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        {/* Motivational Sprint Widget (Peerlist-style card) */}
        <div className="p-3 rounded-lg bg-white/70 backdrop-blur-md border border-neutral-300 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-orange-700 flex items-center gap-1">
              <Flame className="w-3 h-3 fill-current text-orange-600" />
              Week 12 Progress
            </span>
            <span className="text-[10px] font-mono font-bold text-neutral-600">Day 4/7</span>
          </div>
          <p className="text-xs font-semibold text-neutral-800 leading-snug">
            Excellence in Hospitality
          </p>
          {/* Progress bar */}
          <div className="w-full h-1.5 rounded-full bg-neutral-200 overflow-hidden">
            <div className="h-full bg-orange-600 rounded-full" style={{ width: '57%' }} />
          </div>
          <p className="text-[10px] text-neutral-500 flex items-center justify-between pt-0.5">
            <span>Keep your streak alive</span>
            <span className="text-orange-600 font-bold font-mono">5d streak</span>
          </p>
        </div>
      </div>

      {/* Bottom Profile & Switcher */}
      <div className="pt-3 border-t border-neutral-200/80 space-y-2.5">
        {/* Toggle Admin/Member Mode Button */}
        <button
          onClick={onToggleAdminMode}
          className={`w-full px-2.5 py-1.5 rounded-lg text-[11px] font-medium flex items-center justify-between transition-colors border ${
            isAdminMode
              ? 'bg-orange-50 text-orange-900 border-orange-200 hover:bg-orange-100/70'
              : 'bg-neutral-100 text-neutral-600 border-neutral-200 hover:bg-neutral-200/60'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-orange-600" />
            <span>{isAdminMode ? 'Admin Mode: ON' : 'Member View'}</span>
          </div>
          <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/80 border border-neutral-200 text-neutral-600">
            Toggle
          </span>
        </button>

        {/* User Card */}
        <div className="p-2 rounded-lg bg-white/70 backdrop-blur-md border border-neutral-300 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover border border-neutral-200 shrink-0"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-neutral-900 truncate leading-tight flex items-center gap-1">
                {currentUser.name}
              </p>
              <p className="text-[10px] text-neutral-500 font-medium truncate">
                {currentUser.role}
              </p>
            </div>
          </div>
        </div>

        {/* Micro footer links */}
        <div className="px-1 text-[10px] text-neutral-400 flex items-center justify-between">
          <span>Guidelines</span>
          <span>•</span>
          <span>Resources</span>
          <span>•</span>
          <span className="font-semibold text-neutral-600">Nurture</span>
        </div>
      </div>
    </aside>
  )
}

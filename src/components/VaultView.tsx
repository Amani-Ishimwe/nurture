import React, { useState } from 'react'
import {
  Archive,
  Search,
  BookOpen,
  Calendar,
  Layers,
  Mic,
  Users,
  CheckCircle2,
  ChevronRight
} from 'lucide-react'
import { Sprint } from '../types/sprint'

interface VaultViewProps {
  currentSprint: Sprint
  archivedSprints: Sprint[]
  onSelectSprint: (sprint: Sprint) => void
}

export const VaultView: React.FC<VaultViewProps> = ({
  currentSprint,
  archivedSprints,
  onSelectSprint,
}) => {
  const [searchQuery, setSearchQuery] = useState('')

  const allSprints = [currentSprint, ...archivedSprints]

  const filtered = allSprints.filter(
    (s) =>
      s.themeTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.themeSubtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.anchorReference.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="w-full space-y-5">
      {/* Header & Search */}
      <div className="p-5 sm:p-6 rounded-xl glass-card-sharp border border-neutral-300 dark:border-neutral-800 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700">
                Study Archives
              </span>
              <span className="text-xs text-neutral-400 dark:text-neutral-500 font-mono">{allSprints.length} Sprints Vaulted</span>
            </div>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white mt-1">Vault & Past Studies</h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Browse, search, and review past 7-day study sprints and community contributions.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search archives by scripture or theme..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-white/80 dark:bg-neutral-900/80 border border-neutral-300 dark:border-neutral-700 text-xs text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-400 focus:bg-white dark:focus:bg-neutral-900 shadow-2xs"
            />
          </div>
        </div>
      </div>

      {/* Vault Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((sprint) => {
          const isCurrent = sprint.id === currentSprint.id
          return (
            <div
              key={sprint.id}
              onClick={() => onSelectSprint(sprint)}
              className={`p-5 rounded-xl border transition-all cursor-pointer glass-card-sharp ${
                isCurrent
                  ? 'border-neutral-900 dark:border-white shadow-2xs ring-1 ring-neutral-800 dark:ring-neutral-200 hover:border-black dark:hover:border-white'
                  : 'border-neutral-300 dark:border-neutral-800 shadow-2xs hover:border-neutral-400 dark:hover:border-neutral-700 hover:shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                    isCurrent
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300'
                      : 'bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  {isCurrent ? 'Active Sprint' : 'Archived Vault'}
                </span>
                <span className="text-xs text-neutral-400 dark:text-neutral-500 font-mono font-medium">
                  Sprint #{sprint.sprintNumber}
                </span>
              </div>

              <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-1 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors">
                {sprint.themeTitle}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 mb-4 leading-relaxed">
                {sprint.themeSubtitle}
              </p>

              {/* Anchor Reference */}
              <div className="p-3 rounded-lg bg-white/60 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 mb-4 space-y-1">
                <span className="text-[10px] uppercase font-bold text-neutral-400 dark:text-neutral-500 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300" /> Anchor Passage
                </span>
                <p className="text-xs font-serif italic text-neutral-800 dark:text-neutral-200 line-clamp-2">
                  "{sprint.anchorScripture}"
                </p>
                <span className="text-[11px] font-semibold text-neutral-800 dark:text-neutral-200 font-mono block text-right">
                  {sprint.anchorReference}
                </span>
              </div>

              {/* Stats Footer & CTA */}
              <div className="pt-3 border-t border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                <span className="flex items-center gap-1 text-[11px]">
                  <Calendar className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500" />
                  {sprint.startDate} – {sprint.endDate}
                </span>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500" />
                    {sprint.totalContributions}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mic className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500" />
                    {sprint.voiceMemosCount}
                  </span>
                </div>
              </div>

              {/* Action Trigger */}
              <div className="mt-3 pt-2 border-t border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between text-xs font-semibold text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-950 dark:group-hover:text-white">
                <span>Explore Week's Reflections & Media</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

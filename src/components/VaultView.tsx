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
      <div className="p-5 sm:p-6 rounded-xl glass-card-sharp border border-neutral-300 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-orange-50 text-orange-800 border border-orange-200">
                Study Archives
              </span>
              <span className="text-xs text-neutral-400 font-mono">{allSprints.length} Sprints Vaulted</span>
            </div>
            <h2 className="text-xl font-bold text-neutral-900 mt-1">Vault & Past Studies</h2>
            <p className="text-xs text-neutral-500">
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
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-white/80 border border-neutral-300 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-orange-500 focus:bg-white shadow-2xs"
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
                  ? 'border-orange-300 shadow-2xs ring-1 ring-orange-200/70 hover:border-orange-400'
                  : 'border-neutral-300 shadow-2xs hover:border-neutral-400 hover:shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                    isCurrent
                      ? 'bg-orange-50 border-orange-200 text-orange-700'
                      : 'bg-neutral-100 border-neutral-200 text-neutral-600'
                  }`}
                >
                  {isCurrent ? 'Active Sprint' : 'Archived Vault'}
                </span>
                <span className="text-xs text-neutral-400 font-mono font-medium">
                  Sprint #{sprint.sprintNumber}
                </span>
              </div>

              <h3 className="text-base font-bold text-neutral-900 mb-1 group-hover:text-orange-700 transition-colors">
                {sprint.themeTitle}
              </h3>
              <p className="text-xs text-neutral-500 line-clamp-2 mb-4 leading-relaxed">
                {sprint.themeSubtitle}
              </p>

              {/* Anchor Reference */}
              <div className="p-3 rounded-lg bg-white/60 border border-neutral-200 mb-4 space-y-1">
                <span className="text-[10px] uppercase font-bold text-neutral-400 flex items-center gap-1">
                  <BookOpen className="w-3 h-3 text-orange-600" /> Anchor Passage
                </span>
                <p className="text-xs font-serif italic text-neutral-800 line-clamp-2">
                  "{sprint.anchorScripture}"
                </p>
                <span className="text-[11px] font-semibold text-orange-700 font-mono block text-right">
                  {sprint.anchorReference}
                </span>
              </div>

              {/* Stats Footer & CTA */}
              <div className="pt-3 border-t border-neutral-200/80 flex items-center justify-between text-xs text-neutral-500">
                <span className="flex items-center gap-1 text-[11px]">
                  <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                  {sprint.startDate} – {sprint.endDate}
                </span>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-neutral-400" />
                    {sprint.totalContributions}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mic className="w-3.5 h-3.5 text-neutral-400" />
                    {sprint.voiceMemosCount}
                  </span>
                </div>
              </div>

              {/* Action Trigger */}
              <div className="mt-3 pt-2 border-t border-neutral-200/80 flex items-center justify-between text-xs font-semibold text-orange-600 group-hover:text-orange-700">
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


import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Archive,
  Calendar,
  Layers,
  Mic,
  TrendingUp,
  Award,
  Search,
  CheckCircle2,
  Users,
  ChevronRight,
  Sparkles,
  BookOpen
} from 'lucide-react'
import { Sprint } from '../types/sprint'

interface ArchivesSidebarProps {
  isOpen: boolean
  onClose: () => void
  currentSprint: Sprint
  archivedSprints: Sprint[]
  onSelectSprint: (sprint: Sprint) => void
}

export const ArchivesSidebar: React.FC<ArchivesSidebarProps> = ({
  isOpen,
  onClose,
  currentSprint,
  archivedSprints,
  onSelectSprint,
}) => {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [activeTab, setActiveTab] = React.useState<'vaults' | 'stats'>('vaults')

  const allSprints = [currentSprint, ...archivedSprints]

  const filteredSprints = allSprints.filter(
    (s) =>
      s.themeTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.themeSubtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.anchorReference.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Slide-over panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="w-screen max-w-md glass-panel bg-black/90 border-l border-white/15 p-6 shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div>
                <div className="flex items-center justify-between pb-5 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#BF00FF]/20 border border-[#BF00FF]/40 text-[#BF00FF]">
                      <Archive className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-tight">Sprint Vaults & Archives</h3>
                      <p className="text-xs text-zinc-400">Weekly church study archive</p>
                    </div>
                  </div>

                  <button
                    onClick={onClose}
                    className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Tabs switcher */}
                <div className="flex gap-2 p-1.5 mt-4 rounded-xl bg-zinc-900/80 border border-white/10">
                  <button
                    onClick={() => setActiveTab('vaults')}
                    className={`flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      activeTab === 'vaults'
                        ? 'bg-white/15 text-white shadow'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    Study Sprints ({allSprints.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('stats')}
                    className={`flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      activeTab === 'stats'
                        ? 'bg-[#2CFF05] text-black shadow font-bold'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <TrendingUp className="w-3.5 h-3.5" />
                    Community Stats
                  </button>
                </div>

                {/* Search in vaults */}
                {activeTab === 'vaults' && (
                  <div className="relative mt-4">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="text"
                      placeholder="Search archives by theme or scripture..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#2CFF05]/60 transition-colors"
                    />
                  </div>
                )}
              </div>

              {/* Body Content */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 my-2">
                {activeTab === 'vaults' ? (
                  filteredSprints.length > 0 ? (
                    filteredSprints.map((sprint) => {
                      const isCurrent = sprint.id === currentSprint.id
                      return (
                        <div
                          key={sprint.id}
                          onClick={() => {
                            onSelectSprint(sprint)
                            onClose()
                          }}
                          className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                            isCurrent
                              ? 'bg-zinc-900/90 border-[#2CFF05]/40 glow-green-sm'
                              : 'bg-zinc-900/40 border-white/10 hover:border-white/25 hover:bg-zinc-900/70'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                                isCurrent
                                  ? 'bg-[#2CFF05]/15 border-[#2CFF05]/40 text-[#2CFF05]'
                                  : 'bg-white/5 border-white/10 text-zinc-400'
                              }`}
                            >
                              {isCurrent ? 'Active Sprint' : 'Completed Vault'}
                            </span>
                            <span className="text-[11px] text-zinc-500 font-mono">
                              Sprint #{sprint.sprintNumber}
                            </span>
                          </div>

                          <h4 className="text-sm font-bold text-white mb-1 group-hover:text-[#2CFF05] flex items-center justify-between">
                            <span>{sprint.themeTitle}</span>
                            <ChevronRight className="w-4 h-4 text-zinc-500" />
                          </h4>

                          <p className="text-xs text-zinc-400 line-clamp-2 mb-3">
                            {sprint.themeSubtitle}
                          </p>

                          <div className="flex items-center justify-between text-[11px] text-zinc-400 border-t border-white/10 pt-2.5">
                            <span className="flex items-center gap-1">
                              <BookOpen className="w-3.5 h-3.5 text-[#2CFF05]" />
                              {sprint.anchorReference}
                            </span>
                            <div className="flex items-center gap-3">
                              <span className="flex items-center gap-1">
                                <Layers className="w-3 h-3 text-zinc-400" />
                                {sprint.totalContributions}
                              </span>
                              <span className="flex items-center gap-1">
                                <Mic className="w-3 h-3 text-[#BF00FF]" />
                                {sprint.voiceMemosCount}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-zinc-500 text-xs">No sprint vaults match your search.</p>
                    </div>
                  )
                ) : (
                  /* Stats Tab */
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                        Organization Sprint Totals
                      </h4>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                          <p className="text-[10px] uppercase font-bold text-zinc-500">Total Contributions</p>
                          <p className="text-2xl font-black text-white mt-1">243</p>
                          <p className="text-[10px] text-[#2CFF05] font-semibold mt-0.5">+18 this week</p>
                        </div>

                        <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                          <p className="text-[10px] uppercase font-bold text-zinc-500">Audio Memos</p>
                          <p className="text-2xl font-black text-white mt-1">68</p>
                          <p className="text-[10px] text-[#BF00FF] font-semibold mt-0.5">52 recorded mins</p>
                        </div>

                        <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                          <p className="text-[10px] uppercase font-bold text-zinc-500">Live Sync Rate</p>
                          <p className="text-2xl font-black text-[#2CFF05] mt-1">94.2%</p>
                          <p className="text-[10px] text-zinc-400 mt-0.5">Attendance benchmark</p>
                        </div>

                        <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                          <p className="text-[10px] uppercase font-bold text-zinc-500">Active Leaders</p>
                          <p className="text-2xl font-black text-white mt-1">42</p>
                          <p className="text-[10px] text-zinc-400 mt-0.5">Across 6 teams</p>
                        </div>
                      </div>
                    </div>

                    {/* Department leaderboards */}
                    <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-[#2CFF05]" /> Top Participating Teams
                      </h4>

                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between p-2 rounded-xl bg-black/30 border border-white/5">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-[#2CFF05]/20 text-[#2CFF05] font-bold text-[10px] flex items-center justify-center">
                              1
                            </span>
                            <span className="font-semibold text-white">Worship & Creative</span>
                          </div>
                          <span className="text-zinc-400 font-mono text-[11px]">84 reflections</span>
                        </div>

                        <div className="flex items-center justify-between p-2 rounded-xl bg-black/30 border border-white/5">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-white/10 text-zinc-300 font-bold text-[10px] flex items-center justify-center">
                              2
                            </span>
                            <span className="font-semibold text-white">Hospitality & Greeters</span>
                          </div>
                          <span className="text-zinc-400 font-mono text-[11px]">62 reflections</span>
                        </div>

                        <div className="flex items-center justify-between p-2 rounded-xl bg-black/30 border border-white/5">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-white/10 text-zinc-300 font-bold text-[10px] flex items-center justify-center">
                              3
                            </span>
                            <span className="font-semibold text-white">NextGen Ministries</span>
                          </div>
                          <span className="text-zinc-400 font-mono text-[11px]">47 reflections</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl glass-panel text-xs font-semibold text-zinc-300 hover:text-white hover:border-white/30 transition-colors"
                >
                  Close Vault
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}


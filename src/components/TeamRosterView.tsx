import React, { useState } from 'react'
import {
  Users,
  Search,
  Flame,
  Shield,
  CheckCircle2,
  Mail,
  UserCheck,
  Award,
  Crown
} from 'lucide-react'
import { Author } from '../types/sprint'
import { mockAuthors } from '../data/mockSprintData'

export const TeamRosterView: React.FC = () => {
  const [search, setSearch] = useState('')

  const filteredMembers = mockAuthors.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.role.toLowerCase().includes(search.toLowerCase()) ||
      m.team.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="w-full space-y-5">
      {/* Header */}
      <div className="p-5 sm:p-6 rounded-xl glass-card-sharp border border-neutral-300 dark:border-neutral-800 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700">
                Team Directory
              </span>
              <span className="text-xs text-neutral-400 dark:text-neutral-500 font-mono">42 Ministry Members</span>
            </div>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white mt-1">Usher Team Members & Roster</h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Active team members, service departments, and sprint check-in streaks.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search members by name or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-white/80 dark:bg-neutral-900/80 border border-neutral-300 dark:border-neutral-700 text-xs text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-400 focus:bg-white dark:focus:bg-neutral-900 shadow-2xs"
            />
          </div>
        </div>
      </div>

      {/* Roster Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="p-4 rounded-xl glass-card-sharp border border-neutral-300 dark:border-neutral-800 shadow-2xs hover:border-neutral-400 dark:hover:border-neutral-700 transition-all flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-11 h-11 rounded-full object-cover border border-neutral-300 dark:border-neutral-700 ring-2 ring-neutral-200 dark:ring-neutral-800 shrink-0"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white truncate">{member.name}</h4>
                  {member.isWorkspaceOwner ? (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 shadow-2xs flex items-center gap-1">
                      <Crown className="w-2.5 h-2.5 text-white dark:text-neutral-950" /> Owner & Admin
                    </span>
                  ) : member.isCurrentUser ? (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700">
                      You
                    </span>
                  ) : null}
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium truncate">{member.role}</p>
                <span className="text-[10px] text-neutral-400 dark:text-neutral-500 block truncate">{member.team}</span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1 shrink-0">
              <div className="flex items-center gap-1 text-xs font-bold font-mono text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-lg border border-neutral-200 dark:border-neutral-700">
                <Flame className="w-3.5 h-3.5 fill-current text-neutral-900 dark:text-neutral-100" />
                <span>{member.streakDays || 4}d streak</span>
              </div>
              <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono">
                {member.checkinsCount || 12} check-ins
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

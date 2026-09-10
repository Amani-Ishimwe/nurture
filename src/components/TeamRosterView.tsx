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
      <div className="p-5 sm:p-6 rounded-xl glass-card-sharp border border-neutral-300 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-neutral-100 text-neutral-800 border border-neutral-200">
                Team Directory
              </span>
              <span className="text-xs text-neutral-400 font-mono">42 Ministry Members</span>
            </div>
            <h2 className="text-xl font-bold text-neutral-900 mt-1">Usher Team Members & Roster</h2>
            <p className="text-xs text-neutral-500">
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
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-white/80 border border-neutral-300 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white shadow-2xs"
            />
          </div>
        </div>
      </div>

      {/* Roster Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="p-4 rounded-xl glass-card-sharp border border-neutral-300 shadow-2xs hover:border-neutral-400 transition-all flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-11 h-11 rounded-full object-cover border border-neutral-300 ring-2 ring-neutral-200 shrink-0"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-neutral-900 truncate">{member.name}</h4>
                  {member.isWorkspaceOwner ? (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-neutral-900 text-white shadow-2xs flex items-center gap-1">
                      <Crown className="w-2.5 h-2.5 text-amber-400" /> Owner & Admin
                    </span>
                  ) : member.isCurrentUser ? (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-neutral-100 text-neutral-800 border border-neutral-200">
                      You
                    </span>
                  ) : null}
                </div>
                <p className="text-xs text-neutral-500 font-medium truncate">{member.role}</p>
                <span className="text-[10px] text-neutral-400 block truncate">{member.team}</span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1 shrink-0">
              <div className="flex items-center gap-1 text-xs font-bold font-mono text-neutral-800 bg-neutral-100 px-2 py-0.5 rounded-lg border border-neutral-200">
                <Flame className="w-3.5 h-3.5 fill-current text-amber-500" />
                <span>{member.streakDays || 4}d streak</span>
              </div>
              <span className="text-[10px] text-neutral-400 font-mono">
                {member.checkinsCount || 12} check-ins
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


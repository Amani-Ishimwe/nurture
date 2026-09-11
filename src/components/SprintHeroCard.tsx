import React from 'react'
import {
  Quote,
  Calendar,
  Sparkles,
  CheckCircle2,
  Clock,
  BookOpen,
  ChevronRight
} from 'lucide-react'
import { Sprint } from '../types/sprint'

interface SprintHeroCardProps {
  sprint: Sprint
  onDayClick?: (day: number) => void
}

export const SprintHeroCard: React.FC<SprintHeroCardProps> = ({ sprint, onDayClick }) => {
  return (
    <div className="w-full p-5 sm:p-6 rounded-xl glass-card-sharp border border-neutral-300 dark:border-neutral-800 shadow-2xs space-y-4 transition-colors">
      {/* Top Tag & Sprint Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-2xs border ${
            sprint.status === 'archived'
              ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700'
              : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800/60'
          }`}>
            <Sparkles className={`w-3 h-3 ${sprint.status === 'archived' ? 'text-neutral-500 dark:text-neutral-400' : 'text-emerald-600 dark:text-emerald-400'}`} />
            {sprint.status === 'archived' ? `Archived Sprint #${sprint.sprintNumber}` : 'Active 7-Day Sprint'}
          </span>
          <span className="text-neutral-300 dark:text-neutral-700">•</span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500" />
            {sprint.startDate} – {sprint.endDate}
          </span>
        </div>

        <span className="text-xs font-mono font-bold text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-0.5 rounded-md border border-neutral-300 dark:border-neutral-700">
          Day {sprint.currentDay} of {sprint.totalDays}
        </span>
      </div>

      {/* Theme Title & Subtitle */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white tracking-tight leading-tight">
          {sprint.themeTitle}
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
          {sprint.themeSubtitle}
        </p>
      </div>

      {/* Anchor Scripture Card with Glass & Sharp Border */}
      <div className="p-4 rounded-lg bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md border-l-4 border-l-neutral-900 dark:border-l-white border border-neutral-300 dark:border-neutral-800 relative space-y-1.5 shadow-2xs">
        <div className="flex items-center justify-between text-xs font-semibold text-neutral-800 dark:text-neutral-200">
          <span className="flex items-center gap-1.5 text-neutral-900 dark:text-white font-bold">
            <BookOpen className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300" /> Anchor Scripture
          </span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/90 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-semibold">
            {sprint.anchorReference}
          </span>
        </div>
        <blockquote className="text-sm sm:text-base font-serif italic text-neutral-800 dark:text-neutral-200 leading-relaxed pt-0.5">
          "{sprint.anchorScripture}"
        </blockquote>
      </div>

      {/* 7-Step Visual Progress Tracker */}
      <div className="pt-2 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
            Sprint Progression
          </span>
          <span className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium font-mono">
            {Math.round((sprint.currentDay / sprint.totalDays) * 100)}% Completed
          </span>
        </div>

        {/* Stepper Progress Bar */}
        <div className="grid grid-cols-7 gap-1.5">
          {sprint.dailyThemes.map((dayItem) => {
            const isCompleted = dayItem.day < sprint.currentDay || (sprint.status === 'archived')
            const isCurrent = dayItem.day === sprint.currentDay && sprint.status !== 'archived'

            return (
              <div
                key={dayItem.day}
                onClick={() => onDayClick && onDayClick(dayItem.day)}
                title={`Day ${dayItem.day}: ${dayItem.title}`}
                className={`p-2 rounded-lg text-center border transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-neutral-900 dark:bg-white border-neutral-900 dark:border-white shadow-2xs text-white dark:text-neutral-950 font-bold'
                    : isCompleted
                      ? 'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                      : 'bg-neutral-50/70 dark:bg-neutral-900/40 border-neutral-200 dark:border-neutral-800/60 text-neutral-400 dark:text-neutral-600 hover:border-neutral-300 dark:hover:border-neutral-700'
                }`}
              >
                <span className={`text-[10px] uppercase tracking-wider block font-medium ${isCurrent ? 'text-neutral-200 dark:text-neutral-800' : ''}`}>
                  Day {dayItem.day}
                </span>
                <div className="flex justify-center mt-1">
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  ) : isCurrent ? (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Active Today Subtheme Callout */}
        <div className="flex items-center justify-between text-xs px-3.5 py-2 rounded-lg bg-neutral-100/90 dark:bg-neutral-900/90 backdrop-blur-sm border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-neutral-200 shadow-2xs">
          <span className="truncate">
            Focus: <strong className="font-bold text-neutral-950 dark:text-white">Excellence Over Performance</strong>
          </span>
          <span className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400 shrink-0 font-semibold">
            Colossians 3:23-24
          </span>
        </div>
      </div>
    </div>
  )
}

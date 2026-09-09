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
    <div className="w-full p-5 sm:p-6 rounded-xl glass-card-sharp border border-neutral-300 shadow-2xs space-y-4">
      {/* Top Tag & Sprint Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-orange-50/90 text-orange-700 border border-orange-200/80 shadow-2xs">
            <Sparkles className="w-3 h-3 text-orange-600" />
            {sprint.status === 'archived' ? `Archived Sprint #${sprint.sprintNumber}` : 'Active 7-Day Sprint'}
          </span>
          <span className="text-neutral-300">•</span>
          <span className="text-xs text-neutral-500 font-medium flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-neutral-400" />
            {sprint.startDate} – {sprint.endDate}
          </span>
        </div>

        <span className="text-xs font-mono font-bold text-orange-700 bg-orange-50/90 px-2.5 py-0.5 rounded-md border border-orange-200/80">
          Day {sprint.currentDay} of {sprint.totalDays}
        </span>
      </div>

      {/* Theme Title & Subtitle */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight leading-tight">
          {sprint.themeTitle}
        </h2>
        <p className="text-sm text-neutral-600 mt-1 leading-relaxed">
          {sprint.themeSubtitle}
        </p>
      </div>

      {/* Anchor Scripture Card with Glass & Sharp Border */}
      <div className="p-4 rounded-lg bg-white/70 backdrop-blur-md border-l-4 border-l-orange-600 border border-neutral-300 relative space-y-1.5 shadow-2xs">
        <div className="flex items-center justify-between text-xs font-semibold text-neutral-800">
          <span className="flex items-center gap-1.5 text-orange-700 font-bold">
            <BookOpen className="w-3.5 h-3.5 text-orange-600" /> Anchor Scripture
          </span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/90 border border-neutral-200 text-neutral-700 font-semibold">
            {sprint.anchorReference}
          </span>
        </div>
        <blockquote className="text-sm sm:text-base font-serif italic text-neutral-800 leading-relaxed pt-0.5">
          "{sprint.anchorScripture}"
        </blockquote>
      </div>

      {/* 7-Step Visual Progress Tracker */}
      <div className="pt-2 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-neutral-700 flex items-center gap-1.5">
            Sprint Progression
          </span>
          <span className="text-[11px] text-neutral-500 font-medium font-mono">
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
                    ? 'bg-orange-50/90 border-orange-500 shadow-2xs text-orange-950 font-bold'
                    : isCompleted
                      ? 'bg-white/70 backdrop-blur-sm border-neutral-300 text-neutral-700 hover:bg-neutral-100/70'
                      : 'bg-white/50 border-neutral-200 text-neutral-400 hover:border-neutral-300'
                }`}
              >
                <span className="text-[10px] uppercase tracking-wider block font-medium">
                  Day {dayItem.day}
                </span>
                <div className="flex justify-center mt-1">
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-orange-600" />
                  ) : isCurrent ? (
                    <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Active Today Subtheme Callout */}
        <div className="flex items-center justify-between text-xs px-3.5 py-2 rounded-lg bg-orange-50/80 backdrop-blur-sm border border-orange-200 text-orange-950 shadow-2xs">
          <span className="truncate">
            Focus: <strong className="font-bold">Excellence Over Performance</strong>
          </span>
          <span className="text-[11px] font-mono text-orange-700 shrink-0 font-semibold">
            Colossians 3:23-24
          </span>
        </div>
      </div>
    </div>
  )
}

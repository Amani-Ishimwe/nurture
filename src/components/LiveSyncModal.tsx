import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Video, X, Users, Clock, ExternalLink, Copy, Check, Sparkles, Shield, Radio } from 'lucide-react'
import { Sprint } from '../types/sprint'

interface LiveSyncModalProps {
  isOpen: boolean
  onClose: () => void
  sprint: Sprint
}

export const LiveSyncModal: React.FC<LiveSyncModalProps> = ({ isOpen, onClose, sprint }) => {
  const [copied, setCopied] = React.useState(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(sprint.liveSyncMeetingUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-xl glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 glow-green-sm z-10 shadow-2xl overflow-hidden"
          >
            {/* Ambient background glow accents */}
            <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#2CFF05]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-[#BF00FF]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-start justify-between mb-6 relative">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-[#2CFF05]/15 border border-[#2CFF05]/40 text-[#2CFF05] glow-green-sm">
                  <Video className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2CFF05] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2CFF05]"></span>
                    </span>
                    <span className="text-xs uppercase tracking-widest text-[#2CFF05] font-bold">
                      Live Sync Room
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Sprint {sprint.sprintNumber}: Day {sprint.currentDay} Community Sync
                  </h3>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Room Info Cards */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#2CFF05]" />
                <div>
                  <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">Scheduled Time</p>
                  <p className="text-sm font-semibold text-white">{sprint.liveSyncTime}</p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center gap-3">
                <Users className="w-5 h-5 text-[#BF00FF]" />
                <div>
                  <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">In Waiting Lobby</p>
                  <p className="text-sm font-semibold text-white">{sprint.activeParticipantsCount} Leaders Online</p>
                </div>
              </div>
            </div>

            {/* Agenda Details */}
            <div className="mb-6 p-4 rounded-2xl bg-zinc-900/50 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-bold text-zinc-300 flex items-center gap-1.5">
                  <Radio className="w-4 h-4 text-[#2CFF05]" /> 30-Minute Sync Agenda
                </span>
                <span className="text-[11px] text-[#2CFF05] font-mono bg-[#2CFF05]/10 px-2 py-0.5 rounded-full border border-[#2CFF05]/20">
                  Google Meet Encrypted
                </span>
              </div>
              <ul className="space-y-2 text-xs text-zinc-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2CFF05]" />
                  <span className="font-semibold text-white">00-08m:</span> Worship Reflection & Pastoral Welcome (Pastor Marcus)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#BF00FF]" />
                  <span className="font-semibold text-white">08-20m:</span> Deep Dive: Servanthood in High-Pressure Environments
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span className="font-semibold text-white">20-30m:</span> Open Audio Floor & Closing Cross-Department Prayer
                </li>
              </ul>
            </div>

            {/* Action CTAs */}
            <div className="space-y-3">
              <a
                href={sprint.liveSyncMeetingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-2xl bg-[#2CFF05] text-black font-bold text-sm tracking-wide flex items-center justify-center gap-2 glow-green-md hover:bg-[#34ff12] hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                <Video className="w-5 h-5 text-black" />
                Launch Google Meet Room
                <ExternalLink className="w-4 h-4 text-black opacity-80" />
              </a>

              <div className="flex items-center gap-2">
                <div className="flex-1 py-2.5 px-4 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-zinc-300 truncate">
                  {sprint.liveSyncMeetingUrl}
                </div>
                <button
                  onClick={handleCopyLink}
                  className="py-2.5 px-4 rounded-xl glass-panel hover:bg-white/10 text-xs font-semibold flex items-center gap-1.5 text-zinc-200 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-[#2CFF05]" />
                      <span className="text-[#2CFF05]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}


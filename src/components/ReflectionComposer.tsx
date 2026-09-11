import React, { useState, useEffect, useRef } from 'react'
import {
  BookOpen,
  PenTool,
  Film,
  Headphones,
  Sparkles,
  Link as LinkIcon,
  Tag,
  EyeOff,
  Mic,
  Square,
  Play,
  RotateCcw,
  Check,
  ChevronDown,
  ChevronUp,
  Bold,
  Italic,
  Quote,
  List,
  Video,
  Send,
  X
} from 'lucide-react'
import { ContentType, BibleVersion, Author, ReflectionCardItem } from '../types/sprint'

interface ReflectionComposerProps {
  currentUser: Author
  onAddReflection: (newCard: ReflectionCardItem) => void
}

export const ReflectionComposer: React.FC<ReflectionComposerProps> = ({
  currentUser,
  onAddReflection,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState<ContentType>('scripture')

  // Common metadata
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>(['#Hospitality'])

  // 1. Scripture State
  const [scriptureVerse, setScriptureVerse] = useState('')
  const [scriptureRef, setScriptureRef] = useState('')
  const [bibleVersion, setBibleVersion] = useState<BibleVersion>('NIV')

  // 2. Reflection Note State
  const [reflectionTitle, setReflectionTitle] = useState('')
  const [reflectionContent, setReflectionContent] = useState('')

  // 3. Media Link State
  const [mediaUrlInput, setMediaUrlInput] = useState('')
  const [mediaTypeDetected, setMediaTypeDetected] = useState<'youtube' | 'spotify' | 'reel' | null>(null)
  const [mediaTitleCustom, setMediaTitleCustom] = useState('')
  const [mediaDescription, setMediaDescription] = useState('')

  // 4. Voice Memo State
  const [isRecording, setIsRecording] = useState(false)
  const [recordingSeconds, setRecordingSeconds] = useState(0)
  const [recordedAudioReady, setRecordedAudioReady] = useState(false)
  const [voiceTitle, setVoiceTitle] = useState('')
  const [voiceTranscript, setVoiceTranscript] = useState('')
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const availableTags = [
    '#Scripture',
    '#Hospitality',
    '#Insight',
    '#Leadership',
    '#Prayer',
    '#Media',
    '#Excellence',
  ]

  // Smart parser for media links
  useEffect(() => {
    if (!mediaUrlInput) {
      setMediaTypeDetected(null)
      return
    }
    const lower = mediaUrlInput.toLowerCase()
    if (lower.includes('youtu.be') || lower.includes('youtube.com')) {
      setMediaTypeDetected('youtube')
      if (!mediaTitleCustom) setMediaTitleCustom('Sanctuary Greeters & Body Language Workshop')
    } else if (lower.includes('spotify.com')) {
      setMediaTypeDetected('spotify')
      if (!mediaTitleCustom) setMediaTitleCustom('The Servant Mindset in High Pressure Sundays')
    } else if (lower.includes('instagram.com') || lower.includes('reel')) {
      setMediaTypeDetected('reel')
      if (!mediaTitleCustom) setMediaTitleCustom('Door Greeter Team Sunday Prep Highlight')
    } else {
      setMediaTypeDetected(null)
    }
  }, [mediaUrlInput])

  // Recording timer simulation
  useEffect(() => {
    if (isRecording) {
      setRecordingSeconds(0)
      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 60) {
            clearInterval(timerRef.current!)
            setIsRecording(false)
            setRecordedAudioReady(true)
            return 60
          }
          return prev + 1
        })
      }, 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isRecording])

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const authorToUse = isAnonymous
      ? {
          ...currentUser,
          name: 'Anonymous Team Member',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
          role: 'Usher Volunteer',
        }
      : currentUser

    const newId = `reflection-${Date.now()}`

    let newCard: ReflectionCardItem

    if (activeTab === 'scripture') {
      if (!scriptureVerse.trim() || !scriptureRef.trim()) return
      newCard = {
        id: newId,
        type: 'scripture',
        dayNumber: 4,
        createdAt: 'Just now',
        author: authorToUse,
        isAnonymous,
        tags: selectedTags.length > 0 ? selectedTags : ['#Scripture'],
        content: scriptureVerse.trim(),
        scriptureReference: scriptureRef.trim(),
        bibleVersion,
        reactions: { amen: 1, inspiring: 0, heart: 0 },
        userReactions: { amen: true, inspiring: false, heart: false },
        comments: [],
      }
    } else if (activeTab === 'reflection') {
      if (!reflectionContent.trim()) return
      newCard = {
        id: newId,
        type: 'reflection',
        dayNumber: 4,
        createdAt: 'Just now',
        author: authorToUse,
        isAnonymous,
        tags: selectedTags.length > 0 ? selectedTags : ['#Insight'],
        title: reflectionTitle.trim() || undefined,
        content: reflectionContent.trim(),
        reactions: { amen: 1, inspiring: 1, heart: 0 },
        userReactions: { amen: true, inspiring: false, heart: false },
        comments: [],
      }
    } else if (activeTab === 'media') {
      if (!mediaUrlInput.trim()) return
      newCard = {
        id: newId,
        type: 'media',
        dayNumber: 4,
        createdAt: 'Just now',
        author: authorToUse,
        isAnonymous,
        tags: selectedTags.length > 0 ? selectedTags : ['#Media'],
        content: mediaDescription.trim() || 'Shared a study video clip for our team discussion.',
        mediaUrl: mediaUrlInput.trim(),
        mediaType: mediaTypeDetected || 'youtube',
        mediaTitle: mediaTitleCustom.trim() || 'Multimedia Study Clip',
        mediaThumbnail: 'https://images.unsplash.com/photo-1519791883288-dc8bd696e667?auto=format&fit=crop&w=600&q=80',
        mediaDuration: '4:12',
        mediaEmbedId: 'M7lc1UVf-VE',
        reactions: { amen: 2, inspiring: 1, heart: 0 },
        userReactions: { amen: true, inspiring: false, heart: false },
        comments: [],
      }
    } else {
      // Voice memo
      newCard = {
        id: newId,
        type: 'voice',
        dayNumber: 4,
        createdAt: 'Just now',
        author: authorToUse,
        isAnonymous,
        tags: selectedTags.length > 0 ? selectedTags : ['#Prayer'],
        title: voiceTitle.trim() || 'Audio Devotion Note',
        content: voiceTranscript.trim() || 'Shared a voice prayer for the usher team.',
        voiceDurationSeconds: recordingSeconds > 0 ? recordingSeconds : 45,
        voiceTranscript: voiceTranscript.trim() || 'Lord, grant our team patience and love at the doors.',
        waveformSample: [30, 50, 75, 90, 60, 45, 70, 85, 90, 60, 40, 65, 80, 70, 50],
        reactions: { amen: 1, inspiring: 0, heart: 1 },
        userReactions: { amen: true, inspiring: false, heart: false },
        comments: [],
      }
    }

    onAddReflection(newCard)
    // Reset inputs
    setScriptureVerse('')
    setScriptureRef('')
    setReflectionTitle('')
    setReflectionContent('')
    setMediaUrlInput('')
    setMediaTitleCustom('')
    setVoiceTitle('')
    setVoiceTranscript('')
    setIsExpanded(false)
  }

  const openComposerWithTab = (tab: ContentType) => {
    setActiveTab(tab)
    setIsExpanded(true)
  }

  return (
    <div className="w-full rounded-xl glass-card-sharp border border-neutral-300 dark:border-neutral-800 shadow-2xs hover:border-neutral-400 dark:hover:border-neutral-700 transition-all overflow-hidden">
      {!isExpanded ? (
        /* Peerlist-style Inline Card */
        <div className="p-4 sm:p-4.5 space-y-3.5">
          {/* Top: Avatar + Placeholder Input */}
          <div
            onClick={() => setIsExpanded(true)}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover border border-neutral-200 dark:border-neutral-700 ring-2 ring-neutral-100 dark:ring-neutral-800 shrink-0"
            />
            <div className="flex-1 px-4 py-2.5 rounded-full bg-neutral-50/80 dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-800 text-xs sm:text-sm text-neutral-400 dark:text-neutral-500 group-hover:bg-neutral-100/70 dark:group-hover:bg-neutral-850 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
              What did God speak to you today in Week 12?
            </div>
          </div>

          {/* Bottom Bar: Action Icons + Post Button */}
          <div className="flex items-center justify-between pt-1 border-t border-neutral-100 dark:border-neutral-800/80">
            {/* Quick Action Icons */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                type="button"
                onClick={() => openComposerWithTab('scripture')}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                title="Add Scripture"
              >
                <BookOpen className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                <span className="hidden sm:inline">Scripture</span>
              </button>

              <button
                type="button"
                onClick={() => openComposerWithTab('reflection')}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                title="Add Reflection"
              >
                <PenTool className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                <span className="hidden sm:inline">Reflection</span>
              </button>

              <button
                type="button"
                onClick={() => openComposerWithTab('media')}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                title="Attach Video or Reel"
              >
                <Film className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                <span className="hidden sm:inline">Video</span>
              </button>

              <button
                type="button"
                onClick={() => openComposerWithTab('voice')}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                title="Record Voice Note"
              >
                <Headphones className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                <span className="hidden sm:inline">Audio</span>
              </button>
            </div>

            {/* Post CTA Button */}
            <button
              type="button"
              onClick={() => setIsExpanded(true)}
              className="px-5 py-1.5 rounded-full bg-neutral-900 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 active:scale-95 text-white dark:text-neutral-950 font-semibold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Post</span>
            </button>
          </div>
        </div>
      ) : (
        /* Expanded Unified Composer Modal / Card */
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4">
          {/* Header Bar: Segmented Tab Switcher + Close */}
          <div className="flex items-center justify-between gap-2 border-b border-neutral-100 dark:border-neutral-800 pb-3">
            <div className="flex items-center gap-1 p-1 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab('scripture')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'scripture'
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-800'
                }`}
              >
                <BookOpen className={`w-3.5 h-3.5 ${activeTab === 'scripture' ? 'text-white dark:text-neutral-950' : 'text-neutral-600 dark:text-neutral-400'}`} />
                <span>Bible Verse</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('reflection')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'reflection'
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-800'
                }`}
              >
                <PenTool className={`w-3.5 h-3.5 ${activeTab === 'reflection' ? 'text-white dark:text-neutral-950' : 'text-neutral-600 dark:text-neutral-400'}`} />
                <span>Reflection</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('media')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'media'
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-800'
                }`}
              >
                <Film className={`w-3.5 h-3.5 ${activeTab === 'media' ? 'text-white dark:text-neutral-950' : 'text-neutral-600 dark:text-neutral-400'}`} />
                <span>Video/Reel</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('voice')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'voice'
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-800'
                }`}
              >
                <Headphones className={`w-3.5 h-3.5 ${activeTab === 'voice' ? 'text-white dark:text-neutral-950' : 'text-neutral-600 dark:text-neutral-400'}`} />
                <span>Podcast/Audio</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              title="Close composer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* TAB 1: BIBLE VERSE */}
          {activeTab === 'scripture' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    placeholder="Scripture Reference (e.g. Colossians 3:23-24)"
                    value={scriptureRef}
                    onChange={(e) => setScriptureRef(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-400 focus:bg-white dark:focus:bg-neutral-900 transition-all"
                    required
                  />
                </div>
                <div>
                  <select
                    value={bibleVersion}
                    onChange={(e) => setBibleVersion(e.target.value as BibleVersion)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-400 focus:bg-white dark:focus:bg-neutral-900 transition-all"
                  >
                    <option value="NIV">NIV - New International</option>
                    <option value="ESV">ESV - English Standard</option>
                    <option value="KJV">KJV - King James</option>
                    <option value="NLT">NLT - New Living</option>
                    <option value="CSB">CSB - Christian Standard</option>
                    <option value="NASB">NASB - New American</option>
                  </select>
                </div>
              </div>

              <textarea
                rows={3}
                placeholder="Paste or write the scripture text here..."
                value={scriptureVerse}
                onChange={(e) => setScriptureVerse(e.target.value)}
                className="w-full p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-sm font-serif italic text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-400 focus:bg-white dark:focus:bg-neutral-900 transition-all leading-relaxed"
                required
              />
            </div>
          )}

          {/* TAB 2: REFLECTION */}
          {activeTab === 'reflection' && (
            <div className="space-y-2.5">
              <input
                type="text"
                placeholder="Title / Key Theme (Optional, e.g. Greeting with Intentionality)"
                value={reflectionTitle}
                onChange={(e) => setReflectionTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-400 focus:bg-white dark:focus:bg-neutral-900"
              />

              <div className="relative">
                <textarea
                  rows={4}
                  placeholder="Share personal insights, Sunday experiences, or encouragement for our hospitality team..."
                  value={reflectionContent}
                  onChange={(e) => setReflectionContent(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-400 focus:bg-white dark:focus:bg-neutral-900 leading-relaxed"
                  required
                />
                <div className="flex items-center justify-between text-[11px] text-neutral-400 dark:text-neutral-500 px-1 pt-1">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setReflectionContent((c) => c + ' **bold** ')}
                      className="hover:text-neutral-700 dark:hover:text-neutral-300 cursor-pointer"
                    >
                      <Bold className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setReflectionContent((c) => c + ' *italic* ')}
                      className="hover:text-neutral-700 dark:hover:text-neutral-300 cursor-pointer"
                    >
                      <Italic className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setReflectionContent((c) => c + '\n> "Quote"\n')}
                      className="hover:text-neutral-700 dark:hover:text-neutral-300 cursor-pointer"
                    >
                      <Quote className="w-3 h-3" />
                    </button>
                  </div>
                  <span className="font-mono">{reflectionContent.length} chars</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: VIDEO / REEL */}
          {activeTab === 'media' && (
            <div className="space-y-3">
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-neutral-500" />
                <input
                  type="url"
                  placeholder="Paste YouTube, Instagram Reel, or video URL..."
                  value={mediaUrlInput}
                  onChange={(e) => setMediaUrlInput(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-400 focus:bg-white dark:focus:bg-neutral-900"
                  required
                />
              </div>

              {mediaTypeDetected && (
                <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                    <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                      Detected {mediaTypeDetected.toUpperCase()} Link
                    </span>
                  </div>
                  <input
                    type="text"
                    value={mediaTitleCustom}
                    onChange={(e) => setMediaTitleCustom(e.target.value)}
                    placeholder="Custom resource title"
                    className="text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-400"
                  />
                </div>
              )}

              <input
                type="text"
                placeholder="Takeaway note (Why should the team watch this?)"
                value={mediaDescription}
                onChange={(e) => setMediaDescription(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-400 focus:bg-white dark:focus:bg-neutral-900"
              />
            </div>
          )}

          {/* TAB 4: PODCAST / AUDIO */}
          {activeTab === 'voice' && (
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center space-y-3">
                <button
                  type="button"
                  onClick={
                    isRecording
                      ? () => {
                          setIsRecording(false)
                          setRecordedAudioReady(true)
                        }
                      : () => setIsRecording(true)
                  }
                  className={`w-12 h-12 rounded-full mx-auto flex items-center justify-center transition-all cursor-pointer ${
                    isRecording
                      ? 'bg-rose-600 text-white animate-pulse shadow-md'
                      : recordedAudioReady
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                  }`}
                >
                  {isRecording ? <Square className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>

                <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                  {isRecording
                    ? `Recording... (00:${String(recordingSeconds).padStart(2, '0')} / 01:00)`
                    : recordedAudioReady
                      ? 'Voice Memo Ready (60s Max)'
                      : 'Record a Quick Audio Note for the Team'}
                </p>
              </div>

              <input
                type="text"
                placeholder="Audio Title (e.g. 1-Minute Sunday Welcome Prayer)"
                value={voiceTitle}
                onChange={(e) => setVoiceTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-400 focus:bg-white dark:focus:bg-neutral-900"
              />
            </div>
          )}

          {/* Tags & Actions */}
          <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-bold uppercase text-neutral-400 dark:text-neutral-500 flex items-center gap-1">
                <Tag className="w-3 h-3" /> Tags:
              </span>
              {availableTags.map((tag) => {
                const isSelected = selectedTags.includes(tag)
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-2.5 py-0.5 rounded-md text-[11px] font-mono border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-neutral-900 dark:bg-white border-neutral-900 dark:border-white text-white dark:text-neutral-950 font-semibold shadow-2xs'
                        : 'bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    {tag}
                  </button>
                )
              })}
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setIsAnonymous(!isAnonymous)}
                className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors border cursor-pointer ${
                  isAnonymous 
                    ? 'bg-neutral-900 dark:bg-white border-neutral-900 dark:border-white text-white dark:text-neutral-950' 
                    : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
                title="Post without showing your name"
              >
                <EyeOff className="w-3.5 h-3.5" />
                <span className="text-[11px]">{isAnonymous ? 'Anonymous' : 'Public'}</span>
              </button>

              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-neutral-900 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 active:scale-95 text-white dark:text-neutral-950 font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Publish</span>
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}

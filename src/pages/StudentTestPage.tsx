import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppHeader } from '../components/layout/AppHeader'
import { mockExams } from '../data/mockExams'
import type { CaLevel } from '../types/exam'

const LEVEL_LABEL: Record<CaLevel, string> = {
  foundation: 'Foundation',
  intermediate: 'Intermediate',
  final: 'Final',
}

const CHAPTER_OPTIONS = ['Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4']

export default function StudentTestPage() {
  const [level, setLevel] = useState<CaLevel>('foundation')
  const [topic, setTopic] = useState('')
  const [chapter, setChapter] = useState(CHAPTER_OPTIONS[0])

  const levelExams = useMemo(
    () => mockExams.filter((exam) => exam.level === level),
    [level],
  )

  const availableTopics = useMemo(() => {
    const topics = new Set(
      levelExams.flatMap((exam) => exam.sections.map((section) => section.name)),
    )
    return Array.from(topics)
  }, [levelExams])

  const selectedTopic = topic || availableTopics[0] || ''

  const filteredPapers = useMemo(
    () =>
      levelExams.filter((exam) =>
        selectedTopic
          ? exam.sections.some((section) => section.name === selectedTopic)
          : true,
      ),
    [levelExams, selectedTopic],
  )

  return (
    <div className="min-h-svh bg-slate-50 dark:bg-slate-950">
      <AppHeader />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Select test paper
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Choose level, topic and chapter to generate your paper list.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <label className="text-sm">
              <span className="mb-1 block font-medium text-slate-700 dark:text-slate-300">
                Test level
              </span>
              <select
                value={level}
                onChange={(e) => {
                  const nextLevel = e.target.value as CaLevel
                  setLevel(nextLevel)
                  setTopic('')
                }}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-emerald-300 focus:ring dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
              >
                <option value="foundation">Foundation</option>
                <option value="intermediate">Intermediate</option>
                <option value="final">Final</option>
              </select>
            </label>

            <label className="text-sm">
              <span className="mb-1 block font-medium text-slate-700 dark:text-slate-300">
                Topic
              </span>
              <select
                value={selectedTopic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-emerald-300 focus:ring dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
              >
                {availableTopics.map((topicName) => (
                  <option key={topicName} value={topicName}>
                    {topicName}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm">
              <span className="mb-1 block font-medium text-slate-700 dark:text-slate-300">
                Chapter
              </span>
              <select
                value={chapter}
                onChange={(e) => setChapter(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-emerald-300 focus:ring dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
              >
                {CHAPTER_OPTIONS.map((chapterName) => (
                  <option key={chapterName} value={chapterName}>
                    {chapterName}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <section className="mt-8">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Generated papers
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Showing papers for {LEVEL_LABEL[level]} / {selectedTopic || 'Any topic'} / {chapter}
          </p>

          <ul className="mt-4 grid gap-4 md:grid-cols-2">
            {filteredPapers.map((exam) => (
              <li
                key={exam.id}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
              >
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  {exam.title}
                </h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Duration: {exam.durationMinutes} min | Fee: {exam.feeDisplay}
                </p>
                <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
                  Topic: {selectedTopic} | Chapter: {chapter}
                </p>
                <Link
                  to={`/exam/${exam.id}`}
                  className="mt-4 inline-block rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
                >
                  Open paper
                </Link>
              </li>
            ))}
          </ul>

          {filteredPapers.length === 0 ? (
            <p className="mt-6 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
              No paper found for this preference. Try a different topic or level.
            </p>
          ) : null}
        </section>
      </main>
    </div>
  )
}

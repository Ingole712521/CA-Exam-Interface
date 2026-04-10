import type { ReactNode } from 'react'
import type { QuestionMeta, QuestionPartMeta } from '../../types/exam'
import { QuestionTableBlock } from './QuestionCard'

type Props = {
  questionNumber: number
  total: number
  meta: QuestionMeta
  optionsByPart: Record<string, string[]>
  orGroupChoice: Record<string, string | null>
  partAnswers: Record<
    string,
    {
      selectedAnswer: number | null
      uploadedAnswerImage: string | null
      uploadedAnswerFileName: string | null
    }
  >
  onSelectOrGroup: (orGroupId: string, partId: string) => void
  onSelectPartOption: (partId: string, optionIndex: number) => void
  onUploadPart: (partId: string, dataUrl: string, fileName: string | null) => void
}

function PartBody({
  part,
  options,
  pa,
  onSelectOption,
  onUpload,
}: {
  part: QuestionPartMeta
  options: string[]
  pa:
    | {
        selectedAnswer: number | null
        uploadedAnswerImage: string | null
        uploadedAnswerFileName: string | null
      }
    | undefined
  onSelectOption: (i: number) => void
  onUpload: (dataUrl: string, fileName: string | null) => void
}) {
  const isUpload = part.format === 'upload'
  const selectedIndex = pa?.selectedAnswer ?? null

  return (
    <div className="mt-3 space-y-3 rounded-lg border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-700 dark:bg-slate-800/30">
      {part.passage ? (
        <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          {part.passage}
        </p>
      ) : null}
      {part.table ? <QuestionTableBlock spec={part.table} /> : null}
      {part.image ? (
        <img
          src={part.image.src}
          alt={part.image.alt}
          className="max-h-56 w-full max-w-xl rounded-lg border border-slate-200 object-contain dark:border-slate-600"
        />
      ) : null}
      <p className="text-sm font-medium leading-relaxed text-slate-900 dark:text-slate-100">
        <span className="whitespace-pre-line">{part.prompt}</span>
      </p>
      {isUpload ? (
        <div className="space-y-3">
          <input
            type="file"
            accept="image/*"
            className="block w-full text-sm text-slate-700 file:mr-3 file:rounded-md file:border-0 file:bg-emerald-600 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-white hover:file:bg-emerald-700 dark:text-slate-200 dark:file:bg-emerald-500 dark:hover:file:bg-emerald-600"
            onChange={(e) => {
              const file = e.currentTarget.files?.[0]
              if (!file) return
              const reader = new FileReader()
              reader.onload = () => {
                const dataUrl = typeof reader.result === 'string' ? reader.result : null
                if (!dataUrl) return
                onUpload(dataUrl, file.name || null)
              }
              reader.readAsDataURL(file)
            }}
          />
          {pa?.uploadedAnswerImage ? (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-900/40 dark:bg-emerald-950/30">
              <p className="text-xs font-medium text-emerald-900 dark:text-emerald-200">
                Uploaded
                {pa.uploadedAnswerFileName ? `: ${pa.uploadedAnswerFileName}` : ''}
              </p>
              <img
                src={pa.uploadedAnswerImage}
                alt="Answer preview"
                className="mt-2 max-h-64 w-full max-w-xl rounded-lg border object-contain"
              />
            </div>
          ) : null}
        </div>
      ) : (
        <ul className="space-y-2" role="radiogroup" aria-label={`Choices for ${part.label}`}>
          {options.map((opt, i) => {
            const selected = selectedIndex === i
            return (
              <li key={i}>
                <button
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => onSelectOption(i)}
                  className={`flex w-full items-start gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition ${
                    selected
                      ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500 dark:border-emerald-400 dark:bg-emerald-950/40 dark:ring-emerald-400'
                      : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-600 dark:bg-slate-900 dark:hover:border-slate-500'
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                      selected
                        ? 'border-emerald-600 bg-emerald-600 text-white dark:border-emerald-400 dark:bg-emerald-400 dark:text-slate-900'
                        : 'border-slate-300 text-slate-500 dark:border-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="whitespace-pre-line text-slate-800 dark:text-slate-200">
                    {opt}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export function CompoundQuestionCard({
  questionNumber,
  total,
  meta,
  optionsByPart,
  orGroupChoice,
  partAnswers,
  onSelectOrGroup,
  onSelectPartOption,
  onUploadPart,
}: Props) {
  const parts = meta.parts ?? []
  const processedOr = new Set<string>()

  const blocks: ReactNode[] = []

  for (let i = 0; i < parts.length; i++) {
    const p = parts[i]
    if (p.orGroupId && processedOr.has(p.orGroupId)) continue

    if (p.orGroupId) {
      const groupParts = parts.filter((x) => x.orGroupId === p.orGroupId)
      groupParts.forEach((g) => processedOr.add(g.orGroupId!))
      const gid = p.orGroupId
      const choice = orGroupChoice[gid] ?? null

      blocks.push(
        <div
          key={`or-${gid}`}
          className="rounded-xl border border-violet-200 bg-violet-50/40 p-4 dark:border-violet-900/50 dark:bg-violet-950/20"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-violet-800 dark:text-violet-200">
            Internal choice — answer any one
          </p>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {groupParts.map((gp) => (
              <label
                key={gp.partId}
                className={`flex cursor-pointer items-start gap-2 rounded-lg border px-3 py-2 text-sm ${
                  choice === gp.partId
                    ? 'border-violet-500 bg-white ring-1 ring-violet-500 dark:border-violet-400 dark:bg-slate-900 dark:ring-violet-400'
                    : 'border-slate-200 bg-white/80 dark:border-slate-600 dark:bg-slate-900/60'
                }`}
              >
                <input
                  type="radio"
                  name={`or-${gid}`}
                  className="mt-1"
                  checked={choice === gp.partId}
                  onChange={() => onSelectOrGroup(gid, gp.partId)}
                />
                <span className="block">
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {gp.label}
                  </span>{' '}
                  <span className="text-slate-700 dark:text-slate-300">
                    {gp.prompt}
                  </span>
                  <span className="ml-1 text-xs font-medium text-violet-700 dark:text-violet-300">
                    ({gp.marks} marks)
                  </span>
                </span>
              </label>
            ))}
          </div>
          {choice ? (
            <div className="mt-4 border-t border-violet-200 pt-4 dark:border-violet-900/40">
              {(() => {
                const active = groupParts.find((x) => x.partId === choice)
                if (!active) return null
                return (
                  <PartBody
                    part={active}
                    options={optionsByPart[active.partId] ?? []}
                    pa={partAnswers[active.partId]}
                    onSelectOption={(idx) => onSelectPartOption(active.partId, idx)}
                    onUpload={(url, fn) => onUploadPart(active.partId, url, fn)}
                  />
                )
              })()}
            </div>
          ) : (
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
              Select (a) or (b) above to show the full stem and answer area.
            </p>
          )}
        </div>,
      )
    } else {
      blocks.push(
        <div key={p.partId} className="rounded-xl border border-slate-200 bg-slate-50/30 p-4 dark:border-slate-600 dark:bg-slate-800/20">
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            {p.label}{' '}
            <span className="font-normal text-slate-500 dark:text-slate-400">
              ({p.marks} marks)
            </span>
          </p>
          <PartBody
            part={p}
            options={optionsByPart[p.partId] ?? []}
            pa={partAnswers[p.partId]}
            onSelectOption={(idx) => onSelectPartOption(p.partId, idx)}
            onUpload={(url, fn) => onUploadPart(p.partId, url, fn)}
          />
        </div>,
      )
    }
  }

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Question {questionNumber} of {total}
        </p>
        <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-semibold text-violet-900 dark:bg-violet-950/60 dark:text-violet-200">
          Compound (internal choices)
        </span>
      </div>

      {meta.questionCategory ? (
        <p className="mb-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
          {meta.questionCategory}
        </p>
      ) : null}

      {meta.headline ? (
        <h2 className="mb-3 text-lg font-semibold text-slate-900 dark:text-slate-100">
          {meta.headline}
        </h2>
      ) : null}

      {meta.passage ? (
        <div className="mb-4 rounded-lg border border-slate-100 bg-slate-50/80 p-4 text-sm leading-relaxed text-slate-800 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-200">
          <p className="whitespace-pre-line">{meta.passage}</p>
        </div>
      ) : null}

      {meta.table ? <QuestionTableBlock spec={meta.table} /> : null}

      {meta.text ? (
        <p className="mb-6 text-sm font-medium leading-relaxed text-slate-800 dark:text-slate-200">
          {meta.text}
        </p>
      ) : null}

      <div className="space-y-8">{blocks}</div>
    </article>
  )
}

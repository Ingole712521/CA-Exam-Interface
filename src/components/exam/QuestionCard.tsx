import type {
  QuestionFormat,
  QuestionImageSpec,
  QuestionReceiptsPaymentsTableSpec,
  QuestionTableSpec,
} from '../../types/exam'

function isReceiptsPaymentsTable(
  spec: QuestionTableSpec,
): spec is QuestionReceiptsPaymentsTableSpec {
  return spec.layout === 'receipts_payments'
}

const FORMAT_LABEL: Record<Exclude<QuestionFormat, 'standard'>, string> = {
  theoretical: 'Theoretical',
  case_study: 'Case study',
  image: 'Image-based',
  table: 'Table / Data',
  upload: 'Upload answer',
}

type Props = {
  questionNumber: number
  total: number
  passage?: string
  text: string
  format?: QuestionFormat
  image?: QuestionImageSpec
  table?: QuestionTableSpec
  options: string[]
  selectedIndex: number | null
  onSelect: (index: number) => void
  uploadedAnswerImage?: string | null
  uploadedAnswerFileName?: string | null
  onUploadAnswerImage?: (dataUrl: string, fileName: string | null) => void
}

function ReceiptsPaymentsTableBlock({
  spec,
}: {
  spec: QuestionReceiptsPaymentsTableSpec
}) {
  const recTitle = spec.receiptsHeading ?? 'Receipts'
  const payTitle = spec.paymentsHeading ?? 'Payments'
  const n = Math.max(spec.receipts.length, spec.payments.length)

  return (
    <div className="my-4 overflow-x-auto">
      {spec.caption ? (
        <p className="mb-2 text-xs font-medium text-slate-700 dark:text-slate-300">
          {spec.caption}
        </p>
      ) : null}
      <table className="w-full min-w-[min(100%,520px)] border-collapse border-2 border-black text-sm text-black dark:border-rose-200/80">
        <thead>
          <tr className="bg-[#c9a0b8] dark:bg-rose-900/90 dark:text-rose-50">
            <th
              scope="col"
              className="border border-black px-2 py-2 text-left font-semibold dark:border-rose-700"
            >
              {recTitle}
            </th>
            <th
              scope="col"
              className="border border-black px-2 py-2 text-right font-semibold dark:border-rose-700"
            >
              ₹
            </th>
            <th
              scope="col"
              className="border border-black px-2 py-2 text-left font-semibold dark:border-rose-700"
            >
              {payTitle}
            </th>
            <th
              scope="col"
              className="border border-black px-2 py-2 text-right font-semibold dark:border-rose-700"
            >
              ₹
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: n }, (_, i) => {
            const r = spec.receipts[i]
            const p = spec.payments[i]
            return (
              <tr
                key={i}
                className="bg-[#f5e3ec] dark:bg-rose-950/50 dark:text-rose-100"
              >
                <td className="border border-black px-2 py-1.5 align-top dark:border-rose-800">
                  {r?.particular ?? ''}
                </td>
                <td className="border border-black px-2 py-1.5 text-right font-medium tabular-nums dark:border-rose-800">
                  {r?.amount ?? ''}
                </td>
                <td className="border border-black px-2 py-1.5 align-top dark:border-rose-800">
                  {p?.particular ?? ''}
                </td>
                <td className="border border-black px-2 py-1.5 text-right font-medium tabular-nums dark:border-rose-800">
                  {p?.amount ?? ''}
                </td>
              </tr>
            )
          })}
          {spec.receiptsTotal !== undefined ||
          spec.paymentsTotal !== undefined ? (
            <tr className="bg-[#f5e3ec] dark:bg-rose-950/50 dark:text-rose-100">
              <td className="border border-black px-2 py-2 dark:border-rose-800" />
              <td className="border-t-2 border-black px-2 py-2 text-right text-base font-semibold tabular-nums dark:border-rose-200">
                {spec.receiptsTotal ?? ''}
              </td>
              <td className="border border-black px-2 py-2 dark:border-rose-800" />
              <td className="border-t-2 border-black px-2 py-2 text-right text-base font-semibold tabular-nums dark:border-rose-200">
                {spec.paymentsTotal ?? ''}
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  )
}

export function QuestionTableBlock({ spec }: { spec: QuestionTableSpec }) {
  if (isReceiptsPaymentsTable(spec)) {
    return <ReceiptsPaymentsTableBlock spec={spec} />
  }

  return (
    <div className="my-4 overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-600">
      {spec.caption ? (
        <p className="border-b border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {spec.caption}
        </p>
      ) : null}
      <table className="w-full min-w-[280px] border-collapse border border-slate-300 text-left text-sm dark:border-slate-600">
        <thead>
          <tr className="bg-slate-100 dark:bg-slate-800">
            {spec.headers.map((h, i) => (
              <th
                key={i}
                scope="col"
                className="border border-slate-300 px-3 py-2 font-semibold text-slate-800 dark:border-slate-600 dark:text-slate-100"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {spec.rows.map((row, ri) => (
            <tr
              key={ri}
              className="odd:bg-white even:bg-slate-50/80 dark:odd:bg-slate-900 dark:even:bg-slate-800/40"
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="border border-slate-300 px-3 py-2 text-slate-700 dark:border-slate-600 dark:text-slate-200"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function QuestionCard({
  questionNumber,
  total,
  passage,
  text,
  format,
  image,
  table,
  options,
  selectedIndex,
  onSelect,
  uploadedAnswerImage,
  uploadedAnswerFileName,
  onUploadAnswerImage,
}: Props) {
  const showBadge = format && format !== 'standard'
  const isUpload = format === 'upload'

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Question {questionNumber} of {total}
        </p>
        {showBadge ? (
          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-900 dark:bg-amber-950/60 dark:text-amber-200">
            {FORMAT_LABEL[format as Exclude<QuestionFormat, 'standard'>]}
          </span>
        ) : null}
      </div>

      {passage ? (
        <div className="mb-4 rounded-lg border border-slate-100 bg-slate-50/80 p-4 text-sm leading-relaxed text-slate-800 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-200">
          <p className="whitespace-pre-line">{passage}</p>
        </div>
      ) : null}

      {image ? (
        <figure className="mb-4">
          <img
            src={image.src}
            alt={image.alt}
            className="max-h-64 w-full max-w-xl rounded-lg border border-slate-200 object-contain dark:border-slate-600"
          />
        </figure>
      ) : null}

      {table ? <QuestionTableBlock spec={table} /> : null}

      <h2 className="mb-6 text-base font-medium leading-relaxed text-slate-900 dark:text-slate-100">
        <span className="whitespace-pre-line">{text}</span>
      </h2>
      {isUpload ? (
        <div className="space-y-3">
          <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-800/50">
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
              Upload your answer image
            </p>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
              Take a clear photo/scan and upload it here. Your upload is saved in this
              browser automatically.
            </p>
            <input
              type="file"
              accept="image/*"
              className="mt-3 block w-full text-sm text-slate-700 file:mr-3 file:rounded-md file:border-0 file:bg-emerald-600 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-white hover:file:bg-emerald-700 dark:text-slate-200 dark:file:bg-emerald-500 dark:hover:file:bg-emerald-600"
              onChange={(e) => {
                const file = e.currentTarget.files?.[0]
                if (!file || !onUploadAnswerImage) return
                const reader = new FileReader()
                reader.onload = () => {
                  const dataUrl = typeof reader.result === 'string' ? reader.result : null
                  if (!dataUrl) return
                  onUploadAnswerImage(dataUrl, file.name || null)
                }
                reader.readAsDataURL(file)
              }}
            />
          </div>

          {uploadedAnswerImage ? (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/40 dark:bg-emerald-950/30">
              <p className="text-xs font-medium text-emerald-900 dark:text-emerald-200">
                Uploaded{uploadedAnswerFileName ? `: ${uploadedAnswerFileName}` : ''}
              </p>
              <img
                src={uploadedAnswerImage}
                alt="Uploaded answer preview"
                className="mt-3 max-h-80 w-full max-w-xl rounded-lg border border-emerald-200 object-contain dark:border-emerald-900/40"
              />
            </div>
          ) : null}
        </div>
      ) : (
        <ul className="space-y-3" role="radiogroup" aria-label="Answer choices">
          {options.map((opt, i) => {
            const selected = selectedIndex === i
            return (
              <li key={i}>
                <button
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => onSelect(i)}
                  className={`flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left text-sm transition ${
                    selected
                      ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500 dark:border-emerald-400 dark:bg-emerald-950/40 dark:ring-emerald-400'
                      : 'border-slate-200 bg-slate-50/80 hover:border-slate-300 hover:bg-white dark:border-slate-600 dark:bg-slate-800/50 dark:hover:border-slate-500 dark:hover:bg-slate-800'
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
    </article>
  )
}

/**
 * Stand-in for a real payment gateway. Always runs in the browser; no money moves.
 * Replace with API calls when a back-end exists.
 */

export type DummyPayForResultParams = {
  examId: string
  examTitle: string
  /** Shown on the receipt, e.g. "₹499" */
  amountDisplay: string
}

export type DummyPaymentSuccess = {
  ok: true
  transactionId: string
  paidAtIso: string
}

export type DummyPaymentFailure = {
  ok: false
  code: string
  message: string
}

export type DummyPaymentResult = DummyPaymentSuccess | DummyPaymentFailure

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function makeTransactionId(examId: string): string {
  const part = typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID().slice(0, 8)
    : String(Math.random()).slice(2, 10)
  return `DUMMY-TXN-${Date.now()}-${part}-${examId.slice(0, 4)}`
}

export type PayForTestResultOptions = {
  /** Simulated network + gateway latency (ms). */
  delayMs?: number
  /** If true, resolves with a failure (for UI error handling demos). */
  forceFailure?: boolean
}

/**
 * Simulates charging the test fee and authorizing result unlock for `examId`.
 * Does not persist anything; callers should call `setResultPaidForExam` on success.
 */
export async function payForTestResult(
  params: DummyPayForResultParams,
  options?: PayForTestResultOptions,
): Promise<DummyPaymentResult> {
  const delayMs = options?.delayMs ?? 1400
  await sleep(delayMs)

  if (options?.forceFailure) {
    return {
      ok: false,
      code: 'DUMMY_DECLINED',
      message: 'Payment could not be completed (dummy forced failure).',
    }
  }

  return {
    ok: true,
    transactionId: makeTransactionId(params.examId),
    paidAtIso: new Date().toISOString(),
  }
}

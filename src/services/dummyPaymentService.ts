export type DummyPayForResultParams = {
  examId: string
  examTitle: string
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
  delayMs?: number
  forceFailure?: boolean
}

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

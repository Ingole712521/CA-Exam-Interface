/** Fisher–Yates shuffle (in-place copy) */
export function shuffleArray<T>(items: readonly T[]): T[] {
  const arr = [...items]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function shuffleOptions(
  options: readonly string[],
  correctAnswerIndex: number,
): { options: string[]; correctIndex: number } {
  const tagged = options.map((text, i) => ({
    text,
    wasCorrect: i === correctAnswerIndex,
  }))
  const shuffled = shuffleArray(tagged)
  const correctIndex = shuffled.findIndex((t) => t.wasCorrect)
  return {
    options: shuffled.map((t) => t.text),
    correctIndex: correctIndex === -1 ? correctAnswerIndex : correctIndex,
  }
}

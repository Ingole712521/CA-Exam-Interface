import type { ExamDefinition } from '../types/exam'

export const mockExams: ExamDefinition[] = [
  {
    id: 'ca-foundation-mock-1',
    title: 'CA Foundation — Integrated Mock Test',
    durationMinutes: 180,
    sections: [
      {
        id: 'accounts',
        name: 'Accounts',
        questions: [
          {
            id: 'acc-1',
            question:
              'Which accounting equation correctly represents the balance sheet?',
            options: [
              'Assets = Liabilities + Capital',
              'Assets + Liabilities = Capital',
              'Capital = Assets − Liabilities',
              'Liabilities = Assets + Capital',
            ],
            correctAnswer: 0,
          },
          {
            id: 'acc-2',
            question: 'Depreciation is allocated to match which accounting concept?',
            options: [
              'Money measurement',
              'Matching / accrual',
              'Cost concept',
              'Entity concept',
            ],
            correctAnswer: 1,
          },
          {
            id: 'acc-3',
            question:
              'A purchase return reduces which accounts typically?',
            options: [
              'Purchases and Creditors',
              'Sales and Debtors',
              'Cash and Capital',
              'Drawings and Bank',
            ],
            correctAnswer: 0,
          },
        ],
      },
      {
        id: 'law',
        name: 'Business Laws',
        questions: [
          {
            id: 'law-1',
            question:
              'An offer may lapse due to which of the following under the Indian Contract Act?',
            options: [
              'Acceptance in the prescribed mode only',
              'Revocation before acceptance',
              'Silence as acceptance',
              'Past consideration',
            ],
            correctAnswer: 1,
          },
          {
            id: 'law-2',
            question: 'A minor’s agreement is generally:',
            options: [
              'Voidable',
              'Valid',
              'Void ab initio',
              'Contingent',
            ],
            correctAnswer: 2,
          },
        ],
      },
      {
        id: 'quant',
        name: 'Quantitative Aptitude',
        questions: [
          {
            id: 'q-1',
            question:
              'If simple interest for 3 years at 8% p.a. is ₹2,400, the principal is:',
            options: ['₹8,000', '₹10,000', '₹12,000', '₹9,500'],
            correctAnswer: 1,
          },
          {
            id: 'q-2',
            question: 'The median of 4, 9, 3, 7, 12 is:',
            options: ['7', '8', '9', '6'],
            correctAnswer: 0,
          },
        ],
      },
    ],
  },
  {
    id: 'ca-inter-quick-drill',
    title: 'CA Inter — Quick Drill (45 min)',
    durationMinutes: 45,
    sections: [
      {
        id: 'tax',
        name: 'Indirect Tax',
        questions: [
          {
            id: 'gst-1',
            question:
              'IGST is levied on which nature of supply under GST?',
            options: [
              'Intra-state supply',
              'Inter-state supply',
              'Exempt supply only',
              'Non-taxable supply',
            ],
            correctAnswer: 1,
          },
          {
            id: 'gst-2',
            question: 'Input tax credit is generally available on:',
            options: [
              'Personal purchases',
              'Goods used for furtherance of business',
              'Blocked credit items under law',
              'Exempt supplies only',
            ],
            correctAnswer: 1,
          },
        ],
      },
      {
        id: 'audit',
        name: 'Auditing',
        questions: [
          {
            id: 'aud-1',
            question:
              'The primary objective of an audit of financial statements is to:',
            options: [
              'Detect all fraud',
              'Provide reasonable assurance',
              'Prepare financial statements',
              'Guarantee future performance',
            ],
            correctAnswer: 1,
          },
        ],
      },
    ],
  },
]

export function getExamById(id: string): ExamDefinition | undefined {
  return mockExams.find((e) => e.id === id)
}

import type { ExamDefinition } from '../types/exam'
import heroSample from '../assets/hero.png'

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
          {
            id: 'acc-theory-1',
            format: 'theoretical',
            passage:
              'The money measurement concept states that only transactions measurable in monetary terms are recorded.\n\nMateriality is an override: trivial items may be expensed even if they could technically be capitalised, when the effect on decisions is immaterial.',
            question:
              'Which statement best reflects the interaction of money measurement and materiality?',
            options: [
              'All qualitative information must be recorded in the books.',
              'Immaterial items may be treated pragmatically without breaking core recognition rules.',
              'Materiality eliminates the need for monetary measurement.',
              'Only cash transactions satisfy money measurement.',
            ],
            correctAnswer: 1,
          },
          {
            id: 'acc-case-1',
            format: 'case_study',
            passage:
              'Mira started a proprietorship on 1 April. She introduced ₹5,00,000 cash, borrowed ₹2,00,000 from a bank on a long-term loan, purchased furniture for ₹80,000 by cheque, and paid one year office rent of ₹1,20,000 in advance by cheque on the same day.',
            question:
              'Immediately after these transactions, what is the balance of the bank account in her books (before any other entries)?',
            options: ['₹5,00,000', '₹3,00,000', '₹2,00,000', '₹4,20,000'],
            correctAnswer: 1,
          },
          {
            id: 'acc-table-1',
            format: 'table',
            question:
              'Using the trial balance excerpt below, what is the total of the debit column before balancing?',
            table: {
              caption: 'Trial balance (excerpt)',
              headers: ['Account', 'Debit (₹)', 'Credit (₹)'],
              rows: [
                ['Cash', '40,000', '—'],
                ['Capital', '—', '50,000'],
                ['Purchases', '25,000', '—'],
                ['Sales', '—', '18,000'],
              ],
            },
            options: ['₹65,000', '₹68,000', '₹60,000', '₹55,000'],
            correctAnswer: 0,
          },
          {
            id: 'acc-img-1',
            format: 'image',
            question:
              'The illustration above is used only as a layout sample for image-based MCQs (figures, charts, scanned extracts). Which option describes a typical use in CA-style papers?',
            image: {
              src: heroSample,
              alt: 'Decorative sample image for demonstration',
            },
            options: [
              'Replacing all narrative requirements',
              'Presenting diagrammatic or source-document based data',
              'Eliminating the need for marks allocation',
              'Restricting questions to subjective format only',
            ],
            correctAnswer: 1,
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

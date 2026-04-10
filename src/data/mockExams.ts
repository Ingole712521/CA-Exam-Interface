import type { ExamDefinition } from '../types/exam'
import heroSample from '../assets/hero.png'

export const mockExams: ExamDefinition[] = [
  {
    id: 'ca-foundation-mock-1',
    title: 'CA Foundation — Integrated Mock Test',
    durationMinutes: 180,
    level: 'foundation',
    feeDisplay: '₹499',
    sections: [
      {
        id: 'accounts',
        name: 'Accounts',
        assessmentType: 'subjective',
        questions: [
          {
            id: 'acc-compound-q1',
            questionCategory: 'Q1 (Compulsory – Mixed Concepts)',
            passage:
              'M/s GreenGrow purchased inventory ₹4,80,000 on credit and sold 60% of it for ₹5,40,000 cash during the quarter. Closing inventory is valued at cost or net realisable value, whichever is lower.',
            question: 'Based on the short case above, answer the following:',
            parts: [
              {
                id: 'q1a',
                label: '(a)',
                prompt:
                  'Case-based MCQ: If cost of goods sold is 55% of sales (on sold units only), gross profit for the quarter is closest to:',
                marks: 6,
                format: 'case_study',
                options: [
                  '₹2,43,000',
                  '₹2,97,000',
                  '₹2,43,000 less any NRV write-down on closing stock',
                  'Cannot be determined without opening stock',
                ],
                correctAnswer: 2,
              },
              {
                id: 'q1b',
                label: '(b)',
                prompt:
                  'Theory: The matching concept in financial reporting primarily supports which objective?',
                marks: 4,
                format: 'theoretical',
                options: [
                  'Recording only cash transactions',
                  'Aligning expenses with the revenue they help generate',
                  'Valuing all assets at liquidation value',
                  'Deferring all liabilities indefinitely',
                ],
                correctAnswer: 1,
              },
            ],
          },
          {
            id: 'acc-compound-q2',
            headline: 'Q2 (20 Marks)',
            passage:
              'Alpha Ltd. closed its books on 31 March 2024. You are given that revenue from operations for the year was ₹42,00,000 and major expense heads are available in the working papers (illustrative).',
            question:
              'Answer either part (a) or part (b) below, and also answer part (c).',
            parts: [
              {
                id: 'q2a',
                label: '(a)',
                prompt:
                  'Prepare financial statements from the trial balance (upload a clear image of your structured answer / working).',
                marks: 10,
                orGroupId: 'q2-practical',
                format: 'upload',
                options: [],
                correctAnswer: 0,
              },
              {
                id: 'q2b',
                label: '(b)',
                prompt:
                  'Calculate goodwill using the super profit method from the assumptions in your working (upload your solution).',
                marks: 10,
                orGroupId: 'q2-practical',
                format: 'upload',
                options: [],
                correctAnswer: 0,
              },
              {
                id: 'q2c',
                label: '(c)',
                prompt:
                  'Theory: Which option best describes types of audit evidence you would expect in a statutory audit?',
                marks: 10,
                format: 'theoretical',
                options: [
                  'Only documentary evidence on paper',
                  'Physical, documentary, oral, analytical and other appropriate evidence',
                  'Only management representations',
                  'Evidence obtained solely from social media',
                ],
                correctAnswer: 1,
              },
            ],
          },
          {
            id: 'acc-1',
            format: 'theoretical',
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
            id: 'acc-bs-1',
            question:
              'Which of the following is classified as a current asset on a balance sheet?',
            options: ['Goodwill', 'Prepaid rent', 'Furniture', 'Patent'],
            correctAnswer: 1,
          },
          {
            id: 'acc-bs-2',
            question:
              'A bank overdraft (repayable on demand) is generally shown on the balance sheet under:',
            options: [
              'Current liabilities',
              'Non-current liabilities',
              'Reserves & surplus',
              'Non-current assets',
            ],
            correctAnswer: 0,
          },
          {
            id: 'acc-bs-3',
            question:
              'If total assets are ₹18,00,000 and total liabilities are ₹6,50,000, the capital (equity) is:',
            options: ['₹11,50,000', '₹24,50,000', '₹6,50,000', '₹18,00,000'],
            correctAnswer: 0,
          },
          {
            id: 'acc-bs-4',
            question:
              'If a machine costing ₹2,00,000 is purchased on credit, what is the immediate effect on the balance sheet?',
            options: [
              'Assets increase and liabilities increase by ₹2,00,000',
              'Assets increase and capital increases by ₹2,00,000',
              'Assets decrease and liabilities decrease by ₹2,00,000',
              'Capital decreases by ₹2,00,000',
            ],
            correctAnswer: 0,
          },
          {
            id: 'acc-bs-table-1',
            format: 'table',
            question:
              'Based on the balance sheet extract below, what is the current ratio?',
            table: {
              caption: 'Balance sheet extract (₹)',
              headers: ['Particulars', 'Amount'],
              rows: [
                ['Inventory', '2,40,000'],
                ['Trade receivables', '1,60,000'],
                ['Cash & bank', '80,000'],
                ['Trade payables', '2,00,000'],
                ['Outstanding expenses', '40,000'],
              ],
            },
            options: ['1.0 : 1', '1.5 : 1', '2.0 : 1', '2.4 : 1'],
            correctAnswer: 2,
          },
          {
            id: 'acc-rp-table-1',
            format: 'table',
            question:
              'From the Receipts and Payments account below, what is the total of the Receipts column?',
            table: {
              layout: 'receipts_payments',
              caption: 'Receipts and Payments (illustrative)',
              receipts: [
                { particular: 'Own Capital', amount: '8,00,000' },
                { particular: 'Loan', amount: '12,00,000' },
                { particular: 'Prescription Fees', amount: '26,40,000' },
                { particular: 'Visiting Fees', amount: '10,00,000' },
                { particular: 'Lecture Fees', amount: '96,000' },
                { particular: 'Pension Received', amount: '12,00,000' },
              ],
              payments: [
                { particular: 'Medicines Purchased', amount: '9,80,000' },
                { particular: 'Surgical Equipment', amount: '10,00,000' },
                { particular: 'Motor Car', amount: '12,80,000' },
                { particular: 'Motor Car Expenses', amount: '4,80,000' },
                { particular: 'Wages and Salaries', amount: '4,20,000' },
                { particular: 'Rent of Clinic', amount: '2,40,000' },
                { particular: 'General Charges', amount: '1,96,000' },
                { particular: 'Household Expenses', amount: '7,20,000' },
                { particular: 'Household Furniture', amount: '1,00,000' },
                {
                  particular: "Expenses on Daughter's Marriage",
                  amount: '8,60,000',
                },
                { particular: 'Interest on Loan', amount: '1,44,000' },
                { particular: 'Balance at Bank', amount: '4,40,000' },
                { particular: 'Cash in Hand', amount: '76,000' },
              ],
              receiptsTotal: '69,36,000',
              paymentsTotal: '69,36,000',
            },
            options: [
              '₹68,36,000',
              '₹69,36,000',
              '₹70,36,000',
              '₹67,36,000',
            ],
            correctAnswer: 1,
          },
          {
            id: 'acc-bs-theory-1',
            format: 'theoretical',
            passage:
              'Current items are expected to be realised/settled within the normal operating cycle or within 12 months.\n\nNon-current items are all other assets and liabilities.',
            question:
              'Which statement is most appropriate for classifying items on the balance sheet?',
            options: [
              'All loans are non-current by default.',
              'Classification depends only on legal form, not timing.',
              'Operating cycle / 12-month criterion is central to current vs non-current.',
              'Only cash and bank balances are current assets.',
            ],
            correctAnswer: 2,
          },
          {
            id: 'acc-bs-upload-1',
            format: 'upload',
            passage:
              'From the following particulars, prepare a balance sheet of Mr. Somesh as at 31st March 2021:\n\nCapital ₹5,50,000\nDrawings ₹10,000\nSundry Debtors ₹1,00,000\nSundry Creditors ₹80,000\nLoan from Bank ₹20,000\nNet Profit ₹1,60,000\nClosing Stock ₹50,000\nPlant and Machinery ₹1,50,000\nBuilding ₹1,20,000\nLand ₹3,00,000\nGoodwill ₹50,000\nFurniture and Fixtures ₹30,000',
            question:
              'Prepare the Balance Sheet (upload a clear image/photo of your working and final format).',
            options: [],
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
          // RTP Sep 2025 (Paper 1 – Accounting) style: stems adapted for MCQ / upload
          {
            id: 'acc-rtp-tf-1',
            format: 'theoretical',
            question:
              'At the end of the accounting year, nominal accounts in the ledger are typically:',
            options: [
              'Balanced like personal accounts and carried forward with a balance',
              'Totalled and closed by transfer to Trading and Profit & Loss Account',
              'Left open until the auditor certifies the accounts',
              'Converted into real accounts automatically',
            ],
            correctAnswer: 1,
          },
          {
            id: 'acc-rtp-tf-2',
            question:
              'Outstanding expenditure (expense accrued but not paid) is generally classified as:',
            options: [
              'A nominal account',
              'A personal account of a representative nature (payable to a person)',
              'A real account',
              'A memorandum account outside the ledger',
            ],
            correctAnswer: 1,
          },
          {
            id: 'acc-rtp-tf-3',
            question:
              'The main purpose of preparing a Bank Reconciliation Statement is to:',
            options: [
              'Arrive at the bank balance shown in the Cash Book only',
              'Explain differences between the balance as per Cash Book and as per Bank Statement on a date',
              'Replace the need for updating the Cash Book',
              'Record interest earned by the bank only',
            ],
            correctAnswer: 1,
          },
          {
            id: 'acc-rtp-tf-4',
            question:
              'Provision for discount on debtors is calculated:',
            options: [
              'Before deducting provision for doubtful debts from debtors',
              'After deducting provision for doubtful debts from debtors',
              'Only when there is no cash discount policy',
              'On gross sales before adjusting returns',
            ],
            correctAnswer: 1,
          },
          {
            id: 'acc-rtp-tf-5',
            question:
              'Land is generally not treated as a depreciable asset in financial accounts because:',
            options: [
              'It is always revalued every year',
              'It is assumed to have an unlimited useful life for depreciation purposes',
              'It is always classified as a current asset',
              'Depreciation applies only to intangible assets',
            ],
            correctAnswer: 1,
          },
          {
            id: 'acc-rtp-tf-6',
            question:
              'Under the periodic inventory system, closing inventory is usually ascertained by:',
            options: [
              'Perpetual running totals in the inventory ledger only',
              'Actual physical count of stock on hand at the end of the period',
              'Applying a fixed percentage to sales without counting',
              'Using only opening stock and purchases, ignoring closing count',
            ],
            correctAnswer: 1,
          },
          {
            id: 'acc-rtp-tf-7',
            question:
              'A Receipts and Payments Account of a not-for-profit concern records:',
            options: [
              'Only revenue nature receipts and payments',
              'Only capital nature receipts and payments',
              'Both revenue and capital nature receipts and payments',
              'Only non-cash adjustments',
            ],
            correctAnswer: 2,
          },
          {
            id: 'acc-rtp-tf-8',
            question:
              'Debentures Suspense Account (pending allotment) is shown in the Balance Sheet of a company on the:',
            options: [
              'Liability side under long-term borrowings',
              'Asset side (typically as a non-current asset)',
              'Equity and reserves section',
              'Notes to accounts only, never on the face of the Balance Sheet',
            ],
            correctAnswer: 1,
          },
          {
            id: 'acc-rtp-theory-1',
            format: 'theoretical',
            question:
              'Which pair best contrasts a Provision with a Contingent Liability?',
            options: [
              'Both are always recognised at the same amount in the Balance Sheet',
              'A provision is a present obligation with a reliable estimate; a contingent liability is a possible obligation that may not meet full recognition criteria',
              'Contingent liabilities are always shown as current liabilities; provisions are never recognised',
              'There is no distinction under Indian GAAP',
            ],
            correctAnswer: 1,
          },
          {
            id: 'acc-rtp-theory-2',
            format: 'theoretical',
            question:
              'The practice of preparing financial statements for definite periods (e.g. 1 April to 31 March) is known as the:',
            options: [
              'Money measurement concept',
              'Periodicity (or accounting period) concept',
              'Cost concept',
              'Dual aspect concept',
            ],
            correctAnswer: 1,
          },
          {
            id: 'acc-rtp-je-1',
            question:
              'Wages of ₹16,000 paid for erection of machinery should be recorded by:',
            options: [
              'Debiting Wages Expense and crediting Cash/Bank',
              'Debiting Machinery Account and crediting Cash/Bank (or Wages)',
              'Debiting Profit & Loss Account and crediting Machinery',
              'Debiting Suspense Account and crediting Cash',
            ],
            correctAnswer: 1,
          },
          {
            id: 'acc-rtp-caprev-1',
            question:
              'Inauguration expenses of a new manufacturing unit in an existing business are usually treated as:',
            options: [
              'Revenue expenditure — charged to Profit & Loss in the year',
              'Capital expenditure — deferred and amortised or capitalised as part of project cost, depending on policy',
              'Deferred revenue — always written off over 10 years',
              'Contingent expenditure — not recorded until paid',
            ],
            correctAnswer: 1,
          },
          {
            id: 'acc-rtp-tb-1',
            format: 'theoretical',
            question:
              'If the debit and credit totals of a trial balance agree, which statement is most appropriate?',
            options: [
              'There can be no errors in the books',
              'Ledger posting may still contain errors that do not disturb the equality of debits and credits (e.g. compensating errors)',
              'The financial statements are guaranteed to be free from material misstatement',
              'Every transaction has been recorded in the correct account',
            ],
            correctAnswer: 1,
          },
          {
            id: 'acc-rtp-tb-2',
            format: 'table',
            question:
              'In the trial balance extract below, what is the total of amounts appearing on the debit side (₹)?',
            table: {
              caption:
                'Trial balance extract (RTP-style illustration — ₹)',
              headers: ['Account', 'Debit (₹)', 'Credit (₹)'],
              rows: [
                ["Hari Om's Drawings", '8,460', '—'],
                ['Leasehold Premises', '11,250', '—'],
                ['Purchases', '18,885', '—'],
                ['Due from customers', '7,950', '—'],
                ['Sales', '—', '41,250'],
                ["Hari Om's Capital", '—', '23,340'],
              ],
            },
            options: ['46,545', '48,105', '41,250', '64,845'],
            correctAnswer: 0,
          },
          {
            id: 'acc-rtp-brs-1',
            format: 'case_study',
            passage:
              'Cash Book shows ₹27,570 as bank balance on 31 March. The bank credited a subsidy of ₹10,250 directly, not recorded in the Cash Book. No other adjustments.',
            question:
              'Before other reconciling items, the balance as per Pass Book (Bank Statement) compared to the current Cash Book balance is higher by:',
            options: ['₹0', '₹10,250', '₹17,320', '₹37,820'],
            correctAnswer: 1,
          },
          {
            id: 'acc-rtp-inv-1',
            format: 'case_study',
            passage:
              'Opening inventory ₹10,50,000. Purchases during the year ₹36,00,000. Sales ₹55,50,000. Manufacturing expenses ₹3,00,000. Gross profit is 20% on sales (ignore abnormal items).',
            question:
              'Cost of goods sold (at cost) for the year is:',
            options: ['₹11,10,000', '₹44,40,000', '₹55,50,000', '₹49,50,000'],
            correctAnswer: 1,
          },
          {
            id: 'acc-rtp-deb-1',
            question:
              'Weavers Ltd. issued 5,00,000 debentures of ₹100 each at 5% discount. Total discount on issue (amount) is:',
            options: ['₹5,00,000', '₹25,00,000', '₹95,00,000', '₹2,50,000'],
            correctAnswer: 1,
          },
          {
            id: 'acc-rtp-upload-1',
            format: 'upload',
            passage:
              'RTP-style journal entries (Sep 2025 pattern):\n\n(i) Employees took stock worth ₹50,000 (cost ₹45,000) on New Year’s eve; recovered from salary next month.\n\n(ii) Wages ₹16,000 paid for erection of machinery.\n\n(iii) Withdrew for personal use: goods at sales price ₹8,000 (cost ₹6,000) and cash ₹1,000.',
            question:
              'Pass the necessary journal entries for (i) to (iii). Upload a clear image of your working.',
            options: [],
            correctAnswer: 0,
          },
          {
            id: 'acc-dep-rtp-mcq-1',
            format: 'theoretical',
            question:
              'Under Straight Line Method, annual depreciation is generally computed as:',
            options: [
              '(Cost - Residual value) / Useful life',
              'Opening WDV x Rate',
              'Cost x (Remaining life / Sum of years digits)',
              'Actual machine hours x Closing WDV',
            ],
            correctAnswer: 0,
          },
          {
            id: 'acc-dep-rtp-mcq-2',
            format: 'case_study',
            passage:
              'A machine costing ₹2,00,000 has residual value ₹20,000 and useful life 9 years.',
            question:
              'Annual depreciation under SLM (ignoring partial periods) will be:',
            options: ['₹18,000', '₹20,000', '₹22,500', '₹25,000'],
            correctAnswer: 1,
          },
          {
            id: 'acc-inv-rtp-mcq-1',
            format: 'theoretical',
            question:
              'As per AS-2, which of the following is generally excluded from cost of inventories?',
            options: [
              'Costs of conversion',
              'Abnormal wastage',
              'Other costs to bring inventories to present location and condition',
              'Purchase-related freight inward',
            ],
            correctAnswer: 1,
          },
          {
            id: 'acc-inv-rtp-mcq-2',
            format: 'theoretical',
            question:
              'In periodic inventory system, closing inventory is primarily determined by:',
            options: [
              'Continuous book update only',
              'Management estimate without verification',
              'Actual physical count at period-end',
              'Gross profit ratio only',
            ],
            correctAnswer: 2,
          },
          {
            id: 'acc-dep-rtp-upload-2',
            format: 'upload',
            passage:
              'RTP-style depreciation question:\n\nA purchased machinery on 01.01.2021 for ₹1,94,000 and spent ₹6,000 on erection. On 01.07.2021 additional machinery ₹1,00,000 was purchased. On 01.01.2023, machinery purchased on 01.01.2021 was sold for ₹1,00,000. On 01.07.2023, a new machinery was purchased for ₹1,50,000. Depreciation is provided @10% p.a. on original cost upto 2023; in 2024 method changed to WDV @15% p.a.',
            question:
              'Prepare Machinery Account for calendar years 2021 to 2024 (upload clear working).',
            options: [],
            correctAnswer: 0,
          },
        ],
      },
      {
        id: 'law',
        name: 'Law',
        assessmentType: 'subjective',
        questions: [
          {
            id: 'law-1',
            format: 'theoretical',
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
          {
            id: 'law-u1',
            format: 'upload',
            passage:
              'Section 10 of the Indian Contract Act, 1872 lists essentials of a valid contract.',
            question:
              'Briefly explain any two essentials of a valid contract with simple examples. Upload a clear image of your written answer.',
            options: [],
            correctAnswer: 0,
          },
        ],
      },
      {
        id: 'economics',
        name: 'Economics',
        assessmentType: 'mcq',
        questions: [
          {
            id: 'econ-1',
            format: 'theoretical',
            question:
              'When demand increases and supply is unchanged, ceteris paribus, equilibrium price typically:',
            options: ['Falls', 'Rises', 'Is unchanged', 'Becomes negative'],
            correctAnswer: 1,
          },
          {
            id: 'econ-2',
            question: 'GDP at market prices is the sum of final goods and services valued at:',
            options: [
              'Factor cost only',
              'Market prices',
              'Wholesale prices only',
              'Constant prices from a single base year only',
            ],
            correctAnswer: 1,
          },
          {
            id: 'econ-table-1',
            format: 'table',
            question:
              'From the demand schedule below, when price falls from ₹40 to ₹20, quantity demanded rises from 100 to 180 units. Total expenditure at ₹40 is:',
            table: {
              caption: 'Demand schedule (illustrative)',
              headers: ['Price (₹)', 'Quantity'],
              rows: [
                ['40', '100'],
                ['30', '140'],
                ['20', '180'],
              ],
            },
            options: ['₹2,000', '₹4,000', '₹3,600', '₹6,000'],
            correctAnswer: 1,
          },
        ],
      },
      {
        id: 'mathematics',
        name: 'Mathematics',
        assessmentType: 'mcq',
        questions: [
          {
            id: 'q-1',
            format: 'theoretical',
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
    id: 'ca-intermediate-mock-1',
    title: 'CA Intermediate — Integrated Mock Test',
    durationMinutes: 240,
    level: 'intermediate',
    feeDisplay: '₹799',
    sections: [
      {
        id: 'adv-accounting',
        name: 'Advanced Accounting',
        assessmentType: 'mcq',
        questions: [
          {
            id: 'inter-aa-1',
            format: 'theoretical',
            question:
              'On acquisition, goodwill is usually measured as excess of consideration transferred over net identifiable assets acquired. Under Ind AS 103, this is part of:',
            options: [
              'The acquisition method — recognise goodwill as an asset at the acquisition date',
              'Pooling of interests — no goodwill is recognised',
              'Merger reserve only, never as an intangible',
              'Direct charge to retained earnings in all cases',
            ],
            correctAnswer: 0,
          },
          {
            id: 'inter-aa-2',
            question:
              'A parent holds 80% of a subsidiary. Non-controlling interest at acquisition is most often measured at:',
            options: [
              'Zero until the subsidiary pays a dividend',
              'Its proportionate share of the subsidiary’s identifiable net assets (or fair value of NCI if elected)',
              'Always at nominal value of shares held by minority',
              'The parent’s cost of investment only',
            ],
            correctAnswer: 1,
          },
          {
            id: 'inter-aa-3',
            format: 'table',
            question:
              'From the trial balance extract below, what is the total of amounts on the debit side (₹)?',
            table: {
              caption: 'Trial balance extract (₹)',
              headers: ['Account', 'Debit (₹)', 'Credit (₹)'],
              rows: [
                ['Cash at bank', '1,00,000', '—'],
                ['Trade receivables', '4,35,000', '—'],
                ['Machinery (cost)', '5,00,000', '—'],
                ['Purchases', '3,00,000', '—'],
                ['Accumulated depreciation', '—', '2,00,000'],
                ['Trade payables', '—', '1,50,000'],
                ['Equity share capital', '—', '5,00,000'],
                ['Revenue from operations', '—', '4,85,000'],
              ],
            },
            options: ['12,35,000', '13,35,000', '14,35,000', '15,35,000'],
            correctAnswer: 1,
          },
          {
            id: 'inter-aa-4',
            format: 'table',
            question:
              'From the Receipts and Payments account below, what is the total of the Receipts column (₹)?',
            table: {
              layout: 'receipts_payments',
              caption: 'Receipts and Payments (illustrative)',
              receipts: [
                { particular: 'Capital introduced', amount: '5,00,000' },
                { particular: 'Loan received', amount: '8,00,000' },
                { particular: 'Cash sales', amount: '12,40,000' },
                { particular: 'Collection from debtors', amount: '6,60,000' },
              ],
              payments: [
                { particular: 'Purchase of machinery', amount: '9,00,000' },
                { particular: 'Payment to creditors', amount: '11,20,000' },
                { particular: 'Rent and salaries', amount: '4,80,000' },
                { particular: 'Balance c/d (bank)', amount: '7,00,000' },
              ],
              receiptsTotal: '32,00,000',
              paymentsTotal: '32,00,000',
            },
            options: ['₹31,00,000', '₹32,00,000', '₹33,00,000', '₹34,00,000'],
            correctAnswer: 1,
          },
          {
            id: 'inter-aa-5',
            question: 'A debenture issued at discount is shown initially at:',
            options: ['Nominal value', 'Issue proceeds (net carrying amount)', 'Redemption value', 'Nil'],
            correctAnswer: 1,
          },
          {
            id: 'inter-aa-6',
            format: 'theoretical',
            question: 'Cash flow from purchase of plant appears under:',
            options: ['Operating activities', 'Investing activities', 'Financing activities', 'Extraordinary activities'],
            correctAnswer: 1,
          },
          {
            id: 'inter-aa-7',
            format: 'upload',
            passage:
              'Prepare a concise note with format on treatment of goodwill on acquisition and on impairment testing at year end.',
            question: 'Upload your structured answer with working notes.',
            options: [],
            correctAnswer: 0,
          },
          {
            id: 'inter-aa-8',
            format: 'upload',
            passage:
              'A parent acquires 75% stake in a subsidiary. Given net identifiable assets and consideration, prepare a short consolidation working.',
            question: 'Upload the goodwill and NCI computation.',
            options: [],
            correctAnswer: 0,
          },
          {
            id: 'inter-aa-9',
            question: 'Under AS 10, a change in depreciation method is treated as:',
            options: ['Change in estimate', 'Prior period item only', 'Change in accounting policy with retrospective restatement always', 'Extraordinary item'],
            correctAnswer: 0,
          },
          {
            id: 'inter-aa-10',
            format: 'upload',
            passage:
              'Trial balance extract includes machinery, provision for depreciation and disposal details.',
            question: 'Prepare machinery account and provision for depreciation account.',
            options: [],
            correctAnswer: 0,
          },
          {
            id: 'inter-aa-11',
            format: 'case_study',
            passage:
              'A machine (cost ₹5,00,000) is sold for ₹2,20,000; accumulated depreciation is ₹2,40,000.',
            question: 'Result on disposal is:',
            options: ['Profit ₹40,000', 'Loss ₹40,000', 'No gain no loss', 'Profit ₹20,000'],
            correctAnswer: 0,
          },
          {
            id: 'inter-aa-12',
            format: 'upload',
            passage:
              'Draft final account extracts for depreciation, bad debts and provision adjustments from given balances.',
            question: 'Upload your final account presentation.',
            options: [],
            correctAnswer: 0,
          },
        ],
      },
      {
        id: 'corporate-law',
        name: 'Corporate & Other Laws',
        assessmentType: 'mcq',
        questions: [
          {
            id: 'inter-law-1',
            format: 'theoretical',
            question:
              'Which statement best describes the liability of members in a company limited by shares?',
            options: [
              'Unlimited liability for all debts of the company',
              'Liability limited to the amount unpaid, if any, on the shares held',
              'Liability extends to personal assets for tax dues only',
              'No liability once shares are fully paid',
            ],
            correctAnswer: 1,
          },
          {
            id: 'inter-law-2',
            question:
              'A special resolution under the Companies Act generally requires:',
            options: [
              'A simple majority of members present and voting',
              'Approval by a specified majority (typically not less than three-fourths) of votes cast',
              'Unanimous consent of all shareholders',
              'Board resolution only, without members’ vote',
            ],
            correctAnswer: 1,
          },
          {
            id: 'inter-law-3',
            format: 'table',
            question:
              'At an extraordinary general meeting, 320 members were present (eligible to vote). Votes cast on a special resolution: 250 in favour, 70 against. Has the special resolution passed?',
            table: {
              caption: 'EGM voting summary',
              headers: ['Particulars', 'Number'],
              rows: [
                ['Members present and voting', '320'],
                ['Votes in favour', '250'],
                ['Votes against', '70'],
              ],
            },
            options: [
              'No — less than three-fourths of members present',
              'Yes — not less than three-fourths of votes cast are in favour',
              'No — quorum was not achieved',
              'Invalid — abstentions must be counted as against',
            ],
            correctAnswer: 1,
          },
          {
            id: 'inter-law-4',
            question: 'Doctrine of indoor management protects:',
            options: ['Directors only', 'Outsiders dealing in good faith', 'Auditors only', 'Promoters only'],
            correctAnswer: 1,
          },
          {
            id: 'inter-law-5',
            format: 'theoretical',
            question: 'Minimum number of directors in a public company is:',
            options: ['1', '2', '3', '5'],
            correctAnswer: 2,
          },
          {
            id: 'inter-law-6',
            format: 'case_study',
            passage:
              'A notice period for a board meeting was not complied with for one director, but urgent business was transacted.',
            question: 'Most appropriate legal view is:',
            options: ['Meeting automatically valid', 'Meeting always void', 'Validity depends on ratification/urgency and compliance provisions', 'Only chairman can validate'],
            correctAnswer: 2,
          },
          {
            id: 'inter-law-7',
            format: 'upload',
            passage:
              'Explain distinctions between ordinary resolution and special resolution with practical examples.',
            question: 'Upload your written answer.',
            options: [],
            correctAnswer: 0,
          },
          {
            id: 'inter-law-8',
            format: 'upload',
            passage:
              'Prepare a short note on oppression and mismanagement remedies under company law.',
            question: 'Upload your answer in point format.',
            options: [],
            correctAnswer: 0,
          },
          {
            id: 'inter-law-9',
            question: 'Quorum in a general meeting ensures:',
            options: ['Presence of creditors', 'Valid minimum member participation', 'Approval by regulators', 'Attendance of all directors'],
            correctAnswer: 1,
          },
          {
            id: 'inter-law-10',
            format: 'case_study',
            passage:
              'Articles restrict transfer of shares in a private company; a member seeks transfer to outsider.',
            question: 'The company may refuse transfer if:',
            options: ['No reason required in any case', 'Articles permit and due process is followed', 'Member is minority holder', 'Transferor is promoter'],
            correctAnswer: 1,
          },
          {
            id: 'inter-law-11',
            format: 'upload',
            passage:
              'Draft board resolution format for issue of shares on rights basis.',
            question: 'Upload the board resolution draft.',
            options: [],
            correctAnswer: 0,
          },
          {
            id: 'inter-law-12',
            format: 'upload',
            passage:
              'State short notes on doctrine of ultra vires and memorandum clauses.',
            question: 'Upload concise legal notes.',
            options: [],
            correctAnswer: 0,
          },
        ],
      },
      {
        id: 'costing',
        name: 'Cost & Management Accounting',
        assessmentType: 'mcq',
        questions: [
          {
            id: 'inter-cost-1',
            format: 'theoretical',
            question:
              'In process costing, normal loss is typically:',
            options: [
              'Charged entirely to abnormal loss account',
              'Absorbed in the cost of good output in an expected manner',
              'Ignored in cost accounts',
              'Capitalised to fixed assets',
            ],
            correctAnswer: 1,
          },
          {
            id: 'inter-cost-2',
            question:
              'Pre-determined overhead absorption rates are used mainly to:',
            options: [
              'Eliminate the need for any overhead accounting',
              'Spread fixed overheads to products/jobs in advance for timely costing',
              'Ensure actual overheads always equal absorbed overheads',
              'Value inventory at selling price',
            ],
            correctAnswer: 1,
          },
          {
            id: 'inter-cost-3',
            format: 'table',
            question:
              'Using the job cost data below, what is the prime cost for Job Z?',
            table: {
              caption: 'Job Z — cost elements (₹)',
              headers: ['Element', 'Amount (₹)'],
              rows: [
                ['Direct material', '1,84,000'],
                ['Direct labour', '96,000'],
                ['Factory overheads (absorbed)', '72,000'],
                ['Administrative overheads (allocated)', '48,000'],
              ],
            },
            options: ['₹2,80,000', '₹3,52,000', '₹4,00,000', '₹2,20,000'],
            correctAnswer: 0,
          },
          {
            id: 'inter-cost-4',
            format: 'case_study',
            passage:
              'Selling price per unit ₹100, variable cost ₹60, fixed cost ₹2,00,000.',
            question: 'Contribution per unit is:',
            options: ['₹20', '₹30', '₹40', '₹60'],
            correctAnswer: 2,
          },
          {
            id: 'inter-cost-5',
            question: 'Break-even point in units is:',
            options: ['Fixed cost / Contribution per unit', 'Sales / PV ratio', 'Variable cost / sales', 'Contribution / fixed cost'],
            correctAnswer: 0,
          },
          {
            id: 'inter-cost-6',
            format: 'upload',
            passage:
              'Given material, labour and overhead data for a job, prepare a cost sheet and determine quotation price.',
            question: 'Upload full cost sheet working.',
            options: [],
            correctAnswer: 0,
          },
          {
            id: 'inter-cost-7',
            format: 'upload',
            passage:
              'Process costing data includes normal loss, scrap value and transfer to next process.',
            question: 'Prepare process account and equivalent units working.',
            options: [],
            correctAnswer: 0,
          },
          {
            id: 'inter-cost-8',
            question: 'In standard costing, material price variance is:',
            options: ['(SP - AP) x AQ', '(SQ - AQ) x SP', '(SP - AP) x SQ', '(AQ - SQ) x AP'],
            correctAnswer: 0,
          },
          {
            id: 'inter-cost-9',
            format: 'case_study',
            passage:
              'Budgeted output is 10,000 units; actual output is 9,000 units with fixed overhead unchanged.',
            question: 'Most likely interpretation is:',
            options: ['Volume variance may be adverse', 'Efficiency variance always favourable', 'Fixed overhead cannot vary', 'No variance arises'],
            correctAnswer: 0,
          },
          {
            id: 'inter-cost-10',
            format: 'upload',
            passage:
              'Prepare reconciliation statement between costing profit and financial profit from given data.',
            question: 'Upload your reconciliation statement.',
            options: [],
            correctAnswer: 0,
          },
          {
            id: 'inter-cost-11',
            question: 'Economic order quantity (EOQ) aims to minimize:',
            options: ['Carriage inward only', 'Ordering and carrying costs together', 'Purchase price only', 'Stock-out cost only'],
            correctAnswer: 1,
          },
          {
            id: 'inter-cost-12',
            format: 'upload',
            passage:
              'Data given for CVP analysis: sales mix, variable cost ratio and fixed cost.',
            question: 'Compute BEP, margin of safety and required sales for target profit.',
            options: [],
            correctAnswer: 0,
          },
        ],
      },
      {
        id: 'taxation',
        name: 'Taxation',
        assessmentType: 'mcq',
        questions: [
          {
            id: 'inter-tax-1',
            format: 'theoretical',
            question:
              'Input tax credit (ITC) under GST is generally available when:',
            options: [
              'Goods are used wholly for personal purposes',
              'Goods/services are used in the course or furtherance of business and other conditions are met',
              'The supplier has not filed any return',
              'Only for exempt supplies',
            ],
            correctAnswer: 1,
          },
          {
            id: 'inter-tax-2',
            question:
              'Residential status of an individual under the Income-tax Act is relevant primarily for:',
            options: [
              'Determining the rate of TDS on salary only',
              'Determining which income is taxable in India and how it is taxed',
              'GST registration threshold',
              'Company law compliance only',
            ],
            correctAnswer: 1,
          },
          {
            id: 'inter-tax-3',
            format: 'table',
            question:
              'From the GST summary below (all figures ₹, same tax rate), net GST payable for the period is:',
            table: {
              caption: 'GST summary (illustrative)',
              headers: ['Particulars', 'Taxable value', 'GST @ 18%'],
              rows: [
                ['Outward taxable supplies', '10,00,000', '1,80,000'],
                ['Inward supplies (ITC available)', '6,00,000', '1,08,000'],
              ],
            },
            options: ['₹72,000', '₹1,08,000', '₹1,80,000', '₹2,88,000'],
            correctAnswer: 0,
          },
          {
            id: 'inter-tax-4',
            format: 'theoretical',
            question: 'TDS stands for:',
            options: ['Tax deducted at source', 'Tax due at settlement', 'Transfer duty at source', 'Total deduction statement'],
            correctAnswer: 0,
          },
          {
            id: 'inter-tax-5',
            format: 'case_study',
            passage:
              'A registered supplier makes taxable outward supply and uses inputs for business purposes.',
            question: 'ITC can be claimed subject to:',
            options: ['No invoice needed', 'Satisfaction of statutory conditions and matching requirements', 'Only cash payment of tax', 'Turnover below threshold'],
            correctAnswer: 1,
          },
          {
            id: 'inter-tax-6',
            format: 'upload',
            passage:
              'Compute total income from salary, house property and other sources from given particulars.',
            question: 'Upload your computation of total income.',
            options: [],
            correctAnswer: 0,
          },
          {
            id: 'inter-tax-7',
            format: 'upload',
            passage:
              'Given purchase/sales data with GST rates and ITC restrictions, compute net GST payable.',
            question: 'Upload GST output/input set-off working.',
            options: [],
            correctAnswer: 0,
          },
          {
            id: 'inter-tax-8',
            question: 'Under GST, place of supply helps determine:',
            options: ['ITR due date', 'Whether supply is intra-state or inter-state', 'Book profit', 'Depreciation rate'],
            correctAnswer: 1,
          },
          {
            id: 'inter-tax-9',
            format: 'case_study',
            passage:
              'An individual stays in India for 190 days during PY and satisfies additional conditions.',
            question: 'Residential status is generally:',
            options: ['Non-resident', 'Resident', 'Always RNOR', 'Always deemed resident regardless facts'],
            correctAnswer: 1,
          },
          {
            id: 'inter-tax-10',
            format: 'upload',
            passage:
              'Prepare computation of capital gains and taxable income from transfer of long-term asset.',
            question: 'Upload full income-tax computation.',
            options: [],
            correctAnswer: 0,
          },
          {
            id: 'inter-tax-11',
            question: 'Reverse charge under GST means tax is paid by:',
            options: ['Supplier always', 'Recipient in notified cases', 'E-commerce operator only', 'Government treasury only'],
            correctAnswer: 1,
          },
          {
            id: 'inter-tax-12',
            format: 'upload',
            passage:
              'Prepare brief note on deduction provisions and rebate applicability for a resident individual.',
            question: 'Upload your answer with section-wise breakup.',
            options: [],
            correctAnswer: 0,
          },
        ],
      },
    ],
  },
  {
    id: 'ca-final-mock-1',
    title: 'CA Final — Integrated Mock Test',
    durationMinutes: 240,
    level: 'final',
    feeDisplay: '₹999',
    sections: [
      {
        id: 'financial-reporting',
        name: 'Financial Reporting',
        assessmentType: 'mcq',
        questions: [
          {
            id: 'final-fr-1',
            format: 'theoretical',
            question:
              'Under Ind AS 116, a lessee generally recognises:',
            options: [
              'Only lease expenses on a straight-line basis with no asset',
              'A right-of-use asset and a lease liability for most leases',
              'The leased asset only when ownership transfers at inception',
              'A contingent liability for all operating leases',
            ],
            correctAnswer: 1,
          },
          {
            id: 'final-fr-2',
            question:
              'Impairment testing under Ind AS 36 for goodwill is typically performed:',
            options: [
              'Only when the entity disposes of the cash-generating unit',
              'At least annually at the level of a cash-generating unit (or group of units) to which goodwill is allocated',
              'Never — goodwill is never tested for impairment',
              'Only in the year of acquisition',
            ],
            correctAnswer: 1,
          },
          {
            id: 'final-fr-3',
            format: 'table',
            question:
              'Entity revenue for the year is ₹50,00,000. Using the segment table below, how many reportable segments exceed 10% of total revenue?',
            table: {
              caption: 'Segment revenue (₹)',
              headers: ['Segment', 'Revenue'],
              rows: [
                ['A', '18,00,000'],
                ['B', '7,00,000'],
                ['C', '5,50,000'],
                ['D', '19,50,000'],
              ],
            },
            options: ['1', '2', '3', '4'],
            correctAnswer: 3,
          },
          {
            id: 'final-fr-4',
            format: 'table',
            question:
              'From the Receipts and Payments account below, what is the total of the Payments column (₹)?',
            table: {
              layout: 'receipts_payments',
              caption: 'Not-for-profit — Receipts and Payments (illustrative)',
              receipts: [
                { particular: 'Opening cash & bank', amount: '2,40,000' },
                { particular: 'Subscriptions received', amount: '18,60,000' },
                { particular: 'Donations (general)', amount: '4,20,000' },
                { particular: 'Interest on investments', amount: '1,80,000' },
              ],
              payments: [
                { particular: 'Salaries and stipends', amount: '9,20,000' },
                { particular: 'Programme expenses', amount: '11,40,000' },
                { particular: 'Administrative overheads', amount: '3,60,000' },
                { particular: 'Closing cash & bank', amount: '2,80,000' },
              ],
              receiptsTotal: '27,00,000',
              paymentsTotal: '27,00,000',
            },
            options: ['₹25,00,000', '₹26,00,000', '₹27,00,000', '₹28,00,000'],
            correctAnswer: 2,
          },
          {
            id: 'final-fr-5',
            question: 'Deferred tax asset is recognized when:',
            options: ['It is probable that taxable profits will be available', 'There is always timing difference', 'The auditor demands it', 'Entity reports loss'],
            correctAnswer: 0,
          },
          {
            id: 'final-fr-6',
            format: 'upload',
            passage:
              'Given data for lease liability and right-of-use asset, prepare first-year lease accounting entries and schedule.',
            question: 'Upload lease accounting working.',
            options: [],
            correctAnswer: 0,
          },
          {
            id: 'final-fr-7',
            format: 'upload',
            passage:
              'Prepare consolidated statement extract with inter-company unrealized profit adjustment.',
            question: 'Upload consolidation working notes.',
            options: [],
            correctAnswer: 0,
          },
          {
            id: 'final-fr-8',
            question: 'In statement of cash flows, interest paid is generally classified under:',
            options: ['Operating/financing as per standard policy', 'Investing only', 'Always extraordinary', 'Never shown'],
            correctAnswer: 0,
          },
          {
            id: 'final-fr-9',
            format: 'case_study',
            passage:
              'An indicator suggests impairment of a CGU containing goodwill.',
            question: 'Recoverable amount is higher of:',
            options: ['Fair value less costs of disposal and value in use', 'Cost and carrying amount', 'Value in use and historical cost', 'NRV and replacement cost'],
            correctAnswer: 0,
          },
          {
            id: 'final-fr-10',
            format: 'upload',
            passage:
              'Draft disclosure notes for provisions, contingent liabilities and contingent assets with suitable classification.',
            question: 'Upload disclosure draft.',
            options: [],
            correctAnswer: 0,
          },
          {
            id: 'final-fr-11',
            question: 'Earnings per share is computed as profit attributable to equity holders divided by:',
            options: ['Closing shares only', 'Weighted average equity shares', 'Authorized shares', 'Issued preference shares'],
            correctAnswer: 1,
          },
          {
            id: 'final-fr-12',
            format: 'upload',
            passage:
              'Prepare segment reporting extract from given operating segment data.',
            question: 'Upload segment note working.',
            options: [],
            correctAnswer: 0,
          },
        ],
      },
      {
        id: 'sfm',
        name: 'Strategic Financial Management',
        assessmentType: 'mcq',
        questions: [
          {
            id: 'final-sfm-1',
            format: 'theoretical',
            question:
              'In the CAPM, the expected return on a security is most closely tied to:',
            options: [
              'Only the risk-free rate, regardless of market risk',
              'The risk-free rate plus a risk premium based on the security’s systematic risk (beta)',
              'The company’s book value per share',
              'Historical dividend yield alone',
            ],
            correctAnswer: 1,
          },
          {
            id: 'final-sfm-2',
            question:
              'The weighted average cost of capital (WACC) is used in practice mainly to:',
            options: [
              'Compute statutory depreciation',
              'Discount expected cash flows when valuing projects or the firm (with consistent assumptions)',
              'Determine GST rates',
              'Measure operating leverage only',
            ],
            correctAnswer: 1,
          },
          {
            id: 'final-sfm-3',
            format: 'table',
            question:
              'Using the probability distribution below, the expected return on the project is closest to:',
            table: {
              caption: 'Scenario returns',
              headers: ['Scenario', 'Probability', 'Return (%)'],
              rows: [
                ['Strong', '0.25', '22'],
                ['Base', '0.55', '14'],
                ['Weak', '0.20', '4'],
              ],
            },
            options: ['12.0%', '13.5%', '14.0%', '15.5%'],
            correctAnswer: 2,
          },
          {
            id: 'final-sfm-4',
            format: 'case_study',
            passage:
              'Risk-free rate 7%, market return 13%, beta 1.2.',
            question: 'Expected return under CAPM is:',
            options: ['12.2%', '13.2%', '14.2%', '15.0%'],
            correctAnswer: 2,
          },
          {
            id: 'final-sfm-5',
            question: 'Duration in bond analysis measures sensitivity to:',
            options: ['Credit rating changes only', 'Interest rate changes', 'Tax rate changes', 'Exchange control'],
            correctAnswer: 1,
          },
          {
            id: 'final-sfm-6',
            format: 'upload',
            passage:
              'Given project cash flows and discount rate, compute NPV and IRR with decision comment.',
            question: 'Upload capital budgeting working.',
            options: [],
            correctAnswer: 0,
          },
          {
            id: 'final-sfm-7',
            format: 'upload',
            passage:
              'Evaluate currency hedge using forward contract versus money market hedge from given forex data.',
            question: 'Upload hedge comparison and recommendation.',
            options: [],
            correctAnswer: 0,
          },
          {
            id: 'final-sfm-8',
            question: 'Operating leverage is high when:',
            options: ['Variable cost dominates', 'Fixed cost is relatively high', 'No contribution exists', 'Sales are zero'],
            correctAnswer: 1,
          },
          {
            id: 'final-sfm-9',
            format: 'case_study',
            passage:
              'A portfolio manager wants to reduce systematic risk without liquidating all holdings.',
            question: 'A practical approach is:',
            options: ['Use index futures hedge', 'Buy only penny stocks', 'Increase unsystematic risk', 'Ignore beta'],
            correctAnswer: 0,
          },
          {
            id: 'final-sfm-10',
            format: 'upload',
            passage:
              'Compute EVA using NOPAT, capital employed and weighted average cost of capital.',
            question: 'Upload EVA computation and interpretation.',
            options: [],
            correctAnswer: 0,
          },
          {
            id: 'final-sfm-11',
            question: 'In dividend valuation model (constant growth), value is:',
            options: ['D1 / (ke - g)', 'D0 / ke', 'EPS / PE ratio', 'D1 x (ke + g)'],
            correctAnswer: 0,
          },
          {
            id: 'final-sfm-12',
            format: 'upload',
            passage:
              'Prepare comparative statement on lease versus buy decision using after-tax cash flows.',
            question: 'Upload lease-buy analysis.',
            options: [],
            correctAnswer: 0,
          },
        ],
      },
      {
        id: 'auditing',
        name: 'Advanced Auditing & Professional Ethics',
        assessmentType: 'mcq',
        questions: [
          {
            id: 'final-audit-1',
            format: 'theoretical',
            question:
              'The objective of an audit of financial statements is to:',
            options: [
              'Guarantee that the financial statements are free from all fraud',
              'Obtain reasonable assurance about whether the financial statements are free from material misstatement',
              'Prepare the financial statements on behalf of management',
              'Replace the entity’s internal control system',
            ],
            correctAnswer: 1,
          },
          {
            id: 'final-audit-2',
            question:
              'A key threat to independence when an audit firm provides long-term bookkeeping services to an audit client is usually managed through:',
            options: [
              'Ignoring the threat if the fee is small',
              'Safeguards such as prohibition, rotation, or use of separate teams — or declining/restructuring the engagement',
              'Disclosing the threat only in management letter',
              'Relying solely on verbal confirmation from the client',
            ],
            correctAnswer: 1,
          },
          {
            id: 'final-audit-3',
            format: 'table',
            question:
              'Audit planning sets overall materiality at 1% of total assets. From the extract below, overall materiality is approximately:',
            table: {
              caption: 'Balance sheet extract (₹ lakhs)',
              headers: ['Particulars', 'Amount'],
              rows: [
                ['Property, plant & equipment', '4,200'],
                ['Inventories', '980'],
                ['Trade receivables', '620'],
                ['Cash and bank', '200'],
                ['Total assets', '6,000'],
              ],
            },
            options: ['₹40 lakhs', '₹50 lakhs', '₹60 lakhs', '₹70 lakhs'],
            correctAnswer: 2,
          },
          {
            id: 'final-audit-4',
            format: 'theoretical',
            question: 'Test of controls primarily provides evidence about:',
            options: ['Operating effectiveness of controls', 'Final account preparation only', 'Profit appropriation', 'Tax computation only'],
            correctAnswer: 0,
          },
          {
            id: 'final-audit-5',
            format: 'case_study',
            passage:
              'Inventory counts are held at year-end at multiple locations with limited auditor presence.',
            question: 'Most suitable response is:',
            options: ['Ignore inventory', 'Design alternative audit procedures and observe selected counts', 'Issue adverse opinion immediately', 'Rely only on management certification'],
            correctAnswer: 1,
          },
          {
            id: 'final-audit-6',
            format: 'upload',
            passage:
              'Draft an audit program for revenue recognition including controls and substantive procedures.',
            question: 'Upload your audit program.',
            options: [],
            correctAnswer: 0,
          },
          {
            id: 'final-audit-7',
            format: 'upload',
            passage:
              'Prepare key points for CARO reporting areas from a manufacturing company case.',
            question: 'Upload CARO checklist style answer.',
            options: [],
            correctAnswer: 0,
          },
          {
            id: 'final-audit-8',
            question: 'Professional skepticism means auditor should:',
            options: ['Assume management dishonesty always', 'Maintain questioning mind and critical assessment', 'Accept all explanations', 'Avoid corroborative evidence'],
            correctAnswer: 1,
          },
          {
            id: 'final-audit-9',
            format: 'case_study',
            passage:
              'Subsequent events after reporting period indicate material litigation loss not adjusted/disclosed.',
            question: 'Auditor should generally:',
            options: ['Ignore if after year-end', 'Require adjustment/disclosure and modify report if not done', 'Depend only on legal letter date', 'Resign in all cases'],
            correctAnswer: 1,
          },
          {
            id: 'final-audit-10',
            format: 'upload',
            passage:
              'Prepare a specimen qualified opinion paragraph for limitation of scope in inventory verification.',
            question: 'Upload draft opinion wording.',
            options: [],
            correctAnswer: 0,
          },
          {
            id: 'final-audit-11',
            question: 'Audit evidence hierarchy generally considers external evidence as:',
            options: ['Less reliable than internal always', 'More reliable than internal evidence', 'Equivalent in all cases', 'Irrelevant for reporting'],
            correctAnswer: 1,
          },
          {
            id: 'final-audit-12',
            format: 'upload',
            passage:
              'Write short note on ethical threats and safeguards for assurance engagements.',
            question: 'Upload your ethics note.',
            options: [],
            correctAnswer: 0,
          },
        ],
      },
      {
        id: 'direct-tax',
        name: 'Direct Tax Laws & International Tax',
        assessmentType: 'mcq',
        questions: [
          {
            id: 'final-dt-1',
            format: 'theoretical',
            question:
              'Under transfer pricing rules, the “arm’s length price” is generally the price that would have been charged between:',
            options: [
              'Related parties only, ignoring unrelated transactions',
              'Independent enterprises in comparable uncontrolled transactions',
              'The taxpayer and any government body',
              'Domestic associates only, excluding foreign entities',
            ],
            correctAnswer: 1,
          },
          {
            id: 'final-dt-2',
            question:
              'A tax treaty (Double Taxation Avoidance Agreement) between two countries is primarily intended to:',
            options: [
              'Eliminate tax in both countries on the same income',
              'Allocate taxing rights and provide relief from double taxation in line with agreed rules',
              'Fix a single global tax rate for all residents',
              'Replace domestic income-tax law entirely',
            ],
            correctAnswer: 1,
          },
          {
            id: 'final-dt-3',
            format: 'table',
            question:
              'From the heads below (all amounts ₹), gross total income before Chapter VI-A deductions is:',
            table: {
              caption: 'Income heads (illustrative)',
              headers: ['Head', 'Amount (₹)'],
              rows: [
                ['Income from salary', '18,50,000'],
                ['Income from house property', '2,40,000'],
                ['Income from other sources', '1,10,000'],
                ['Agricultural income (exempt)', '3,00,000'],
              ],
            },
            options: ['₹22,00,000', '₹25,00,000', '₹19,90,000', '₹21,60,000'],
            correctAnswer: 0,
          },
          {
            id: 'final-dt-4',
            format: 'case_study',
            passage:
              'A resident taxpayer earns income in India and in treaty country with tax deducted there.',
            question: 'Relief from double taxation is generally available through:',
            options: ['Ignoring foreign income', 'Tax credit/exemption as per treaty and domestic law', 'Pay tax twice without relief', 'Only unilateral waiver by employer'],
            correctAnswer: 1,
          },
          {
            id: 'final-dt-5',
            question: 'PE (Permanent Establishment) is relevant in international tax for:',
            options: ['Customs duty valuation', 'Allocation of taxing rights for business profits', 'GST composition levy', 'TDS on salary only'],
            correctAnswer: 1,
          },
          {
            id: 'final-dt-6',
            format: 'upload',
            passage:
              'Compute total income and tax liability of a corporate assessee including brought-forward losses.',
            question: 'Upload complete corporate tax computation.',
            options: [],
            correctAnswer: 0,
          },
          {
            id: 'final-dt-7',
            format: 'upload',
            passage:
              'Given associated enterprise transactions, prepare transfer pricing adjustment working under CUP/TNMM assumptions.',
            question: 'Upload TP computation and conclusion.',
            options: [],
            correctAnswer: 0,
          },
          {
            id: 'final-dt-8',
            question: 'Advance ruling mechanism is mainly meant for:',
            options: ['Final appellate order', 'Clarity on tax positions in specified cases', 'Penalty waiver only', 'Reopening all assessments'],
            correctAnswer: 1,
          },
          {
            id: 'final-dt-9',
            format: 'case_study',
            passage:
              'A non-resident earns royalty from India under treaty with concessional rate provisions.',
            question: 'Applicable tax rate should generally be:',
            options: ['Higher of treaty and domestic rates always', 'Lower of treaty and domestic rate, subject to conditions', 'Zero in all royalty cases', 'Rate decided by payer'],
            correctAnswer: 1,
          },
          {
            id: 'final-dt-10',
            format: 'upload',
            passage:
              'Prepare brief note on GAAR applicability and key safeguards from a practical scenario.',
            question: 'Upload your GAAR analysis note.',
            options: [],
            correctAnswer: 0,
          },
          {
            id: 'final-dt-11',
            question: 'Equalisation levy is targeted at:',
            options: ['Traditional manufacturing sales', 'Specified digital economy transactions', 'Agricultural income', 'Capital gains only'],
            correctAnswer: 1,
          },
          {
            id: 'final-dt-12',
            format: 'upload',
            passage:
              'From given data, compute withholding tax obligations on payments to residents and non-residents.',
            question: 'Upload TDS/TCS computation sheet.',
            options: [],
            correctAnswer: 0,
          },
        ],
      },
    ],
  },
]

export function getExamById(id: string): ExamDefinition | undefined {
  return mockExams.find((e) => e.id === id)
}

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
        ],
      },
    ],
  },
]

export function getExamById(id: string): ExamDefinition | undefined {
  return mockExams.find((e) => e.id === id)
}

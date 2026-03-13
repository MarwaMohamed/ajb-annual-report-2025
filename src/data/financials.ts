export const heroMetrics = [
  { value: 1506, prefix: "SAR ", suffix: "M", label: "Net Profit After Zakat", decimals: 0 },
  { value: 165.9, prefix: "SAR ", suffix: "B", label: "Total Assets", decimals: 1 },
  { value: 22, prefix: "", suffix: "%", label: "Net Profit Growth", decimals: 0 },
];

export const financialGrid = [
  { value: 0.96, suffix: "%", label: "Return on Assets (ROA)", decimals: 2 },
  { value: 7.68, suffix: "%", label: "Return on Equity (ROE)", decimals: 2 },
  { value: 19.9, suffix: "%", label: "Capital Adequacy Ratio", decimals: 1 },
  { value: 52.36, suffix: "%", label: "Cost-to-Income Ratio", decimals: 2 },
  { value: 1.0, prefix: "SAR ", suffix: "", label: "Earnings Per Share", decimals: 2 },
  { value: 1.03, suffix: "%", label: "NPL Ratio", decimals: 2 },
  { value: 21.8, prefix: "SAR ", suffix: "B", label: "Total Shareholders' Equity", decimals: 1 },
  { value: 110.9, prefix: "SAR ", suffix: "B", label: "Total Financing & Advances", decimals: 1 },
  { value: 115.4, prefix: "SAR ", suffix: "B", label: "Customer Deposits", decimals: 1 },
  { value: 18, suffix: "%", label: "Operating Income Growth", decimals: 0 },
  { value: 138, prefix: "SAR ", suffix: "M", label: "Collections & Recoveries", decimals: 0 },
  { value: 25, suffix: "%", label: "Shareholders' Equity Growth", decimals: 0 },
];

export const digitalMetrics = [
  { value: 40, suffix: "%", label: "Digital Account Opening Growth" },
  { value: 223, suffix: "%", label: "SME Digital Onboarding Growth" },
  { value: 40, suffix: "+", label: "New Digital Services Launched" },
];

export const segmentPerformance = [
  { value: 47, suffix: "%", label: "Corporate & Institutional Banking", color: "var(--color-sand)" },
  { value: 22, suffix: "%", label: "SME Portfolio Growth", color: "var(--color-dark-sand)" },
  { value: 15, suffix: "%", label: "Funded Assets Growth", color: "var(--color-sky-blue)" },
  { value: 37, suffix: "%", label: "Non-Funded Assets Growth", color: "var(--color-gray-light)" },
];

export const bankOverview = [
  { value: 2328, label: "Employees", icon: "people" },
  { value: 73, label: "Branches", icon: "building" },
  { value: 565, label: "ATMs", icon: "atm" },
  { value: 24, label: "Remittance Centers", icon: "transfer" },
  { value: 0, label: "Moody's: A3 (Stable)", icon: "rating", displayText: "A3" },
  { value: 0, label: "Fitch: A- (Stable)", icon: "rating", displayText: "A-" },
];

export const experienceMetrics = [
  { value: 60, label: "Customer Satisfaction Index", previousValue: 54 },
  { value: 97, suffix: "%", label: "Complaint Handling Quality" },
];

export interface ComparisonRow {
  metric: string;
  before: string;
  after: string;
  beforeNum?: number;
  afterNum?: number;
  prefix?: string;
  suffix?: string;
}

export const bankComparison: ComparisonRow[] = [
  { metric: "Total Assets", before: "SAR 98B", after: "SAR 165.9B", beforeNum: 98, afterNum: 165.9, prefix: "SAR ", suffix: "B" },
  { metric: "Branch Network", before: "57", after: "73", beforeNum: 57, afterNum: 73 },
  { metric: "ATM Fleet", before: "320", after: "565", beforeNum: 320, afterNum: 565 },
  { metric: "Total Employees", before: "1,850", after: "2,328", beforeNum: 1850, afterNum: 2328 },
  { metric: "Net Profit Growth", before: "8%", after: "22%", beforeNum: 8, afterNum: 22, suffix: "%" },
  { metric: "Digital Services", before: "<10", after: "40+", beforeNum: 10, afterNum: 40, suffix: "+" },
  { metric: "Customer Satisfaction", before: "54", after: "60", beforeNum: 54, afterNum: 60 },
  { metric: "Credit Ratings", before: "BBB+", after: "A-" },
];

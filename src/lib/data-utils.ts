
import { ProductData, Thresholds, PriorityLevel, ProductWithPriority } from './types';

const PLANTS = ['Atlanta', 'Chicago', 'Denver', 'Houston', 'Miami', 'Seattle', 'Phoenix', 'Dallas', 'Boston', 'Detroit'];
const LINES = ['L1', 'L2', 'L3', 'L4', 'L5'];
const PACKAGES = ['12oz Can', '20oz Bottle', '2L Bottle', '16oz Can', '1L Bottle', '12pk Can'];
const CATEGORIES = ['Cola', 'Lemon-Lime', 'Orange', 'Root Beer', 'Fruit Punch', 'Ginger Ale', 'Tonic Water', 'Sparkling Water', 'Energy Drink', 'Iced Tea'];
const PRODUCT_PREFIXES = ['Classic', 'Diet', 'Zero Sugar', 'Wild', 'Tropical', 'Golden', 'Silver', 'Premium', 'Organic', 'Sparkling'];

function generateMockData(count: number): ProductData[] {
  const data: ProductData[] = [];
  for (let i = 1; i <= count; i++) {
    const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    const prefix = PRODUCT_PREFIXES[Math.floor(Math.random() * PRODUCT_PREFIXES.length)];
    
    data.push({
      id: i.toString(),
      plant: PLANTS[Math.floor(Math.random() * PLANTS.length)],
      line: LINES[Math.floor(Math.random() * LINES.length)],
      package: PACKAGES[Math.floor(Math.random() * PACKAGES.length)],
      category: category,
      product: `${prefix} ${category}`,
      reward: Math.floor(Math.random() * 101),
      risk: Math.floor(Math.random() * 101),
      scaledProfit: Math.floor(Math.random() * 200000) + 5000,
    });
  }
  return data;
}

export const MOCK_DATA: ProductData[] = generateMockData(850);

export function calculatePriority(reward: number, risk: number, thresholds: Thresholds): PriorityLevel {
  let rewardPart: 'A' | 'B' | 'C' = 'C';
  if (reward >= thresholds.rewardA) rewardPart = 'A';
  else if (reward >= thresholds.rewardB) rewardPart = 'B';

  let riskPart: 'X' | 'Y' | 'Z' = 'Z';
  if (risk <= thresholds.riskX) riskPart = 'X';
  else if (risk <= thresholds.riskY) riskPart = 'Y';

  return `${rewardPart}${riskPart}` as PriorityLevel;
}

export function enrichWithPriority(data: ProductData[], thresholds: Thresholds): ProductWithPriority[] {
  return data.map(item => ({
    ...item,
    priority: calculatePriority(item.reward, item.risk, thresholds)
  }));
}

export function convertToCSV(data: any[]) {
  if (data.length === 0) return '';
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(obj => Object.values(obj).map(val => `"${val}"`).join(',')).join('\n');
  return `${headers}\n${rows}`;
}

export function downloadCSV(csvContent: string, fileName: string) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

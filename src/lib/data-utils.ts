
import { ProductData, Thresholds, PriorityLevel, ProductWithPriority } from './types';

export const MOCK_DATA: ProductData[] = [
  { id: '1', plant: 'Atlanta', line: 'L1', package: '12oz Can', category: 'Cola', product: 'Classic Cola', reward: 85, risk: 15, scaledProfit: 120000 },
  { id: '2', plant: 'Atlanta', line: 'L1', package: '20oz Bottle', category: 'Cola', product: 'Diet Cola', reward: 72, risk: 22, scaledProfit: 95000 },
  { id: '3', plant: 'Chicago', line: 'L2', package: '12oz Can', category: 'Lemon-Lime', product: 'Zesty Lime', reward: 45, risk: 35, scaledProfit: 68000 },
  { id: '4', plant: 'Chicago', line: 'L3', package: '2L Bottle', category: 'Cola', product: 'Classic Cola', reward: 92, risk: 12, scaledProfit: 155000 },
  { id: '5', plant: 'Denver', line: 'L1', package: '20oz Bottle', category: 'Orange', product: 'Sunkist Orange', reward: 35, risk: 55, scaledProfit: 42000 },
  { id: '6', plant: 'Denver', line: 'L2', package: '12oz Can', category: 'Root Beer', product: 'Old Style Root', reward: 55, risk: 42, scaledProfit: 73000 },
  { id: '7', plant: 'Houston', line: 'L1', package: '2L Bottle', category: 'Lemon-Lime', product: 'Diet Zesty', reward: 25, risk: 75, scaledProfit: 31000 },
  { id: '8', plant: 'Houston', line: 'L3', package: '20oz Bottle', category: 'Cola', product: 'Zero Sugar Cola', reward: 78, risk: 28, scaledProfit: 89000 },
  { id: '9', plant: 'Miami', line: 'L1', package: '12oz Can', category: 'Fruit Punch', product: 'Tropical Blast', reward: 64, risk: 48, scaledProfit: 77000 },
  { id: '10', plant: 'Miami', line: 'L2', package: '2L Bottle', category: 'Ginger Ale', product: 'Gold Ginger', reward: 48, risk: 38, scaledProfit: 62000 },
  { id: '11', plant: 'Atlanta', line: 'L2', package: '2L Bottle', category: 'Cola', product: 'Cherry Cola', reward: 81, risk: 19, scaledProfit: 110000 },
  { id: '12', plant: 'Chicago', line: 'L1', package: '20oz Bottle', category: 'Fruit Punch', product: 'Island Mist', reward: 39, risk: 62, scaledProfit: 45000 },
  { id: '13', plant: 'Denver', line: 'L3', package: '12oz Can', category: 'Cola', product: 'Vanilla Cola', reward: 58, risk: 25, scaledProfit: 71000 },
  { id: '14', plant: 'Houston', line: 'L2', package: '2L Bottle', category: 'Root Beer', product: 'Sarsaparilla', reward: 18, risk: 85, scaledProfit: 22000 },
  { id: '15', plant: 'Miami', line: 'L3', package: '20oz Bottle', category: 'Lemon-Lime', product: 'Lemon Sparkle', reward: 61, risk: 31, scaledProfit: 83000 },
];

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

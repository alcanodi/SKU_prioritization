
export type PriorityLevel = 'AX' | 'AY' | 'AZ' | 'BX' | 'BY' | 'BZ' | 'CX' | 'CY' | 'CZ';

export interface ProductData {
  id: string;
  plant: string;
  line: string;
  package: string;
  category: string;
  product: string;
  reward: number; // For Priority calculation (A, B, C)
  risk: number;   // For Priority calculation (X, Y, Z)
  scaledProfit: number;
}

export interface Thresholds {
  rewardA: number;
  rewardB: number;
  riskX: number;
  riskY: number;
}

export interface ProductWithPriority extends ProductData {
  priority: PriorityLevel;
}

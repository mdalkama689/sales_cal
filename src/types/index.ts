export interface Location {
  state: string;
  city?: string;
  zipCode?: string;
}

export interface TaxRate {
  state: string;
  stateRate: number;
  hasLocalTax: boolean;
  avgLocalRate?: number;
  combinedRate?: number;
}

export interface CalculationResult {
  id: string;
  amount: number;
  location: Location;
  taxRate: number;
  taxAmount: number;
  total: number;
  category?: string;
  timestamp: Date;
}
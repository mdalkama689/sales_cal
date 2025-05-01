import { TaxRate } from '../types';

// GST rates for Indian states
export const stateTaxRates: TaxRate[] = [
  { state: 'Andhra Pradesh', stateRate: 9, hasLocalTax: false, combinedRate: 18 },
  { state: 'Arunachal Pradesh', stateRate: 9, hasLocalTax: false, combinedRate: 18 },
  { state: 'Assam', stateRate: 9, hasLocalTax: false, combinedRate: 18 },
  { state: 'Bihar', stateRate: 9, hasLocalTax: false, combinedRate: 18 },
  { state: 'Chhattisgarh', stateRate: 9, hasLocalTax: false, combinedRate: 18 },
  { state: 'Goa', stateRate: 9, hasLocalTax: false, combinedRate: 18 },
  { state: 'Gujarat', stateRate: 9, hasLocalTax: false, combinedRate: 18 },
  { state: 'Haryana', stateRate: 9, hasLocalTax: false, combinedRate: 18 },
  { state: 'Himachal Pradesh', stateRate: 9, hasLocalTax: false, combinedRate: 18 },
  { state: 'Jharkhand', stateRate: 9, hasLocalTax: false, combinedRate: 18 },
  { state: 'Karnataka', stateRate: 9, hasLocalTax: false, combinedRate: 18 },
  { state: 'Kerala', stateRate: 9, hasLocalTax: false, combinedRate: 18 },
  { state: 'Madhya Pradesh', stateRate: 9, hasLocalTax: false, combinedRate: 18 },
  { state: 'Maharashtra', stateRate: 9, hasLocalTax: false, combinedRate: 18 },
  { state: 'Manipur', stateRate: 9, hasLocalTax: false, combinedRate: 18 },
  { state: 'Meghalaya', stateRate: 9, hasLocalTax: false, combinedRate: 18 },
  { state: 'Mizoram', stateRate: 9, hasLocalTax: false, combinedRate: 18 },
  { state: 'Nagaland', stateRate: 9, hasLocalTax: false, combinedRate: 18 },
  { state: 'Odisha', stateRate: 9, hasLocalTax: false, combinedRate: 18 },
  { state: 'Punjab', stateRate: 9, hasLocalTax: false, combinedRate: 18 },
  { state: 'Rajasthan', stateRate: 9, hasLocalTax: false, combinedRate: 18 },
  { state: 'Sikkim', stateRate: 9, hasLocalTax: false, combinedRate: 18 },
  { state: 'Tamil Nadu', stateRate: 9, hasLocalTax: false, combinedRate: 18 },
  { state: 'Telangana', stateRate: 9, hasLocalTax: false, combinedRate: 18 },
  { state: 'Tripura', stateRate: 9, hasLocalTax: false, combinedRate: 18 },
  { state: 'Uttar Pradesh', stateRate: 9, hasLocalTax: false, combinedRate: 18 },
  { state: 'Uttarakhand', stateRate: 9, hasLocalTax: false, combinedRate: 18 },
  { state: 'West Bengal', stateRate: 9, hasLocalTax: false, combinedRate: 18 },
  { state: 'Delhi', stateRate: 9, hasLocalTax: false, combinedRate: 18 }
];

export const productCategories = [
  { id: 'general', name: 'General Goods (18%)', taxModifier: 1.0 },
  { id: 'essential', name: 'Essential Items (5%)', taxModifier: 0.278 },
  { id: 'luxury', name: 'Luxury Items (28%)', taxModifier: 1.556 },
  { id: 'services', name: 'Services (18%)', taxModifier: 1.0 },
  { id: 'food', name: 'Food & Beverages (5%)', taxModifier: 0.278 },
  { id: 'textiles', name: 'Textiles (5%)', taxModifier: 0.278 }
];

export const getTaxRateByState = (state: string): TaxRate | undefined => {
  return stateTaxRates.find(rate => 
    rate.state.toLowerCase() === state.toLowerCase() ||
    state.toLowerCase().includes(rate.state.toLowerCase()) ||
    rate.state.toLowerCase().includes(state.toLowerCase())
  );
};
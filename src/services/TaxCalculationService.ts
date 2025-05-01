import { getTaxRateByState } from '../data/taxRates';
import { CalculationResult, Location } from '../types';

class TaxCalculationService {
  calculateTax(
    amount: number, 
    location: Location, 
    category: string = 'general',
    categoryModifier: number = 1.0
  ): CalculationResult | null {
    try {
      // Get the tax rate for the given state
      const taxRateData = getTaxRateByState(location.state);
      
      if (!taxRateData) {
        console.error(`No tax rate found for state: ${location.state}`);
        return null;
      }
      
      // Use the combined rate if available, otherwise use state rate
      const taxRate = taxRateData.combinedRate !== undefined 
        ? taxRateData.combinedRate / 100 // Convert percentage to decimal
        : taxRateData.stateRate / 100;
      
      // Apply category modifier to tax rate
      const adjustedTaxRate = taxRate * categoryModifier;
      
      // Calculate tax amount and total
      const taxAmount = amount * adjustedTaxRate;
      const total = amount + taxAmount;
      
      // Create and return the calculation result
      return {
        id: this.generateId(),
        amount,
        location,
        taxRate: adjustedTaxRate,
        taxAmount,
        total,
        category,
        timestamp: new Date()
      };
    } catch (error) {
      console.error('Error calculating tax:', error);
      return null;
    }
  }
  
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
}

export default new TaxCalculationService();
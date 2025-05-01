import React, { useState } from 'react';
import { Calculator, IndianRupee } from 'lucide-react';
import { useCalculator } from '../context/CalculatorContext';
import TaxCalculationService from '../services/TaxCalculationService';
import { productCategories } from '../data/taxRates';
import Input from './ui/Input';
import Button from './ui/Button';
import Select from './ui/Select';

const CalculatorForm: React.FC = () => {
  const { 
    amount, 
    setAmount, 
    location, 
    selectedCategory, 
    setSelectedCategory, 
    addToHistory, 
    setCurrentCalculation 
  } = useCalculator();
  
  const [errors, setErrors] = useState<{ amount?: string }>({});
  const [isCalculating, setIsCalculating] = useState(false);
  
  const categoryOptions = productCategories.map(cat => ({
    value: cat.id,
    label: cat.name
  }));
  
  const validateForm = () => {
    const newErrors: { amount?: string } = {};
    
    if (!amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      newErrors.amount = 'Please enter a valid positive amount';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleCalculate = () => {
    if (!validateForm() || !location) return;
    
    setIsCalculating(true);
    
    try {
      const category = productCategories.find(cat => cat.id === selectedCategory);
      const categoryModifier = category?.taxModifier || 1.0;
      
      const result = TaxCalculationService.calculateTax(
        parseFloat(amount), 
        location, 
        selectedCategory,
        categoryModifier
      );
      
      if (result) {
        setCurrentCalculation(result);
        addToHistory(result);
      }
    } catch (error) {
      console.error('Error during calculation:', error);
    } finally {
      setIsCalculating(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCalculate();
    }
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      <div className="flex items-center mb-4">
        <Calculator className="text-indigo-400 mr-2" size={20} />
        <h3 className="text-lg font-medium text-white">Calculate GST</h3>
      </div>
      
      <form onSubmit={(e) => { e.preventDefault(); handleCalculate(); }}>
        <Input
          label="Amount (₹)"
          placeholder="Enter amount"
          type="number"
          min="0.01"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          error={errors.amount}
          onKeyDown={handleKeyDown}
          leftIcon={<IndianRupee size={16} />}
          fullWidth
        />
        
        <Select
          label="Product/Service Category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          options={categoryOptions}
          fullWidth
        />
        
        <div className="mt-4">
          <Button 
            onClick={handleCalculate}
            disabled={!location || isCalculating}
            isLoading={isCalculating}
            fullWidth
          >
            Calculate GST
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CalculatorForm;
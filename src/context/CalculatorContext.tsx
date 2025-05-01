import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CalculationResult, Location } from '../types';

interface CalculatorContextType {
  amount: string;
  setAmount: (amount: string) => void;
  location: Location | null;
  setLocation: (location: Location | null) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  calculationHistory: CalculationResult[];
  addToHistory: (result: CalculationResult) => void;
  clearHistory: () => void;
  currentCalculation: CalculationResult | null;
  setCurrentCalculation: (result: CalculationResult | null) => void;
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

export const CalculatorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [amount, setAmount] = useState<string>('');
  const [location, setLocation] = useState<Location | null>({ state: 'Maharashtra' });
  const [selectedCategory, setSelectedCategory] = useState<string>('general');
  const [calculationHistory, setCalculationHistory] = useState<CalculationResult[]>([]);
  const [currentCalculation, setCurrentCalculation] = useState<CalculationResult | null>(null);

  const addToHistory = (result: CalculationResult) => {
    setCalculationHistory(prev => [result, ...prev].slice(0, 10));
  };

  const clearHistory = () => {
    setCalculationHistory([]);
  };

  return (
    <CalculatorContext.Provider
      value={{
        amount,
        setAmount,
        location,
        setLocation,
        selectedCategory,
        setSelectedCategory,
        calculationHistory,
        addToHistory,
        clearHistory,
        currentCalculation,
        setCurrentCalculation
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
};

export const useCalculator = (): CalculatorContextType => {
  const context = useContext(CalculatorContext);
  if (context === undefined) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  return context;
};
import React from 'react';
import Layout from './components/Layout';
import Calculator from './components/Calculator';
import LocationSelector from './components/LocationSelector';
import TaxChart from './components/TaxChart';
import CalculationHistory from './components/CalculationHistory';
import { CalculatorProvider, useCalculator } from './context/CalculatorContext';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

const CalculatorDashboard: React.FC = () => {
  const { currentCalculation } = useCalculator();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-6">
        <LocationSelector />
        <Calculator />
      </div>
      
      <div className="lg:col-span-2 space-y-6">
        {currentCalculation && (
          <div className="bg-gray-900 p-4 rounded-lg animate-fade-in">
            <h2 className="text-2xl font-semibold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              GST Calculation Result
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TaxChart calculation={currentCalculation} />
              <div className="bg-gray-800 p-6 rounded-lg flex flex-col justify-center">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400">Base Amount</p>
                    <p className="text-2xl font-bold text-white">{formatCurrency(currentCalculation.amount)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">GST Rate</p>
                    <p className="text-xl font-medium text-indigo-400">
                      {(currentCalculation.taxRate * 100).toFixed(2)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">GST Amount</p>
                    <p className="text-xl font-medium text-purple-400">
                      {formatCurrency(currentCalculation.taxAmount)}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-gray-700">
                    <p className="text-sm text-gray-400">Total Amount</p>
                    <p className="text-3xl font-bold text-white">
                      {formatCurrency(currentCalculation.total)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <CalculationHistory />
      </div>
    </div>
  );
};

function App() {
  return (
    <CalculatorProvider>
      <Layout>
        <CalculatorDashboard />
      </Layout>
    </CalculatorProvider>
  );
}

export default App;
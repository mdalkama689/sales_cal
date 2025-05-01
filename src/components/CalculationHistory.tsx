import React from 'react';
import { History, Trash2 } from 'lucide-react';
import { useCalculator } from '../context/CalculatorContext';
import Button from './ui/Button';
import Transition from './ui/Transition';
import { CalculationResult } from '../types';

const CalculationHistory: React.FC = () => {
  const { calculationHistory, clearHistory, setCurrentCalculation } = useCalculator();
  const [showHistory, setShowHistory] = React.useState(false);
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };
  
  const handleSelectCalculation = (calculation: CalculationResult) => {
    setCurrentCalculation(calculation);
    if (window.innerWidth < 768) {
      setShowHistory(false);
    }
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <History className="text-indigo-400 mr-2" size={20} />
          <h3 className="text-lg font-medium text-white">Recent Calculations</h3>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowHistory(!showHistory)}
            className="md:hidden"
          >
            {showHistory ? 'Hide' : 'Show'}
          </Button>
          {calculationHistory.length > 0 && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={clearHistory}
              rightIcon={<Trash2 size={14} />}
              className="text-red-400 hover:text-red-300"
            >
              Clear
            </Button>
          )}
        </div>
      </div>
      
      <Transition
        show={showHistory || window.innerWidth >= 768}
        enter="transition-all duration-300"
        enterFrom="opacity-0 max-h-0"
        enterTo="opacity-100 max-h-[400px]"
        leave="transition-all duration-300"
        leaveFrom="opacity-100 max-h-[400px]"
        leaveTo="opacity-0 max-h-0"
        className="overflow-hidden"
      >
        {calculationHistory.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <p>No calculations yet</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {calculationHistory.map((calculation) => (
              <div 
                key={calculation.id}
                className="bg-gray-800 p-3 rounded-md cursor-pointer hover:bg-gray-750 transition-colors"
                onClick={() => handleSelectCalculation(calculation)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-lg font-medium text-white">{formatCurrency(calculation.total)}</p>
                    <p className="text-xs text-gray-400">{calculation.location.state}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-indigo-400">
                      {formatCurrency(calculation.amount)} + {formatCurrency(calculation.taxAmount)} GST
                    </p>
                    <p className="text-xs text-gray-400">{formatDate(new Date(calculation.timestamp))}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Transition>
    </div>
  );
};

export default CalculationHistory;
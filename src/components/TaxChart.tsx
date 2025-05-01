import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { CalculationResult } from '../types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface TaxChartProps {
  calculation: CalculationResult | null;
}

const TaxChart: React.FC<TaxChartProps> = ({ calculation }) => {
  if (!calculation) return null;

  const { amount, taxAmount } = calculation;
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };
  
  const data = {
    labels: ['Base Amount', 'GST Amount'],
    datasets: [
      {
        data: [amount, taxAmount],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',  // Indigo for base amount
          'rgba(139, 92, 246, 0.8)',  // Purple for tax
        ],
        borderColor: [
          'rgba(99, 102, 241, 1)',
          'rgba(139, 92, 246, 1)',
        ],
        borderWidth: 1,
        hoverOffset: 4
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 12
          },
          padding: 20
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const value = context.raw;
            return `${context.label}: ${formatCurrency(value)}`;
          }
        }
      }
    },
    cutout: '70%'
  };

  return (
    <div className="w-full bg-gray-900 p-4 rounded-lg">
      <h3 className="text-lg font-medium text-center text-gray-200 mb-4">GST Breakdown</h3>
      <div className="w-full h-64 relative">
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="text-xs text-gray-400">Total</p>
          <p className="text-xl font-bold text-white">{formatCurrency(calculation.total)}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-gray-800 p-3 rounded-md">
          <p className="text-xs text-gray-400">Base Amount</p>
          <p className="text-lg font-medium text-white">{formatCurrency(amount)}</p>
        </div>
        <div className="bg-gray-800 p-3 rounded-md">
          <p className="text-xs text-gray-400">GST Amount</p>
          <p className="text-lg font-medium text-white">{formatCurrency(taxAmount)}</p>
        </div>
      </div>
    </div>
  );
};

export default TaxChart;
import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { useCalculator } from '../context/CalculatorContext';
import Input from './ui/Input';
import { stateTaxRates } from '../data/taxRates';

const LocationSelector: React.FC = () => {
  const { location, setLocation } = useCalculator();
  const [stateInput, setStateInput] = useState('');
  const [showStateList, setShowStateList] = useState(false);
  
  const filteredStates = stateInput 
    ? stateTaxRates
        .filter(state => 
          state.state.toLowerCase().includes(stateInput.toLowerCase())
        )
        .slice(0, 5) 
    : [];

  const selectState = (state: string) => {
    setLocation({ state });
    setStateInput('');
    setShowStateList(false);
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      <div className="flex items-center mb-4">
        <MapPin className="text-indigo-400 mr-2" size={20} />
        <h3 className="text-lg font-medium text-white">Select State</h3>
      </div>
      
      {location && (
        <div className="bg-gray-800 p-3 rounded-md mb-4">
          <p className="text-sm text-gray-400">Current State</p>
          <p className="text-lg font-medium text-white">{location.state}</p>
        </div>
      )}
      
      <div className="mb-4">
        <div className="flex space-x-2">
          <Input
            label="Search State"
            placeholder="e.g. Maharashtra"
            value={stateInput}
            onChange={(e) => {
              setStateInput(e.target.value);
              setShowStateList(e.target.value.length > 0);
            }}
            fullWidth
            onBlur={() => setTimeout(() => setShowStateList(false), 200)}
            onFocus={() => setShowStateList(stateInput.length > 0)}
          />
        </div>
        
        {showStateList && filteredStates.length > 0 && (
          <div className="absolute z-10 mt-1 w-56 bg-gray-800 rounded-md shadow-lg">
            <ul className="py-1">
              {filteredStates.map((state) => (
                <li 
                  key={state.state} 
                  className="px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer"
                  onClick={() => selectState(state.state)}
                >
                  {state.state}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationSelector;
import React, { useState } from 'react';

const InterestCalculator = ({ onBackToMain, onGoToSilver }) => {
  // State for inputs
  const [metalType, setMetalType] = useState('gold');
  const [amount, setAmount] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  // State for results
  const [results, setResults] = useState(null);

  // Format currency with Indian Rupee symbol and commas
  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Calculate interest based on metal type and amount
  const getInterestRate = (metal, amountValue) => {
    if (metal === 'gold') {
      return amountValue < 5000 ? 2.5 : 2.0;
    } else if (metal === 'silver') {
      return 3.0;
    }
    return 0;
  };

  // Calculate duration in months from dates
  const calculateDurationInMonths = (fromDateStr, toDateStr) => {
    const fromDate = new Date(fromDateStr);
    const toDate = new Date(toDateStr);
    
    if (fromDate >= toDate) {
      return 0;
    }
    
    const yearDiff = toDate.getFullYear() - fromDate.getFullYear();
    const monthDiff = toDate.getMonth() - fromDate.getMonth();
    const dayDiff = toDate.getDate() - fromDate.getDate();
    
    // Calculate total months
    let totalMonths = yearDiff * 12 + monthDiff;
    
    // If the day difference is positive, add a partial month
    if (dayDiff > 0) {
      totalMonths += dayDiff / 30; // Approximate month as 30 days
    }
    
    return Math.round(totalMonths * 100) / 100; // Round to 2 decimal places
  };

  // Calculate interest
  const handleCalculate = () => {
    if (!amount || !fromDate || !toDate) {
      alert('Please fill in all required fields');
      return;
    }

    const amountValue = parseFloat(amount) || 0;
    const durationValue = calculateDurationInMonths(fromDate, toDate);

    if (amountValue <= 0) {
      alert('Amount must be greater than 0');
      return;
    }

    if (durationValue <= 0) {
      alert('To date must be after From date');
      return;
    }

    const interestRate = getInterestRate(metalType, amountValue);
    const interest = (amountValue * interestRate * durationValue) / 100;
    const totalAmount = amountValue + interest;

    setResults({
      metalType,
      amount: amountValue,
      fromDate,
      toDate,
      duration: durationValue,
      interestRate,
      interest,
      totalAmount
    });
  };

  // Reset form
  const handleReset = () => {
    setAmount('');
    setFromDate('');
    setToDate('');
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gold-50 to-gold-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center mb-3 sm:mb-4">
            <span className="text-3xl sm:text-4xl mr-2 sm:mr-3">💰</span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gold-800">
              KS Jewellery
            </h1>
          </div>
          <h2 className="text-lg sm:text-xl md:text-2xl text-gold-700 font-semibold">
            Interest Calculator
          </h2>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8 justify-center">
          <button
            onClick={onBackToMain}
            className="px-3 sm:px-4 py-2 bg-gold-600 hover:bg-gold-700 text-white text-sm sm:text-base font-medium rounded-md transition-colors duration-200"
          >
            🥇 Gold Calculator
          </button>
          <button
            onClick={onGoToSilver}
            className="px-3 sm:px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm sm:text-base font-medium rounded-md transition-colors duration-200"
          >
            🥈 Silver Calculator
          </button>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 sm:mb-6 flex items-center">
            <span className="mr-2">📊</span>
            Calculate Interest
          </h3>

          <div className="space-y-4 sm:space-y-6">
            {/* Metal Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Metal Type *
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => setMetalType('gold')}
                  className={`flex-1 py-3 px-4 rounded-md border-2 transition-colors duration-200 ${
                    metalType === 'gold'
                      ? 'border-gold-500 bg-gold-50 text-gold-700 font-semibold'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gold-300'
                  }`}
                >
                  <span className="mr-2">🥇</span>
                  Gold
                </button>
                <button
                  onClick={() => setMetalType('silver')}
                  className={`flex-1 py-3 px-4 rounded-md border-2 transition-colors duration-200 ${
                    metalType === 'silver'
                      ? 'border-gold-500 bg-gold-50 text-gold-700 font-semibold'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gold-300'
                  }`}
                >
                  <span className="mr-2">🥈</span>
                  Silver
                </button>
              </div>
            </div>

            {/* Amount Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount (₹) *
              </label>
               <input
                 type="text"
                 value={amount}
                 onChange={(e) => {
                   const value = e.target.value;
                   // Only allow numbers, decimal point, and empty string
                   if (value === '' || /^\d*\.?\d*$/.test(value)) {
                     setAmount(value);
                   }
                 }}
                 placeholder="e.g., 10000"
                 className="currency-input"
               />
            </div>

            {/* Date Range Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From Date *
                </label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="currency-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To Date *
                </label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="currency-input"
                />
              </div>
            </div>

            {/* Interest Rate Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <h4 className="font-semibold text-blue-800 mb-2">📋 Interest Rates:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Gold (Amount &lt; ₹5,000): 2.5% per month</li>
                <li>• Gold (Amount ≥ ₹5,000): 2% per month</li>
                <li>• Silver: 3% per month</li>
              </ul>
            </div>

            {/* Calculate Button */}
            <button
              onClick={handleCalculate}
              className="w-full btn-primary text-base sm:text-lg py-2 sm:py-3"
            >
              Calculate Interest
            </button>
          </div>
        </div>

        {/* Results */}
        {results && (
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
              <span className="mr-2">📈</span>
              Calculation Results
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-md p-3">
                  <p className="text-sm text-gray-600">Metal Type</p>
                  <p className="font-semibold text-gray-800 capitalize">
                    {results.metalType === 'gold' ? '🥇 Gold' : '🥈 Silver'}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-md p-3">
                  <p className="text-sm text-gray-600">From Date</p>
                  <p className="font-semibold text-gray-800">
                    {new Date(results.fromDate).toLocaleDateString('en-IN')}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-md p-3">
                  <p className="text-sm text-gray-600">To Date</p>
                  <p className="font-semibold text-gray-800">
                    {new Date(results.toDate).toLocaleDateString('en-IN')}
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-md p-3">
                <p className="text-sm text-blue-600">Duration</p>
                <p className="font-semibold text-blue-800">
                  {results.duration} months ({Math.floor(results.duration)} months {Math.round((results.duration % 1) * 30)} days)
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Principal Amount:</span>
                  <span className="font-medium">{formatCurrency(results.amount)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Interest Rate:</span>
                  <span className="font-medium">{results.interestRate}% per month</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Interest Amount:</span>
                  <span className="font-medium text-gold-600">{formatCurrency(results.interest)}</span>
                </div>
                <div className="flex justify-between py-3 bg-gold-50 rounded-md px-4 border-2 border-gold-300">
                  <span className="text-gold-800 font-bold text-lg">Total Amount:</span>
                  <span className="font-bold text-gold-800 text-xl">{formatCurrency(results.totalAmount)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 sm:gap-4">
          <button
            onClick={handleReset}
            className="flex-1 btn-secondary py-2 sm:py-3 text-sm sm:text-base"
          >
            Reset
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 sm:mt-8 py-3 sm:py-4 border-t border-gold-200">
          <p className="text-xs sm:text-sm text-gray-600">
            Built by <span className="font-semibold text-gold-700">Praveen Kumar (SPK)</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default InterestCalculator;

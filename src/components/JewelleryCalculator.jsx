import React, { useState, useEffect } from 'react';

const JewelleryCalculator = ({ onGoToSilver, onGoToInterest }) => {
  // State for gold rate
  const [goldRate, setGoldRate] = useState('');
  const [currentGoldRate, setCurrentGoldRate] = useState(0);

  // State for item details
  const [itemName, setItemName] = useState('');
  const [weight, setWeight] = useState('');
  const [wastage, setWastage] = useState('');
  const [makingCostType, setMakingCostType] = useState('percentage'); // 'fixed' or 'percentage'
  const [makingCostValue, setMakingCostValue] = useState('');
  const [gstRate, setGstRate] = useState(3);

  // State for calculations
  const [calculations, setCalculations] = useState(null);

  // Load gold rate from localStorage on component mount
  useEffect(() => {
    const savedGoldRate = localStorage.getItem('jewelleryGoldRate');
    if (savedGoldRate) {
      setCurrentGoldRate(parseFloat(savedGoldRate));
    }
  }, []);

  // Format currency with Indian Rupee symbol and commas
  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Set gold rate
  const handleSetGoldRate = () => {
    const rate = parseFloat(goldRate);
    if (!isNaN(rate) && rate > 0) {
      setCurrentGoldRate(rate);
      localStorage.setItem('jewelleryGoldRate', rate.toString());
      setGoldRate('');
    }
  };

  // Calculate prices
  const handleCalculate = () => {
    if (!currentGoldRate || !weight || !wastage || !makingCostValue) {
      alert('Please fill in all required fields');
      return;
    }

    const weightValue = parseFloat(weight) || 0;
    const wastageValue = parseFloat(wastage) || 0;
    const makingCostVal = parseFloat(makingCostValue) || 0;
    const gstRateValue = parseFloat(gstRate) || 0;

    // Calculations
    const goldValue = currentGoldRate * weightValue;
    const wastageAmount = goldValue * (wastageValue / 100);
    const subtotal = goldValue + wastageAmount;
    
    let makingCost;
    if (makingCostType === 'fixed') {
      makingCost = makingCostVal;
    } else {
      makingCost = subtotal * (makingCostVal / 100);
    }

    const totalBeforeTax = subtotal + makingCost;
    const gstAmount = totalBeforeTax * (gstRateValue / 100);
    const finalPrice = totalBeforeTax + gstAmount;

    setCalculations({
      goldValue,
      wastageAmount,
      subtotal,
      makingCost,
      totalBeforeTax,
      gstAmount,
      finalPrice,
      weight: weightValue,
      wastage: wastageValue,
      makingCostType,
      makingCostValue: makingCostVal,
      gstRate: gstRateValue
    });
  };

  // Reset all fields
  const handleReset = () => {
    setItemName('');
    setWeight('');
    setWastage('');
    setMakingCostValue('');
    setGstRate(3);
    setCalculations(null);
  };

  // Print bill
  const handlePrintBill = () => {
    if (!calculations) {
      alert('Please calculate first');
      return;
    }

    const printWindow = window.open('', '_blank');
    const printContent = `
      <html>
        <head>
          <title>Jewellery Bill - ${itemName || 'Item'}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .shop-name { font-size: 24px; font-weight: bold; color: #d97706; }
            .item-details { margin-bottom: 20px; }
            .calculation-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            .calculation-table th, .calculation-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            .calculation-table th { background-color: #f59e0b; color: white; }
            .total-row { font-weight: bold; background-color: #fef3c7; }
            .grand-total { font-size: 18px; font-weight: bold; color: #d97706; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="shop-name">💎 KS Jewellery</div>
            <div>Jewellery Price Calculation Bill</div>
            <div>Date: ${new Date().toLocaleDateString('en-IN')}</div>
          </div>
          
          <div class="item-details">
            <h3>Item Details:</h3>
            <p><strong>Item Name:</strong> ${itemName || 'N/A'}</p>
            <p><strong>Weight:</strong> ${calculations.weight} grams</p>
            <p><strong>Gold Rate:</strong> ₹${currentGoldRate.toLocaleString('en-IN')}/gram</p>
            <p><strong>GST Rate:</strong> ${calculations.gstRate}%</p>
          </div>

          <table class="calculation-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Gold Value (${currentGoldRate.toLocaleString('en-IN')} × ${calculations.weight})</td>
                <td>${calculations.goldValue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
              </tr>
              <tr>
                <td>Total Before Tax</td>
                <td>${calculations.totalBeforeTax.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
              </tr>
              <tr>
                <td>GST (${calculations.gstRate}%)</td>
                <td>${calculations.gstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
              </tr>
              <tr class="grand-total">
                <td>Final Price</td>
                <td>${calculations.finalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
              </tr>
            </tbody>
          </table>

          <div class="footer">
            <p>Thank you for your business!</p>
            <p>Generated on ${new Date().toLocaleString('en-IN')}</p>
            <p><strong>Built by Praveen Kumar (SPK)</strong></p>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gold-50 to-gold-100 py-4 px-2 sm:py-8 sm:px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center mb-3 sm:mb-4">
            <span className="text-3xl sm:text-4xl mr-2 sm:mr-3">💎</span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gold-800">
              KS Jewellery
            </h1>
          </div>
          <h2 className="text-lg sm:text-xl md:text-2xl text-gold-700 font-semibold">
            Gold Price Calculator
          </h2>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8 justify-center">
          <button
            onClick={onGoToSilver}
            className="px-3 sm:px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm sm:text-base font-medium rounded-md transition-colors duration-200"
          >
            🥈 Silver Calculator
          </button>
          <button
            onClick={onGoToInterest}
            className="px-3 sm:px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm sm:text-base font-medium rounded-md transition-colors duration-200"
          >
            💰 Interest Calculator
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Left Column - Inputs */}
          <div className="space-y-4 sm:space-y-6">
            {/* Gold Rate Section */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
                <span className="mr-2">🏅</span>
                Gold Rate
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter Today's Gold Rate (₹/gram)
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={goldRate}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Only allow numbers, decimal point, and empty string
                        if (value === '' || /^\d*\.?\d*$/.test(value)) {
                          setGoldRate(value);
                        }
                      }}
                      placeholder="e.g., 5500"
                      className="currency-input flex-1"
                    />
                    <button
                      onClick={handleSetGoldRate}
                      className="btn-primary whitespace-nowrap text-sm sm:text-base"
                    >
                      Set Rate
                    </button>
                  </div>
                </div>
                {currentGoldRate > 0 && (
                  <div className="bg-gold-50 border border-gold-200 rounded-md p-3">
                    <p className="text-sm text-gray-600">Current Gold Rate:</p>
                    <p className="text-lg font-semibold text-gold-700">
                      {formatCurrency(currentGoldRate)}/gram
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Item Details Section */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
                <span className="mr-2">📝</span>
                Item Details
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Item Name
                  </label>
                  <input
                    type="text"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    placeholder="e.g., Gold Chain"
                    className="currency-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weight (grams) *
                  </label>
                  <input
                    type="text"
                    value={weight}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Only allow numbers, decimal point, and empty string
                      if (value === '' || /^\d*\.?\d*$/.test(value)) {
                        setWeight(value);
                      }
                    }}
                    placeholder="e.g., 10.5"
                    className="currency-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Wastage (%) *
                  </label>
                  <input
                    type="text"
                    value={wastage}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Only allow numbers, decimal point, and empty string
                      if (value === '' || /^\d*\.?\d*$/.test(value)) {
                        setWastage(value);
                      }
                    }}
                    placeholder="e.g., 8"
                    className="currency-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Making Cost *
                  </label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setMakingCostType('percentage')}
                        className={`px-3 py-1 rounded text-sm ${
                          makingCostType === 'percentage'
                            ? 'bg-gold-600 text-white'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        Percentage
                      </button>
                      <button
                        onClick={() => setMakingCostType('fixed')}
                        className={`px-3 py-1 rounded text-sm ${
                          makingCostType === 'fixed'
                            ? 'bg-gold-600 text-white'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        Fixed Amount
                      </button>
                    </div>
                    <input
                      type="text"
                      value={makingCostValue}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Only allow numbers, decimal point, and empty string
                        if (value === '' || /^\d*\.?\d*$/.test(value)) {
                          setMakingCostValue(value);
                        }
                      }}
                      placeholder={makingCostType === 'percentage' ? 'e.g., 15' : 'e.g., 5000'}
                      className="currency-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GST Rate (%)
                  </label>
                  <input
                    type="text"
                    value={gstRate}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Only allow numbers, decimal point, and empty string
                      if (value === '' || /^\d*\.?\d*$/.test(value)) {
                        setGstRate(value);
                      }
                    }}
                    placeholder="3"
                    className="currency-input"
                  />
                </div>

                <button
                  onClick={handleCalculate}
                  className="w-full btn-primary text-base sm:text-lg py-2 sm:py-3"
                >
                  Calculate Price
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-4 sm:space-y-6">
            {/* Results Section */}
            {calculations && (
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
                  <span className="mr-2">💰</span>
                  Price Breakdown
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600 text-sm sm:text-base">Gold Value:</span>
                    <span className="font-medium text-sm sm:text-base">{formatCurrency(calculations.goldValue)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600 text-sm sm:text-base">Wastage ({calculations.wastage}%):</span>
                    <span className="font-medium text-sm sm:text-base">{formatCurrency(calculations.wastageAmount)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600 text-sm sm:text-base">Subtotal:</span>
                    <span className="font-medium text-sm sm:text-base">{formatCurrency(calculations.subtotal)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600 text-sm sm:text-base">Making Cost:</span>
                    <span className="font-medium text-sm sm:text-base">{formatCurrency(calculations.makingCost)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600 text-sm sm:text-base">Total Before Tax:</span>
                    <span className="font-medium text-sm sm:text-base">{formatCurrency(calculations.totalBeforeTax)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600 text-sm sm:text-base">GST ({calculations.gstRate}%):</span>
                    <span className="font-medium text-sm sm:text-base">{formatCurrency(calculations.gstAmount)}</span>
                  </div>
                  <div className="flex justify-between py-3 bg-gold-50 rounded-md px-3 sm:px-4 border-2 border-gold-300">
                    <span className="text-gold-800 font-bold text-base sm:text-lg">Final Price:</span>
                    <span className="font-bold text-gold-800 text-lg sm:text-xl">{formatCurrency(calculations.finalPrice)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
                <span className="mr-2">⚡</span>
                Actions
              </h3>
              <div className="space-y-2 sm:space-y-3">
                <button
                  onClick={handleReset}
                  className="w-full btn-secondary py-2 sm:py-3 text-sm sm:text-base"
                >
                  Reset All
                </button>
                <button
                  onClick={handlePrintBill}
                  className="w-full btn-primary py-2 sm:py-3 text-sm sm:text-base"
                  disabled={!calculations}
                >
                  Print / Download Bill
                </button>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
              <h4 className="font-semibold text-blue-800 mb-2 text-sm sm:text-base">📋 Instructions:</h4>
              <ul className="text-xs sm:text-sm text-blue-700 space-y-1">
                <li>• Set today's gold rate first</li>
                <li>• Fill in all required fields (marked with *)</li>
                <li>• Choose making cost as percentage or fixed amount</li>
                <li>• Interest is optional for EMI calculations</li>
                <li>• Gold rate is saved locally for your convenience</li>
              </ul>
            </div>
          </div>
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

export default JewelleryCalculator;

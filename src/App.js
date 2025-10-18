import React, { useState } from 'react';
import JewelleryCalculator from './components/JewelleryCalculator';
import SilverCalculator from './components/SilverCalculator';
import InterestCalculator from './components/InterestCalculator';

function App() {
  const [currentPage, setCurrentPage] = useState('gold'); // 'gold', 'silver', or 'interest'

  const handleGoToSilver = () => {
    setCurrentPage('silver');
  };

  const handleGoToInterest = () => {
    setCurrentPage('interest');
  };

  const handleGoToGold = () => {
    setCurrentPage('gold');
  };

  const handleBackToMain = () => {
    setCurrentPage('gold');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === 'gold' ? (
        <JewelleryCalculator onGoToSilver={handleGoToSilver} onGoToInterest={handleGoToInterest} />
      ) : currentPage === 'silver' ? (
        <SilverCalculator onGoToGold={handleGoToGold} onGoToInterest={handleGoToInterest} />
      ) : (
        <InterestCalculator onBackToMain={handleBackToMain} onGoToSilver={handleGoToSilver} />
      )}
    </div>
  );
}

export default App;

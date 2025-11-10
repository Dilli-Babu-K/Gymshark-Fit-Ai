import React from 'react';
import { Recommendation } from '../types';
import LoadingSpinner from './icons/LoadingSpinner';

interface ResultDisplayProps {
  recommendation: Recommendation | null;
  isLoading: boolean;
  error: string | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ recommendation, isLoading, error }) => {
  const getConfidenceColor = (confidence: number) => {
    if (confidence > 85) return 'text-green-600';
    if (confidence > 60) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center">
          <LoadingSpinner className="h-10 w-10 text-black mx-auto" />
          <p className="mt-4 text-lg font-medium text-gray-800">Finding your perfect fit...</p>
          <p className="text-sm text-gray-500">Our AI is analyzing your details.</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center bg-red-50 border border-red-200 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-red-800">Oops! Something went wrong.</h3>
          <p className="mt-2 text-sm text-red-600">{error}</p>
        </div>
      );
    }
    
    if (recommendation) {
      return (
        <div className="text-center w-full bg-gray-50 p-8 rounded-lg">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Our Recommendation</h2>
          <p className="text-7xl font-extrabold text-black my-4">{recommendation.recommended_size}</p>
          
          <div className="bg-white border border-gray-200 p-4 rounded-md mb-6 text-left">
            <h3 className="text-sm font-semibold text-black mb-1">AI Analysis</h3>
            <p className="text-sm text-gray-600 italic">"{recommendation.reason}"</p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center text-sm text-gray-800 mb-6">
            <div>
              <span className="font-semibold text-gray-500 text-xs uppercase tracking-wider">Confidence</span>
              <p className={`font-bold text-2xl ${getConfidenceColor(recommendation.confidence)}`}>{recommendation.confidence}%</p>
            </div>
             {recommendation.estimated_chest_cm > 0 && (
                <div>
                  <span className="font-semibold text-gray-500 text-xs uppercase tracking-wider">Est. Chest</span>
                  <p className="font-bold text-2xl">{recommendation.estimated_chest_cm} cm</p>
                </div>
              )}
              {recommendation.estimated_waist_cm > 0 && (
                 <div>
                  <span className="font-semibold text-gray-500 text-xs uppercase tracking-wider">Est. Waist</span>
                  <p className="font-bold text-2xl">{recommendation.estimated_waist_cm} cm</p>
                </div>
              )}
          </div>
          <button className="w-full bg-black text-white font-bold py-3 px-4 rounded-full hover:bg-gray-800 transition-colors uppercase text-sm tracking-wider">
            Shop Size {recommendation.recommended_size}
          </button>
        </div>
      );
    }
    
    return (
      <div className="text-center text-gray-400">
        <p className="text-lg font-medium">Your recommendation will appear here.</p>
        <p className="text-sm">Fill out the form on the left to get started.</p>
      </div>
    );
  };
  
  return (
    <div className="sticky top-28 flex items-center justify-center min-h-[400px] lg:min-h-[600px]">
      {renderContent()}
    </div>
  );
};

export default ResultDisplay;
import React, { useState } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';
import { FormData, Recommendation, Gender, BodyType, FitPreference, GarmentType } from './types';
import { getFitRecommendation } from './services/geminiService';

function App() {
  const [formData, setFormData] = useState<FormData>({
    gender: Gender.Male,
    height: '180',
    weight: '75',
    bodyType: BodyType.Athletic,
    fitPreference: FitPreference.Regular,
    garmentType: GarmentType.TShirt,
    heightUnit: 'cm',
    weightUnit: 'kg',
    chest: '',
    waist: '',
    chestUnit: 'cm',
    waistUnit: 'cm',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setRecommendation(null);
    try {
      const result = await getFitRecommendation(formData, imageFile);
      setRecommendation(result);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white text-black min-h-screen flex flex-col font-sans">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase">
            GYMSHARK FIT AI
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Find your perfect Gymshark fit with AI-powered recommendations.
          </p>
        </div>

        {/* Form and Result Layout */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <InputForm
            formData={formData}
            setFormData={setFormData}
            imageFile={imageFile}
            setImageFile={setImageFile}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
          <ResultDisplay
            recommendation={recommendation}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>
      <footer className="w-full text-center py-6 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          © 2025 GYMSHARK FIT AI — Inspired by Gymshark.com
        </p>
      </footer>
    </div>
  );
}

export default App;
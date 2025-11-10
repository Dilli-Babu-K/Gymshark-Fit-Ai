import React, { useState, useCallback, ChangeEvent } from 'react';
import { useDropzone } from 'react-dropzone';
import { FormData } from '../types';
import {
  GENDER_OPTIONS,
  BODY_TYPE_OPTIONS,
  FIT_PREFERENCE_OPTIONS,
  GARMENT_TYPE_OPTIONS,
} from '../constants';
import UploadIcon from './icons/UploadIcon';
import LoadingSpinner from './icons/LoadingSpinner';
import UnitToggle from './UnitToggle';

interface InputFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  imageFile: File | null;
  setImageFile: (file: File | null) => void;
  onSubmit: (event: React.FormEvent) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({
  formData,
  setFormData,
  imageFile,
  setImageFile,
  onSubmit,
  isLoading,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [setImageFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.jpg', '.webp'] },
    multiple: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUnitChange = <K extends keyof FormData>(name: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageFile(null);
    setImagePreview(null);
  }

  const inputStyles = "mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black sm:text-sm transition-all";
  const labelStyles = "block text-sm font-medium text-gray-700";

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Basic Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
        <div>
          <label htmlFor="gender" className={labelStyles}>Gender</label>
          <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className={inputStyles}>
            {GENDER_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="bodyType" className={labelStyles}>Body Type</label>
          <select id="bodyType" name="bodyType" value={formData.bodyType} onChange={handleChange} className={inputStyles}>
            {BODY_TYPE_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
         <div>
          <label htmlFor="height" className={labelStyles}>Height</label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input type="number" name="height" id="height" value={formData.height} onChange={handleChange} className="flex-1 block w-full rounded-none rounded-l-md sm:text-sm bg-white border border-gray-300 text-black focus:ring-black focus:border-black" placeholder="180" />
            <UnitToggle
              value={formData.heightUnit}
              onChange={(val) => handleUnitChange('heightUnit', val)}
              options={[{value: 'cm', label: 'cm'}, {value: 'in', label: 'in'}]}
            />
          </div>
        </div>
        <div>
          <label htmlFor="weight" className={labelStyles}>Weight</label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input type="number" name="weight" id="weight" value={formData.weight} onChange={handleChange} className="flex-1 block w-full rounded-none rounded-l-md sm:text-sm bg-white border border-gray-300 text-black focus:ring-black focus:border-black" placeholder="75" />
            <UnitToggle
              value={formData.weightUnit}
              onChange={(val) => handleUnitChange('weightUnit', val)}
              options={[{value: 'kg', label: 'kg'}, {value: 'lbs', label: 'lbs'}]}
            />
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
        <div>
          <label htmlFor="fitPreference" className={labelStyles}>Fit Preference</label>
          <select id="fitPreference" name="fitPreference" value={formData.fitPreference} onChange={handleChange} className={inputStyles}>
            {FIT_PREFERENCE_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="garmentType" className={labelStyles}>Garment Type</label>
          <select id="garmentType" name="garmentType" value={formData.garmentType} onChange={handleChange} className={inputStyles}>
            {GARMENT_TYPE_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
      </div>
      
      {/* Image Uploader */}
      <div>
        <label className={labelStyles}>Upload Photo (Optional)</label>
        <div
          {...getRootProps()}
          className={`mt-1 flex justify-center p-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-black transition-colors ${isDragActive ? 'border-black bg-gray-50' : 'bg-white'}`}
        >
          <div className="space-y-1 text-center">
            {imagePreview ? (
              <div className="relative group">
                <img src={imagePreview} alt="Preview" className="mx-auto h-32 w-auto rounded-md" />
                <div 
                  className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md"
                  onClick={removeImage}
                >
                  <p className="text-white text-sm font-bold">Remove</p>
                </div>
              </div>
            ) : (
              <>
                <UploadIcon />
                <div className="flex text-sm text-gray-600">
                  <p className="pl-1">
                    {isDragActive ? 'Drop the file here...' : 'Drag & drop a photo, or click to select'}
                  </p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, WEBP</p>
              </>
            )}
            <input {...getInputProps()} className="sr-only" />
          </div>
        </div>
      </div>

      {/* Manual Measurements */}
       <div>
        <h3 className="text-base font-medium text-black">Advanced (Optional)</h3>
        <p className="text-sm text-gray-500">Provide measurements for a more accurate recommendation.</p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
           <div>
            <label htmlFor="chest" className={labelStyles}>Chest</label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input type="number" name="chest" id="chest" value={formData.chest} onChange={handleChange} className="flex-1 block w-full rounded-none rounded-l-md sm:text-sm bg-white border border-gray-300 text-black focus:ring-black focus:border-black" placeholder="e.g. 104" />
              <UnitToggle
                value={formData.chestUnit}
                onChange={(val) => handleUnitChange('chestUnit', val)}
                options={[{value: 'cm', label: 'cm'}, {value: 'in', label: 'in'}]}
              />
            </div>
          </div>
           <div>
            <label htmlFor="waist" className={labelStyles}>Waist</label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input type="number" name="waist" id="waist" value={formData.waist} onChange={handleChange} className="flex-1 block w-full rounded-none rounded-l-md sm:text-sm bg-white border border-gray-300 text-black focus:ring-black focus:border-black" placeholder="e.g. 85" />
              <UnitToggle
                value={formData.waistUnit}
                onChange={(val) => handleUnitChange('waistUnit', val)}
                options={[{value: 'cm', label: 'cm'}, {value: 'in', label: 'in'}]}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-bold text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? <LoadingSpinner className="h-5 w-5 text-white" /> : 'GET MY FIT'}
        </button>
      </div>
    </form>
  );
};

export default InputForm;
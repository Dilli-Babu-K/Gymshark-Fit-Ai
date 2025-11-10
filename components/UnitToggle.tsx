import React from 'react';

interface UnitToggleProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
}

const UnitToggle = <T extends string>({ value, onChange, options }: UnitToggleProps<T>) => {
  return (
    <div className="flex items-center border border-l-0 border-gray-300 rounded-r-md">
      {options.map((option, index) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`px-3 py-1 text-xs font-semibold ${
            value === option.value
              ? 'bg-black text-white'
              : 'bg-white text-gray-500 hover:bg-gray-100'
          } ${index === options.length - 1 ? 'rounded-r-md' : ''} transition-colors duration-200 h-full`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default UnitToggle;
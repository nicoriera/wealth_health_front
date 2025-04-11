import React, { useState, useEffect, useRef, KeyboardEvent } from "react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  id: string;
  name: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void; // For react-hook-form
  placeholder?: string;
  label: string;
  error?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  id,
  name,
  options,
  value,
  onChange,
  onBlur,
  placeholder = "Select...",
  label,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const selectRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<Array<HTMLLIElement | null>>([]);

  const selectedOption = options.find((option) => option.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Scroll to highlighted option
  useEffect(() => {
    if (
      isOpen &&
      highlightedIndex >= 0 &&
      optionsRef.current[highlightedIndex]
    ) {
      optionsRef.current[highlightedIndex]?.scrollIntoView({
        block: "nearest",
      });
    }
  }, [isOpen, highlightedIndex]);

  const handleSelectOption = (option: Option) => {
    onChange(option.value);
    setIsOpen(false);
    onBlur(); // Trigger validation on change
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case "Enter":
      case " ": // Space
        event.preventDefault();
        setIsOpen((prev) => !prev);
        if (isOpen && highlightedIndex >= 0) {
          handleSelectOption(options[highlightedIndex]);
        }
        break;
      case "ArrowDown":
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        }
        setHighlightedIndex((prev) => Math.min(prev + 1, options.length - 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        }
        setHighlightedIndex((prev) => Math.max(prev - 1, 0));
        break;
      case "Escape":
        event.preventDefault();
        setIsOpen(false);
        break;
      case "Tab":
        setIsOpen(false); // Close on tab out
        onBlur();
        break;
      default:
        break;
    }
  };

  return (
    <div ref={selectRef} className="relative w-full">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input type="hidden" id={id} name={name} value={value} />
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onBlur={onBlur}
        onKeyDown={handleKeyDown}
        className={`mt-0 block w-full px-3 py-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } bg-white rounded-md shadow-sm text-left flex justify-between items-center 
                   focus:outline-none focus:ring-2 ${
                     error
                       ? "focus:ring-red-500 focus:border-red-500"
                       : "focus:ring-indigo-300 focus:border-indigo-500"
                   } focus:ring-opacity-50 sm:text-sm`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={id + "-label"}>
        <span
          id={id + "-label"}
          className={`block truncate ${
            selectedOption ? "text-gray-900" : "text-gray-500"
          }`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`ml-2 h-4 w-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <ul
          className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
          role="listbox"
          tabIndex={-1}
          aria-labelledby={id + "-label"}>
          {options.map((option, index) => (
            <li
              key={option.value}
              ref={(el) => {
                optionsRef.current[index] = el;
              }}
              onClick={() => handleSelectOption(option)}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={`cursor-pointer select-none relative py-2 px-3 ${
                highlightedIndex === index
                  ? "text-white bg-indigo-600"
                  : "text-gray-900 hover:bg-gray-100"
              }`}
              role="option"
              aria-selected={value === option.value}>
              <span
                className={`block truncate ${
                  value === option.value ? "font-medium" : "font-normal"
                }`}>
                {option.label}
              </span>
              {value === option.value && (
                <span
                  className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                    highlightedIndex === index
                      ? "text-white"
                      : "text-indigo-600"
                  }`}>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default CustomSelect;

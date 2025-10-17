import React, { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import chevronDownIcon from "/chevron.svg";
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ options, value, onChange, placeholder = "Select an option", className, disabled = false }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<SelectOption | undefined>(
      options.find((opt) => opt.value === value)
    );
    const selectRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = useCallback((event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }, []);

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [handleClickOutside]);

    useEffect(() => {
      setSelectedOption(options.find((opt) => opt.value === value));
    }, [value, options]);

    const handleSelect = (option: SelectOption) => {
      if (option.disabled) return;
      setSelectedOption(option);
      setIsOpen(false);
      onChange?.(option.value);
    };

    return (
      <div
        ref={selectRef}
        className={cn(
          "relative inline-block text-left",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        <div>
          <button
            type="button"
            className={cn(
              "inline-flex w-28 justify-between items-center rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none",
              disabled && "cursor-not-allowed"
            )}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            disabled={disabled}
          >
            {selectedOption ? selectedOption.label : placeholder}
            <img
              src={chevronDownIcon}
              alt="chevron down"
              className={cn(
                "w-3 h-3 transition-transform duration-200",
                isOpen && "rotate-180"
              )}
            />
          </button>
        </div>

        {isOpen && (
          <div className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  className={cn(
                    "block w-full px-4 py-2 text-left text-sm hover:bg-gray-100",
                    option.disabled && "opacity-50 cursor-not-allowed",
                    selectedOption?.value === option.value && "bg-gray-100"
                  )}
                  disabled={option.disabled}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

import React, { Dispatch, SetStateAction, useMemo } from 'react';
import { SelectType } from '../Utils/enum';

interface CustomSelectProps {
  type: SelectType;
  selectedIndex: number;
  options: React.ReactNode[];
  className?: string;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
}

export const CustomSelect = ({
  type,
  className,
  options,
  selectedIndex,
  setSelectedIndex,
}: CustomSelectProps) => {
  const barSelect = useMemo(() => {
    return (
      <div className={`flex items-center gap-4 ${className}`}>
        {options.map((option, index) => (
          <div
            key={index}
            className={
              'hover:text-text-selected cursor-pointer ' +
              (selectedIndex === index
                ? 'text-text-selected'
                : 'text-text-primary')
            }
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              setSelectedIndex(index);
            }}
          >
            {option}
          </div>
        ))}
      </div>
    );
  }, [className, options, selectedIndex, setSelectedIndex]);

  const dropDownSelect = useMemo(() => {
    return (
      <select
        className="bg-secondary-light px-2 py-2 text-white rounded-md focus-visible:ring-0 focus-visible:outline-none"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setSelectedIndex(+e.target.value)
        }
      >
        {options.map((option, index) => (
          <option key={index} value={index} className="py-1 my-1">
            {option}
          </option>
        ))}
      </select>
    );
  }, []);
  return (
    <>
      {type === SelectType.BAR && barSelect}
      {type === SelectType.DROPDOWN && dropDownSelect}
    </>
  );
};

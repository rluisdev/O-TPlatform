import { Dispatch, SetStateAction } from 'react';

interface CustomInputProps {
  label?: string;
  value?: string;
  name?: string;
  className?: string;
  disabled?: boolean;
  onChange: Dispatch<SetStateAction<string>>;
}
export const CustomInput = ({
  label,
  className,
  value,
  name,
  disabled,
  onChange,
}: CustomInputProps) => {
  return (
    <div
      className={
        'rounded-md bg-secondary-normal py-2 px-4 flex items-center ' +
        className
      }
    >
      <label className="text-text-primary mr-3 w-fit">{label}</label>
      <input
        className="border-none text-white bg-transparent flex-grow focus-visible:ring-0 focus-visible:outline-none text-right"
        value={value}
        onChange={e => onChange(e.target.value)}
        name={name}
        disabled={disabled}
      />
    </div>
  );
};

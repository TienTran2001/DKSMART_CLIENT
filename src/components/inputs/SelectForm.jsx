/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const SelectForm = ({
  containerClassName,
  label,
  id,
  register,
  errors = {},
  validate,
  value,
  children,
  disabled,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          {label}
        </label>
      )}
      <select
        disabled={disabled ? true : false}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  outline-main"
        id={id}
        defaultValue={value}
        {...register(id, validate)}
      >
        {children}
      </select>
      {errors[id] && (
        <small className="text-red-500">{errors[id]?.message}</small>
      )}
    </div>
  );
};

export default SelectForm;

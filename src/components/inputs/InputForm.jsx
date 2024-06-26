/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const InputForm = ({
  style = 'form-input',
  containerClassName,
  label,
  id,
  type = 'text',
  placeholder = '',
  register,
  min,
  errors = {},
  inputClassName,
  validate,
  value,
  readOnly = false,
  onClick,
}) => {
  return (
    <div className={containerClassName}>
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          {label}
        </label>
      )}
      <input
        onClick={onClick}
        type={type}
        id={id}
        readOnly={readOnly}
        value={value}
        min={min}
        placeholder={placeholder}
        className={twMerge(
          clsx(
            style,
            'bg-gray-50 border border-gray-300 placeholder-gray-400 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5',
            inputClassName
          )
        )}
        {...register(id, validate)}
      />
      {errors[id] && (
        <small className="text-red-500">{errors[id]?.message}</small>
      )}
    </div>
  );
};

export default InputForm;

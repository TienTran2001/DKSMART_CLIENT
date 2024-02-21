import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ImSpinner2 } from 'react-icons/im';

// eslint-disable-next-line react/prop-types
const Button = ({ children, className, onClick, type = 'button', disable }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disable}
      className={twMerge(
        clsx(
          'text-white bg-main hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 relative',
          className,
          disable && 'opacity-55'
        )
      )}
    >
      {disable && (
        <div className="  inline-block animate-spin absolute top-[36%] right-[61%] ">
          <ImSpinner2 />
        </div>
      )}
      <div>{children}</div>
    </button>
  );
};

export default Button;

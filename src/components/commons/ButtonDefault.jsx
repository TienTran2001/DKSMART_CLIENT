/* eslint-disable react/prop-types */
import { Button } from '@material-tailwind/react';
import clsx from 'clsx';
// eslint-disable-next-line react/prop-types
const ButtonDefault = ({
  children,
  className,
  onClick,
  disable = false,
  fullWidth,
  variant,
  size = 'md',
}) => {
  return (
    <Button
      size={size}
      loading={disable}
      fullWidth={fullWidth}
      className={clsx('flex justify-center items-center', className)}
      onClick={onClick}
      variant={variant}
    >
      {children}
    </Button>
  );
};

export default ButtonDefault;

/* eslint-disable react/prop-types */
import { Button } from '@material-tailwind/react';
// eslint-disable-next-line react/prop-types
const ButtonDefault = ({
  children,
  className,
  onClick,
  disable = 'false',
  fullWidth,
  size = 'md',
}) => {
  return (
    <Button
      size={size}
      loading={disable}
      fullWidth={fullWidth}
      className={className}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default ButtonDefault;

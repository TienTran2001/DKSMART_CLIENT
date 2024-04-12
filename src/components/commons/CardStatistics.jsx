/* eslint-disable react/prop-types */
import clsx from 'clsx';

const CardStatistics = ({
  className,
  icon,
  title,
  data,
  percent,
  classNameBoxIcon,
  classNameData,
}) => {
  return (
    <div className={clsx(' ', className)}>
      <div className=" bg-clip-border rounded-xl bg-white text-gray-700 border border-blue-gray-100 shadow-sm">
        <div className=" flex justify-between">
          <div
            className={clsx(
              'bg-clip-border mt-4 mx-4 rounded-xl overflow-hidden text-white bg-black shadow-gray-900/20  grid h-12 w-12 place-items-center',
              classNameBoxIcon
            )}
          >
            {icon}
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
              {title}
            </p>
            <h4
              className={clsx(
                'block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug ',
                classNameData
              )}
            >
              {data}
            </h4>
          </div>
        </div>
        <div className="border-t border-blue-gray-50 p-4">{percent}</div>
      </div>
    </div>
  );
};

export default CardStatistics;

/* eslint-disable react/prop-types */
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
// eslint-disable-next-line react/prop-types
export const CenterItemSkeleton = ({ isLoading }) => {
  return (
    <div className="bg-main-gray border border-gray-100/50 text-sm md:text-base rounded-md px-4 py-3 flex flex-col gap-y-5">
      <div className="uppercase font-semibold text-gray-700">
        {isLoading && <Skeleton className="skeleton w-full" />}
      </div>
      <div className="border-t-2"></div>
      <div>
        <span className="text-main cursor-pointer">
          {isLoading && <Skeleton className="skeleton w-full md:w-[400px]" />}
        </span>
      </div>

      <div className="">
        <span className="text-main">
          {' '}
          {isLoading && <Skeleton className="skeleton w-full md:w-[350px]" />}
        </span>
      </div>
      <div className="">
        <span className="text-main">
          {' '}
          {isLoading && <Skeleton className="skeleton w-full md:w-[350px]" />}
        </span>
      </div>
      <div className="flex justify-between flex-col md:flex-row gap-y-2 md:gap-y-0">
        {isLoading && (
          <>
            <Skeleton className="skeleton w-full md:w-[180px]  h-[40px]" />
            <Skeleton className="skeleton w-full md:w-[180px] h-[40px]" />
          </>
        )}
      </div>
    </div>
  );
};

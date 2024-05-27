import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// eslint-disable-next-line react/prop-types
export const VehicleSkeleton = ({ isLoading }) => {
  return (
    <>
      <div className="bg-main-gray border border-gray-300/50 rounded-md px-4 py-3 flex flex-col gap-y-5">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="w-full">
            {isLoading && <Skeleton className="skeleton w-full h-[50px]" />}
          </div>
        </div>
        <div className="border-t-2"></div>
        <div className="flex flex-col md:flex-row gap-x-4 md:items-center">
          <div className="md:w-1/2">
            {isLoading && <Skeleton className="skeleton w-full" />}
          </div>
          <div className="md:w-1/2">
            {isLoading && <Skeleton className="skeleton w-full" />}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-x-4 md:items-center">
          <div className="md:w-1/2">
            {isLoading && <Skeleton className="skeleton w-full" />}
          </div>
          <div className="md:w-1/2">
            {isLoading && <Skeleton className="skeleton w-full" />}
          </div>
        </div>
      </div>
    </>
  );
};

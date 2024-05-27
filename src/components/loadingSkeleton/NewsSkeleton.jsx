import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from '@material-tailwind/react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// eslint-disable-next-line react/prop-types
export const NewsSkeleton = ({ isLoading }) => {
  return (
    <>
      <Card>
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 rounded-none h-[200px] w-full"
        >
          {isLoading && (
            <Skeleton className=" skeleton w-[300px]  md:w-[350px] h-full" />
          )}
        </CardHeader>
        <CardBody className="p-4 flex flex-col flex-1 gap-y-4 justify-between">
          {isLoading && <Skeleton className=" skeleton w-full" count={2} />}
        </CardBody>
      </Card>
    </>
  );
};

// eslint-disable-next-line react/prop-types
export const NewsListSkeleton = ({ isLoading }) => {
  return (
    <>
      <div className="w-full h-[120px] md:h-[200px] rounded-md flex space-x-3 overflow-hidden cursor-pointer bg-gray-100">
        <div className=" rounded-none w-[40%]">
          {isLoading && <Skeleton className="skeleton w-full h-full" />}
        </div>
        <div className="w-[60%] p-4">
          <Typography variant="h5" color="blue-gray">
            <div className=" line-clamp-2 text-base md:text-xl">
              {isLoading && <Skeleton className="skeleton w-full" count={2} />}
            </div>
          </Typography>
          <Typography className=" mt-4">
            {isLoading && <Skeleton className="skeleton w-1/3" />}
          </Typography>
        </div>
      </div>
    </>
  );
};

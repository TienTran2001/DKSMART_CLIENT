import { PublicLayout } from '.';
import { useEffect, useState } from 'react';

import { IoArrowBackSharp } from 'react-icons/io5';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useParams } from 'react-router-dom';
import { apiGetNews, apiIncreaseView } from '~/apis/news';
import { formatDate } from '~/utils/contants';

// eslint-disable-next-line react/prop-types
const NewsDetail = ({ navigate }) => {
  const { newsId } = useParams();
  const [news, setNews] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    loadNewDetail(newsId);
  }, []);

  const loadNewDetail = async (newsId) => {
    setLoading(true);
    const response = await apiGetNews(newsId);
    if (response.success) {
      const { news } = response;
      setNews(news);
      setLoading(false);
      await apiIncreaseView(newsId);
    }
  };

  return (
    <>
      <PublicLayout>
        <div className="min-h-screen max-w-[1200px] md:mx-auto">
          <div className="mt-[50px] md:w-5/6 mx-auto rounded-md bg-white py-[25px] px-[20px]">
            <div className="relative">
              <button onClick={() => navigate(-1)}>
                <span className="absolute top-[25px] cursor-pointer">
                  <IoArrowBackSharp size={22} className="text-main  " />
                </span>
              </button>
              <h2 className="font-semibold uppercase text-center text-main">
                Tin tức
              </h2>
            </div>
            <div className="mt-[50px]">
              <h2 className="font-bold text-2xl mb-5">
                {isLoading ? (
                  <Skeleton className="skeleton w-full" />
                ) : (
                  news.title
                )}{' '}
              </h2>
              <div className="text-gray-500">
                {isLoading ? (
                  <Skeleton className="skeleton w-[100px]" />
                ) : (
                  <>
                    {' '}
                    <span>{news.views}</span> lượt xem
                  </>
                )}
              </div>
              <div className="text-gray-500">
                {isLoading ? (
                  <Skeleton className="skeleton w-[160px]" />
                ) : (
                  <>
                    Ngày đăng: <span>{formatDate(news.createdAt)}</span>
                  </>
                )}
              </div>
              <hr className="my-[50px]" />
              {isLoading ? (
                <Skeleton className="skeleton w-full" count={20} />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: news.content }} />
              )}
            </div>
            {isLoading ? (
              <Skeleton className="skeleton w-[100px]" />
            ) : (
              <div className="italic mt-4">{news.source}</div>
            )}
          </div>
        </div>
      </PublicLayout>
    </>
  );
};

export default NewsDetail;

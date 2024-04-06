import { PublicLayout } from '.';
import { useEffect, useState } from 'react';

import { IoArrowBackSharp } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import { apiGetNews, apiIncreaseView } from '~/apis/news';
import { formatDate } from '~/utils/contants';

// eslint-disable-next-line react/prop-types
const NewsDetail = ({ navigate }) => {
  const { newsId } = useParams();
  const [news, setNews] = useState('');

  console.log(news);

  useEffect(() => {
    loadNewDetail(newsId);
  }, []);

  const loadNewDetail = async (newsId) => {
    const response = await apiGetNews(newsId);
    if (response.success) {
      const { news } = response;
      setNews(news);
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
              <h2 className="font-bold text-2xl mb-5">{news.title}</h2>
              <div className="text-gray-500">
                <span>{news.views}</span> lượt xem
              </div>
              <div className="text-gray-500">
                Ngày đăng: <span>{formatDate(news.createdAt)}</span>
              </div>
              <hr className="my-[50px]" />
              <div dangerouslySetInnerHTML={{ __html: news.content }} />
            </div>
            <div className="italic mt-4">{news.source}</div>
          </div>
        </div>
      </PublicLayout>
    </>
  );
};

export default NewsDetail;
